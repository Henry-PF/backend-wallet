const { usuarios_bolsillo, datos_persona } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");


const UsuarioBolsilloController = {

    getBolsillo: async (req, res) => {
        const DNIuser = req.params.id;
    try {
        const UserFound = await datos_persona.findOne({where:{dni:{[Op.eq]:DNIuser}}});
       const idUser = UserFound.dataValues.id; 
        const FindBolsillo = await usuarios_bolsillo.findOne({where: {id_usuario:{[Op.eq]: idUser}}});
        console.log(FindBolsillo);
        const saldoBolsilloGlobal = await axios.get(`http://localhost:3001/usuarios/bolsillo_global/${FindBolsillo.dataValues.id_bolsillo}`);

        const result = {
            saldo: FindBolsillo.dataValues.saldo,
            capacidad: FindBolsillo.dataValues.capacidad,
            saldoBolsilloGlobal: saldoBolsilloGlobal.data,
        }

      return res.status(201).send(result);
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
            id_usuario: data.id,
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
  updateBolsillo: async (req, res) => {
    const data = req.body;
    const DNIuser = req.params.id;
    try {
        const UserFound = await datos_persona.findOne({where:{dni:{[Op.eq]:DNIuser}}});
        const id = UserFound.dataValues.id; 
        const usuarioByBolsillo = await usuarios_bolsillo.findOne({where: {id_usuario:{[Op.eq]: id}}});
        const montoIngresado = data.montoIngresado;
        console.log("-------------------------------------------------------");
        console.log(usuarioByBolsillo);
        console.log("-------------------------------------------------------");
        
          await usuarioByBolsillo.update({
            saldo: (Number(usuarioByBolsillo.dataValues.saldo) + Number(montoIngresado))
          })
        
        const saldoActualizado = await usuarios_bolsillo.findOne({where: {id_usuario:{[Op.eq]: id}}});
        
        console.log("-------------------------------------------------------");
        console.log(saldoActualizado);
        console.log("-------------------------------------------------------");
        return res.status(201).send("update de saldo");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Error al actualizar el usuario${id}`, "error": error.message });
    }
  },
};

module.exports = UsuarioBolsilloController;
