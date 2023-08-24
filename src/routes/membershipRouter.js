const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/MembershipController.js");

// Rutas para CRUD de afiliación de contactos frecuentes
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
