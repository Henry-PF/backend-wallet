const { usuarios_contacto } = require("../db.js");

const contactsController = {
  getAllContacts: async (req, res) => {
    try {
      const contacts = await usuarios_contacto.findAll();
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los contactos" });
    }
  },

  getContactById: async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await usuarios_contacto.findByPk(id);
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: "Contacto no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el contacto" });
    }
  },

  createContact: async (req, res) => {
    const { id_usuario, id_usuario_contacto, alias } = req.body;

    try {
      const newContact = await usuarios_contacto.create({
        id_usuario,
        id_usuario_contacto,
        alias,
      });

      res.status(201).json(newContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el contacto" });
    }
  },

  updateContact: async (req, res) => {
    const { id } = req.params;
    const { id_usuario, id_usuario_contacto, alias } = req.body;
    try {
      const contact = await usuarios_contacto.findByPk(id);
      if (contact) {
        await contact.update({ id_usuario, id_usuario_contacto, alias });
        res.status(200).json({ message: "Contacto actualizado exitosamente" });
      } else {
        res.status(404).json({ message: "Contacto no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el contacto" });
    }
  },

  deleteContact: async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await usuarios_contacto.findByPk(id);
      if (contact) {
        await contact.destroy();
        res.status(200).json({ message: "Contacto eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Contacto no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el contacto" });
    }
  },
};

module.exports = contactsController;
