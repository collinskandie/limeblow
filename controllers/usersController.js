const Customer = require("../models/Customer");
const crypto = require("crypto");
const BillingDetails = require("../models/BillingDetails");
const { sendMail } = require("../mailer/sendmail");
const jwt = require("jsonwebtoken");

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
    //add password to table and enscrypt it.
    console.log(password);

    const userId = newCustomer.id; // Access the customer's ID

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
    // sendMail(email, confirmationCode);
    sendMail(email, confirmationCode);
    // Inside the success block of AddUsers function
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      customerId: userId, // Include the customer ID in the response
      customer: newCustomer,
      address: custom_address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error addding customer" });
  }
}
//login controller
async function login(req, res) {
  try {
    // console.log(req.body);
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
      expiresIn: "1h", // Token expiration time
    });
    req.session.userSessionExists = true;
    // You can also store additional user information in the session if needed
    req.session.user = {
      username: customer.name, // Replace with the user's username
      // Add other user-related data here
    };
    // console.log(status(200));

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
    console.log(req)
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
      userId
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
  userId
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
module.exports = {
  AddUsers,
  login,
  addAddress,
};
