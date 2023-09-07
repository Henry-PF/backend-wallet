const { usuarios_bolsillo, datos_persona } = require("../db");
const {getBolsilloGlobal, createBolsilloGlobal} = require("./SaldoBolsilloController");
const { Op } = require("sequelize");
const axios = require("axios");

exports.getBolsillo = async (data) => {
  try {
    const UserFound = await datos_persona.findOne({ where: { dni: { [Op.eq]: data } } });
    const idUser = UserFound.dataValues.id;
    const FindBolsillo = await usuarios_bolsillo.findOne({ where: { id_usuario: { [Op.eq]: idUser } } });
    const saldoBolsilloGlobal = await getBolsilloGlobal(FindBolsillo.dataValues.id_bolsillo)
    const result = {
      saldo: FindBolsillo.dataValues.saldo,
      capacidad: FindBolsillo.dataValues.capacidad,
      saldoBolsilloGlobal: saldoBolsilloGlobal.data,
    }
    return result;
  } catch (error) {
    console.error(error);
    return error.message
  }
};

exports.createBolsillo = async (data) => {
  try {
    // me traigo el id de id_bolsillo 
    const bolsilloGlobal = await createBolsilloGlobal();
    // creo la relacion entre usuario y bolsillo
    const billetera = await usuarios_bolsillo.create({
      id_usuario: data.id,
      id_bolsillo: bolsilloGlobal.dataValues.id,
      saldo: 0,
      capacidad: 100000
    })
    return billetera;
  } catch (error) {
    console.error(error);
    return error.message  
  }
};
exports.updateBolsillo = async ({data, DNIuser}) => {
  try {
    const UserFound = await datos_persona.findOne({ where: { dni: { [Op.eq]: DNIuser } } });
    const id = UserFound.dataValues.id;
    const usuarioByBolsillo = await usuarios_bolsillo.findOne({ where: { id_usuario: { [Op.eq]: id } } });
    const montoIngresado = data.montoIngresado;
    await usuarioByBolsillo.update({
      saldo: (Number(usuarioByBolsillo.dataValues.saldo) + Number(montoIngresado))
    });
    const saldoActualizado = await usuarios_bolsillo.findOne({ where: { id_usuario: { [Op.eq]: id } } });

    return ({"update de saldo": saldoActualizado});
  } catch (error) {
    console.error(error);
    return error.message
  }
};