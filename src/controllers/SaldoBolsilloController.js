const { saldo_bolsillo_global } = require("../db.js");
const axios = require("axios");

const SaldoBolsilloController = {

    getBolsilloGlobal: async (req, res) => {
    const { id } = req.params;
    try {
        return res.status(201).send("HOLA COMO ESTAS");
    }
        catch{
      res.status(500).json({ message: "Error al obtener el Saldo Bolsillo Global" });
    }
  },

  createBolsilloGlobal: async (req, res) => {
    const {data} = req.body
    try {
        const tipoBolsillo = await axios.post("http://localhost:3001/usuarios/tipo_bolsillo");
        
        const billetera = await saldo_bolsillo_global.create({
            id_tipo_bolsillo: tipoBolsillo.data.id,
            monto: 0
        })

       return res.status(201).send(billetera)
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: "Error al crear la relacion Saldo Bolsillo Global" });
    }
  },
};

module.exports = SaldoBolsilloController;
