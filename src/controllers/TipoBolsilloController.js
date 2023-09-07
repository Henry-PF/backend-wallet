const { tipo_bolsillo } = require("../db.js");
const { Op } = require("sequelize");

const TipoBolsilloController = {

    getTipoBolsillo: async (req, res) => {
        const idUser = Number(req.params.id);
    try {
        const FindtipoBolsillo = await tipo_bolsillo.findOne({where: {id:{[Op.eq]: idUser}}});
        return res.status(201).send(FindtipoBolsillo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el Tipo Bolsillo" });
    }
  },

  createTipoBolsillo: async (req, res) => {
    try {
        const New_Tipo_Bolsillo = await tipo_bolsillo.create({
            nombre: "ARS"
        })

        return res.status(201).send(New_Tipo_Bolsillo.dataValues)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la relacion Tipo Bolsillo" });
    }
  },
};

module.exports = TipoBolsilloController;
