const express = require("express");
const router = express.Router();
const plansController = require("../controllers/PlansController.js");

// Rutas para CRUD de planes
router.get("/", plansController.getAllPlans);
router.get("/:id", plansController.getPlanById);
router.post("/", plansController.createPlan);
router.put("/:id", plansController.updatePlan);
router.delete("/:id", plansController.deletePlan);

module.exports = router;
