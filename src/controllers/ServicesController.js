const { Services } = require("../models/services"); // Ajusta la ruta según tu estructura

const servicesController = {
  getAllServices: async (req, res) => {
    try {
      const services= await Services.findAll();
      res.status(200).json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los servicios" });
    }
  },

  getServiceById: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ message: "Servicio no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el servicio" });
    }
  },

  createService: async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
      const newService = await Services.create({ nombre, descripcion });
      res.status(201).json(newService);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el servicio" });
    }
  },

  updateService: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        await service.update({ nombre, descripcion });
        res.status(200).json({ message: "Servicio actualizado exitosamente" });
      } else {
        res.status(404).json({ message: "Servicio no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el servicio" });
    }
  },

  deleteService: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        await service.destroy();
        res.status(200).json({ message: "Servicio eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Servicio no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el servicio" });
    }
  },
};

module.exports = servicesController;
