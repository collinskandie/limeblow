const Payments = require("../models/Payment");
const axios = require("axios");

async function newMpesa(req, res) {
  try {
    const mpesa_no = req.body.mpesa_phone_number.substring(1);
    const cost_items = req.body.total;
    const amount = Math.ceil(cost_items);
    const items = req.body.cartItems;

    // make mpesa payemnts

    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    const shortcode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;

    const password = new Buffer.from(shortcode + passkey + timestamp).toString(
      "base64"
    );

    await axios
      .post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: `254${mpesa_no}`,
          PartyB: shortcode,
          PhoneNumber: `254${mpesa_no}`,
          CallBackURL: process.env.URL,
          AccountReference: `254${mpesa_no}`,
          TransactionDesc: "Test",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        res.status(200).json(response.data);
      });
  } catch (error) {
    console.error(error);
    console.error(error.data);
    res.status(500).json(error.data);
  }
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
module.exports = {
  newMpesa,
  newCard,
};
