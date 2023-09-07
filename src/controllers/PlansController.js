const { planes, planes_detalles } = require("../db");

const plansController = {
  getAllPlans: async (req, res) => {
    try {
      const plans = await planes.findAll({
        include: planes_detalles,
      });
      res.status(200).json(plans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los planes" });
    }
  },

  getPlanById: async (req, res) => {
    const { id } = req.params;
    try {
      const plan = await planes.findByPk(id, {
        include: planes_detalles,
      });
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
    const { nombre, costo, duracion, contenido } = req.body;

    try {
      const newPlan = await planes.create({ nombre, costo, duracion });

      if (contenido) {
        await planes_detalles.create({
          id_plan: newPlan.id,
          contenido,
        });
      }
      res.status(201).json(newPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el plan" });
    }
  },

  updatePlan: async (req, res) => {
    const { id } = req.params;
    const { nombre, duracion, costo, contenido } = req.body;
    try {
      const plan = await planes.findByPk(id);
      if (plan) {
        await plan.update({ nombre, duracion, costo });

        if (contenido) {
          const details = await planes_detalles.findOne({ where: { id_plan: plan.id } });
          if (details) {
            await details.update({ contenido });
          } else {
            await planes_detalles.create({
              id_plan: plan.id,
              contenido,
            });
          }
        }

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
      const plan = await planes.findByPk(id);
      if (plan) {
        await planes_detalles.destroy({ where: { id_plan: plan.id } });

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
}

module.exports = plansController;
