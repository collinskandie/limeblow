const Payments = require("../models/Payment");
const axios = require("axios");

async function newMpesa(req, res) {
  try {
    const mpesa_no = req.body.mpesa_phone_number.substring(1);
    const cost_items = req.body.total;
    const amount = Math.ceil(cost_items);
    const items = req.body.cartItems;

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
          CallBackURL:
            "https://ed54-2c0f-fe38-2188-f3db-f80f-8b7a-fe01-c593.ngrok-free.app/api/payments/callback",
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
function mpesaCallBack(req, res) {
  const callbackdata = req.body;
  if (!callbackdata.Body.CallbackMetadata) {
    console.log(callbackdata.Body);
    res.json("ok");
  }

  console.log(callbackdata.Body.stkCallback.CallbackMetadata);

  const amount = callbackdata.Body.stkCallback.CallbackMetadata.Item[0].Value;
  const trans_id = callbackdata.Body.stkCallback.CallbackMetadata.Item[1].Value;
  const trans_date =
    callbackdata.Body.stkCallback.CallbackMetadata.Item[3].Value;
  const phone =
    callbackdata.callbackdata.Body.stkCallback.CallbackMetadata.Item[4].Value;
  console.log({ phone, amount, trans_id, trans_date });

  const payment = new Payments();
  payment.referenceNumber = trans_id;
  payment.invoiceTotal = amount;
  payment.accountNumber = phone;

  payment
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
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
  mpesaCallBack,
};
