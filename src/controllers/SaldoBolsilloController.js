const { saldo_bolsillo_global } = require("../db.js");
const { Op } = require("sequelize");
const axios = require("axios");

const SaldoBolsilloController = {

    getBolsilloGlobal: async (req, res) => {
        const idUser = Number(req.params.id);
    try {
        const FindBolsilloGlobal = await saldo_bolsillo_global.findOne({where: {id_tipo_bolsillo:{[Op.eq]: idUser}}});

        const tipo_bolsillo = await axios(`http://localhost:3001/usuarios/tipo_bolsillo/${FindBolsilloGlobal.id}`);

        const result = {
             monto: FindBolsilloGlobal.monto, 
              tipo_bolsillo: tipo_bolsillo.data.nombre};

        return res.status(201).send(result);
    }
        catch(error){
      res.status(500).json({ "error": error.message});
    }
  },

  createBolsilloGlobal: async (req, res) => {
    try {
        const tipoBolsillo = await axios.post("http://localhost:3001/usuarios/tipo_bolsillo");
        
        const billetera = await saldo_bolsillo_global.create({
            id_tipo_bolsillo: tipoBolsillo.data.id,
            monto: 0
        })

       return res.status(201).send(billetera)
    } catch (error) {
      console.error(error); 
      res.status(500).json({ "error": error.message});
    }
  },
};

module.exports = SaldoBolsilloController;
