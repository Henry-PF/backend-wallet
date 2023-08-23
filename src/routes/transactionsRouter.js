const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/TransactionsController.js");

// Rutas para CRUD de planes
router.get("/", transactionsController);
router.get("/:id", transactionsController);
router.post("/", transactionsController);
router.put("/:id", transactionsController);
router.delete("/:id", transactionsController);

module.exports = router;
