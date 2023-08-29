const express = require("express");
const router = express.Router();
const testimonyController = require("../controllers/TestimonyController.js");

// Crear un testimonio
router.post("/", testimonyController.createTestimony);
// Obtener todos los testimonios
router.get("/", testimonyController.getAllTestimonials);
// Obtener un testimonio por ID
router.get("/:id", testimonyController.getTestimonyById);
// Actualizar un testimonio por ID
router.put("/:id", testimonyController.updateTestimony);
// Eliminar un testimonio por ID
router.delete("/:id", testimonyController.deleteTestimony);

module.exports = router;
