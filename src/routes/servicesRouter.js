const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/ServicesController.js");

// Rutas para CRUD de planes
router.get("/", servicesController.getAllServices );
router.get("/:id", servicesController.getServiceById);
router.post("/", servicesController.createService);
router.put("/:id", servicesController.updateService);
router.delete("/:id", servicesController.deleteService);

module.exports = router;