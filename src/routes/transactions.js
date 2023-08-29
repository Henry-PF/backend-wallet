const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/TransactionsController.js");

// Rutas para CRUD de planes
router.get("/", transactionsController.getAllTransactions);
router.get("/:id", transactionsController.getTransactionById);
router.post("/", transactionsController.createTransaction);
router.put("/:id", transactionsController.updateTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

module.exports = router;
