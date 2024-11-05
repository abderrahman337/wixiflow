/**
 * This is router for asaas payment
 */
const express = require("express");
const validateAuthorization = require("../../api/auth/validateAuthorization");
const {
  createPaymentIntent,
} = require("../../api/payment/createPaymentIntent");
const router = express.Router();
const { handleWebhook } = require("../../api/payment/handleWebhook");
/**
 *@router      Metohd : POST   endpoint : api/payment/create-payment-intent
 *@access      Private
 *@payload     {  }
 *@return      if success then return ,  status code : 200
 */
router.post(
  "/create-payment-intent",
  validateAuthorization,
  createPaymentIntent
);
/**
 *@router      Metohd : POST   endpoint : api/payment/webhook
 *@access      Private
 *@payload     {  }
 *@return      if success then return ,  status code : 200
 */
router.post("/webhook", handleWebhook);

module.exports = router;
