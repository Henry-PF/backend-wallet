const express = require("express");
const router = express.Router();
const paymenyByMpController = require("../controllers/PaymentByMpController");

//----- ORDEN DE PAGO 
router.post("/create-order", paymenyByMpController.createOrder);
//----- PAGO REALIZADO
// router.get("/success/", paymenyByMpController.success);
//----- PAGO EN PROCESO
router.post("/webhook", paymenyByMpController.webhook);
//----- RECHAZO DEL PAGO
router.get("/failure", paymenyByMpController.failure);


module.exports = router;