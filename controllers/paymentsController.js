const Payments = require("../models/Payment");
const ReceiptItem = require("../models/ReceiptItem");
const Sale = require("../models/Sale");
const axios = require("axios");
const { saveBase64Image } = require("./savefile");
const Dispatch = require("../models/dispatch");
const { billingAdress } = require("./usersController");
const { sendInvoice } = require("../mailer/sendmail");
// Define these variables at the module level

const transactions = {};

async function newMpesa(req, res) {
  try {
    const mpesa_no = req.body.mpesaNumber.substring(1);
    const cost_items = req.body.cartTotal;
    const amount = Math.ceil(cost_items);

    // Generate a unique transaction ID
    const transactionId = generateInvoiceNumber();

    const transactionData = {
      status: "pending",
      phone: mpesa_no,
      amount: amount,
      trans_id: "",
      trans_date: "",
    };

    transactions[transactionId] = transactionData;

    const date = new Date();

    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    const shortcode = process.env.MPESA_BUYGOODS;
    const passkey = process.env.MPESA_PASSKEY;
    const till = process.env.MPESA_TILL;

    const password = new Buffer.from(shortcode + passkey + timestamp).toString(
      "base64"
    );

    const mpesaResponse = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: amount,
        PartyA: `254${mpesa_no}`,
        PartyB: till,
        PhoneNumber: `254${mpesa_no}`,
        CallBackURL:
          "https://c591-197-248-146-143.ngrok.io/api/payments/callback", // Update this URL
        AccountReference: `254${mpesa_no}`,
        TransactionDesc: "Payment of goods",
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle the success response from M-Pesa API
    console.log("M-Pesa API response:", mpesaResponse.data);
    // You should update the transaction status here based on the response

    res.json({ message: "Payment request in progress", transactionId });
  } catch (error) {
    console.error("Error while making M-Pesa request:", error);
    res.status(500).json(error.message);
  }
}
async function confirmPayment(req, res) {
  try {
    let transid = req.params.transactionId;
    console.log(transid);
  } catch (error) {
    console.error(error);
    console.error(error.data);
    res.status(500).json(error.data);
  }
}

async function savePayment(req, res) {
  try {
    // console.log(req.body.cartItems);
    console.log(req.body);
    const user = generateInvoiceNumber();

    const {
      first_name,
      last_name,
      county,
      address,
      apartment,
      town_city,
      street,
      post_code,
      phone,
      email,
      payment_method,
      mpesa_confirmation,
      cartItems,
      total,
    } = req.body;
    const items = cartItems;
    const new_amount = total;

    const billing_address = await billingAdress(
      first_name,
      last_name,
      county,
      address,
      apartment,
      town_city,
      post_code,
      phone,
      email,
      user,
      payment_method
    );
    console.log(billing_address);

    const invoiceNumber = await generateInvoiceNumber();
    createSale(user, items, invoiceNumber, new_amount);
    createReceiptItems(items, invoiceNumber, mpesa_confirmation);
    const payment_status = savePaymentDetails(
      mpesa_confirmation,
      new_amount,
      phone,
      invoiceNumber,
      payment_method
    );
    const invoiceDate = Date.now();
    sendInvoice(items, email, total, invoiceNumber, invoiceDate);
    res.status(201).json({
      success:
        "Payment successfully recieved, we are going to review and call you back",
      payment_status,
      user,
    });
  } catch (error) {
    console.error(error);
    console.error(error.data);
    res.status(500).json(error.data);
  }
}
async function mpesaCallBack(req, res) {
  const callbackdata = req.body;
  if (!callbackdata.Body.stkCallback.CallbackMetadata) {
    console.log(callbackdata.Body.stkCallback);
    res.json("ok");
    return {
      status: "error",
      message: callbackdata.Body.stkCallback.ResultDesc,
      callbackBody: callbackdata.Body.stkCallback,
    };
  } else {
    const body = callbackdata.Body.stkCallback.CallbackMetadata;
    // console.log(body);
    const amount = callbackdata.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const trans_id =
      callbackdata.Body.stkCallback.CallbackMetadata.Item[1].Value;
    const trans_date =
      callbackdata.Body.stkCallback.CallbackMetadata.Item[2].Value;
    const phone = callbackdata.Body.stkCallback.CallbackMetadata.Item[3].Value;
    // console.log({ phone, amount, trans_id, trans_date });
    return {
      phone,
      amount,
      trans_id,
      trans_date,
    };
  }
}
async function createReceiptItems(items, invoiceNumber) {
  try {
    for (const item of items) {
      const receiptItem = await ReceiptItem.create({
        productId: item.productId,
        cost: parseFloat(item.price),
        quantity: item.quantity,
        invoiceNumber: invoiceNumber,
      });
      await receiptItem.save();
      console.log(`ReceiptItem created for product ID ${item.productId}`);
    }
    console.log("All ReceiptItems created and saved successfully.");
  } catch (error) {
    console.error(`Error creating ReceiptItems: ${error.message}`);
  }
}

