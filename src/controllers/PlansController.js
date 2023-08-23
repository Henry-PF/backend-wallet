const { Plans } = require("../models/planes"); // Ajusta la ruta según tu estructura

const plansController = {
  getAllPlans: async (req, res) => {
    try {
      const plans = await Plans.findAll();
      res.status(200).json(plans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los planes" });
    }
  },

  getPlanById: async (req, res) => {
    const { id } = req.params;
    try {
      const plan = await Plans.findByPk(id);
      if (plan) {
        res.status(200).json(plan);
      } else {
        res.status(404).json({ message: "Plan no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el plan" });
    }
  },

  createPlan: async (req, res) => {
    const { nombre, duracion, costo } = req.body;
    try {
      const newPlan = await Plans.create({ nombre, duracion, costo });
      res.status(201).json(newPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el plan" });
    }
  },

  updatePlan: async (req, res) => {
    const { id } = req.params;
    const { nombre, duracion, costo } = req.body;
    try {
      const plan = await Plans.findByPk(id);
      if (plan) {
        await plan.update({ nombre, duracion, costo });
        res.status(200).json({ message: "Plan actualizado exitosamente" });
      } else {
        res.status(404).json({ message: "Plan no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el plan" });
    }
  },

  deletePlan: async (req, res) => {
    const { id } = req.params;
    try {
      const plan = await Plans.findByPk(id);
      if (plan) {
        await plan.destroy();
        res.status(200).json({ message: "Plan eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Plan no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el plan" });
    }
  },
};

module.exports = plansController;
