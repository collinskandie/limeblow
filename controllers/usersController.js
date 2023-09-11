const Customer = require("../models/Customer");
const crypto = require("crypto");
const BillingDetails = require("../models/BillingDetails");
const Contacts = require("../models/Contactform");
const {
  sendActivationMail,
  sendNewMessageMail,
} = require("../mailer/sendmail");
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
module.exports = {
  AddUsers,
  login,
  addAddress,
  newMessage,
};
