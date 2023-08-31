const { tipo_bolsillo } = require("../db.js");
// const tipo_bolsillo = require("../models/tipo_bolsillo.js");

const TipoBolsilloController = {

    getTipoBolsillo: async (req, res) => {
    const { id } = req.params;
    try {
        return res.status(201).send("HOLA COMO ESTAS");

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
