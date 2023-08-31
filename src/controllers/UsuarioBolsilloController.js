const { usuarios_bolsillo } = require("../db");
const { usuarios } = require("../db");
const { Op } = require("sequelize");

const axios = require("axios");
const SaldoBolsilloController = require("./SaldoBolsilloController");

const UsuarioBolsilloController = {

    getBolsillo: async (req, res) => {
        const idUser = Number(req.params.id);
    try {
        const FindBolsillo = await usuarios_bolsillo.findOne({where: {id_usuario:{[Op.eq]: idUser}}});
      return res.status(201).send(FindBolsillo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario Bolsillo" });
    }
  },

  createBolsillo: async (req, res) => {
    const data = req.body
    try {
        // me traigo el id de id_bolsillo 
        const bolsilloGlobal = await axios.post("http://localhost:3001/usuarios/bolsillo_global");
        // creo la relacion entre usuario y bolsillo
        const billetera = await usuarios_bolsillo.create({
            id_usuario: data.id_Usuario,
            id_bolsillo: bolsilloGlobal.data.id,
            saldo: 0,
            capacidad: 100000
        })
        return res.status(201).send(billetera);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la relacion Usuario Bolsillo" });
    }
  },
};

module.exports = UsuarioBolsilloController;
