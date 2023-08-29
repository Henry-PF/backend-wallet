const {Testimony}= require("../db"); // Importar el modelo de base de datos

const testimonyController = {
  createTestimony: async (req, res) => {
    try {
      const newTestimony = await Testimony.create(req.body);
      res.status(201).json(newTestimony);
    } catch (error) {
      res.status(500).json({ error: "No se pudo crear el testimonio." });
    }
  },

  getAllTestimonials: async (req, res) => {
    try {
      const testimonials = await Testimony.findAll();
      res.json(testimonials);
    } catch (error) {
      res
        .status(500)
        .json({ error: "No se pudieron obtener los testimonios." });
    }
  },

  getTestimonyById: async (req, res) => {
    try {
      const testimony = await Testimony.findByPk(req.params.id);
      if (testimony) {
        res.json(testimony);
      } else {
        res.status(404).json({ error: "Testimonio no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "No se pudo obtener el testimonio." });
    }
  },

  updateTestimony: async (req, res) => {
    try {
      const testimony = await Testimony.findByPk(req.params.id);
      if (testimony) {
        await testimony.update(req.body);
        res.json(testimony);
      } else {
        res.status(404).json({ error: "Testimonio no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "No se pudo actualizar el testimonio." });
    }
  },

  deleteTestimony: async (req, res) => {
    try {
      const testimony = await Testimony.findByPk(req.params.id);
      if (testimony) {
        await testimonio.destroy();
        res.json({ message: "Testimonio eliminado con éxito." });
      } else {
        res.status(404).json({ error: "Testimonio no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "No se pudo eliminar el testimonio." });
    }
  },
};

module.exports = testimonyController;