async function createSale(user, items, invoiceNumber, totalCost) {
  try {
    const itemsCount = items.length;
    const sale = await Sale.create({
      itemsCount,
      totalCost,
      user,
      invoiceNumber,
    });
    // Get the generated invoiceNumber from the database
    const generatedInvoiceNumber = sale.getDataValue("invoiceNumber");

    console.log(
      `Sale entry created with invoice number: ${generatedInvoiceNumber}`
    );
    // Return the generated invoice number
    return generatedInvoiceNumber;
  } catch (error) {
    console.error(`Error creating sale entry: ${error.message}`);
    throw error;
  }
}
function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Generate a random number between 1000 and 9999
  const randomPart = Math.floor(Math.random() * 9000) + 1000;

  // Combine date/time and random part to create the invoice number
  const invoiceNumber = `${year}${month}${day}${hours}${minutes}${seconds}${randomPart}`;

  return invoiceNumber;
}

async function newCard(req, res) {
  try {
    console.log(req.body);

    return res.json(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error addding customer" });
  }
}
async function saveDispatch(req, res) {
  try {
    const { invoiceNumber, deliveryPersonName, description, images } = req.body;
    const imageFilenames = [];
    const newStatus = "dispatched";

    if (req.body.images) {
      for (const image of images) {
        const imageData = image;
        const newImageName = await saveBase64Image(imageData);
        imageFilenames.push(newImageName);
      }
    }
    const sale = await Sale.findByPk(invoiceNumber);
    sale.status = newStatus;

    // Save the changes
    await sale.save();

    const newDispatch = await Dispatch.create({
      invoiceNumber: invoiceNumber,
      deliveryPersonName: deliveryPersonName,
      description: description,
      imageURL: imageFilenames,
    });

    return res.status(201).json({
      success: true,
      message: "Items Successfully dispatched",
      product: newDispatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving dispatch" });
  }
}
async function getDispatch(req, res) {
  try {
    const invoice = req.params.invoiceId;
    const dispatch = await Dispatch.findOne({
      where: { invoiceNumber: invoice },
    });
    console.log(dispatch);

    if (dispatch) {
      return res.status(200).json({
        data: dispatch,
        success: true,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Dispatch not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function savePaymentDetails(
  trans_id,
  amount,
  phone,
  invoiceNumber,
  paymentMethod
) {
  try {
    const payment = new Payments();
    payment.referenceNumber = trans_id;
    payment.invoiceTotal = amount;
    payment.accountNumber = phone;
    payment.invoiceNumber = invoiceNumber;
    payment.paymentMethod = paymentMethod;

    payment
      .save()
      .then((data) => {
        console.log(data);
        return {
          status: "success",
          message: `Payment successful, ${trans_id}`,
          payment,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
    return {
      error: "Internal server error",
      status: 500,
    };
  }
}

module.exports = {
  newMpesa,
  newCard,
  mpesaCallBack,
  saveDispatch,
  getDispatch,
  savePayment,
  confirmPayment,
};
