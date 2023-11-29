const Customer = require("../models/Customer");
const Coupon = require("../models/Coupon");
const crypto = require("crypto");
const BillingDetails = require("../models/BillingDetails");
const Contacts = require("../models/Contactform");
const bcrypt = require("bcryptjs");

const {
  sendActivationMail,
  sendNewMessageMail,
  subscribtionConfirmation,
} = require("../mailer/sendmail");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");

async function AddUsers(req, res) {
  try {
    const {
      first_name,
      last_name,
      county,
      address,
      town_city,
      street,
      post_code,
      phone,
      email,
      password,
    } = req.body;
    const confirmationCode = generateRandomCode(6);
    const newCustomer = await Customer.create({
      name: first_name,
      email: email,
      phone: phone,
      confirmationCode: confirmationCode,
      password: password,
    });
    console.log(password);
    const userId = newCustomer.id;
    const custom_address = billingAdress(
      first_name,
      last_name,
      county,
      address,
      street,
      town_city,
      post_code,
      phone,
      email,
      userId
    );
    sendActivationMail(email, confirmationCode);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      customerId: userId,
      customer: newCustomer,
      address: custom_address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error addding customer" });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    const passwordMatch = await customer.comparePassword(password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }
    const token = jwt.sign({ customerId: customer.id }, process.env.SECRETE, {
      expiresIn: "1h",
    });
    req.session.userSessionExists = true;
    req.session.user = {
      username: customer.name,
    };
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      customerId: customer.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
async function addAddress(req, res) {
  try {
    console.log(req);
    const {
      first_name,
      last_name,
      county,
      address,
      town_city,
      street,
      post_code,
      phone,
      email,
    } = req.body;
    const selectedPaymentMethod = req.body.payment_method;
    const userId = 0;
    const custom_address = billingAdress(
      first_name,
      last_name,
      county,
      address,
      town_city,
      street,
      post_code,
      phone,
      email,
      userId,
      selectedPaymentMethod
    );
    return res.status(201).json({
      success: true,
      message: "Address added successfuly",
      address: custom_address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error customer addresss" });
  }
}
async function billingAdress(
  firstName,
  lastName,
  country,
  streetAddress,
  apartment,
  city,
  postcode,
  phone,
  email,
  userId,
  payment_method
) {
  try {
    state = "Kenya";
    const newBillingAdress = await BillingDetails.create({
      firstName,
      lastName,
      country,
      streetAddress,
      apartment,
      city,
      state,
      postcode,
      phone,
      email,
      userId,
      payment_method,
    });
    return newBillingAdress;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error addding customer" });
  }
}
function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
async function newMessage(name, email, message) {
  try {
    const postMessage = await Contacts.create({
      name: name,
      email: email,
      message: message,
    });

    if (!postMessage) {
      console.log("Failed");
      throw new Error("Failed to save message"); // Throw an error if the message couldn't be saved
    }
    sendNewMessageMail(name, email, message);
    return postMessage;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught in the route handler
  }
}
async function addAdmin(req, res) {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10; // Number of salt rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await AdminUser.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newAdmin) {
      console.log("Errror creating admin user");
    }
    console.log(newAdmin.username);
    res.status(201).json({
      newAdmin,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error addding admin" });
  }
}
async function adminLogin(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await AdminUser.findOne({ where: { email: email } });
    if (!admin) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed", success: false });
    }
    const secretKey = process.env.SECRETE;
    const token = jwt.sign({ userId: admin._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(201).json({
      success: true,
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    console.log(error);
  }
}
async function verifyToken(req, res) {
  console.log(req);
  res.status(200).json({ message: "Token is valid" });
}
async function userSubscribe(req, res) {
  const newUser = req.body.email;
  const user = await Customer.findOne({ where: { email: newUser } });

  if (!user) {
    // Generate a new random coupon
    const randomCoupon = generateRandomCoupon();
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(currentDate.getDate() + 30); 

    // Save the coupon to the "coupons" table
    try {
      console.log(randomCoupon);
      const createdCoupon = await Coupon.create({
        code: randomCoupon,
        userEmail: newUser,
        generatedAt: currentDate,
        expiryDate: expiryDate,
      });
      subscribtionConfirmation(randomCoupon, newUser);
      res.status(200).json({
        success: true,
        message: "Coupon created successfully",
        coupon: createdCoupon,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error creating coupon", error: error.message });
    }
  } else {
    res.status(201).json({ message: "The user email exists" });
  }
}

function generateRandomCoupon() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to choose from
  const couponLength = 10; // Length of the coupon code

  let couponCode = "";

  // Generate the coupon code
  for (let i = 0; i < couponLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    couponCode += characters.charAt(randomIndex);
  }

  return couponCode;
}

module.exports = {
  AddUsers,
  login,
  addAddress,
  newMessage,
  billingAdress,
  addAdmin,
  adminLogin,
  verifyToken,
  userSubscribe,
};
