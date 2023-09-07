const { saldo_bolsillo_global, tipo_bolsillo } = require("../db.js");
const {createTipoBolsillo} = require("./TipoBolsilloController.js");
const { Op } = require("sequelize");

   exports.getBolsilloGlobal = async (data) => {
    try {
        const FindBolsilloGlobal = await saldo_bolsillo_global.findOne({where: {id_tipo_bolsillo:{[Op.eq]: data}}});

        const tipoBolsillo = await tipo_bolsillo.findOne({where: {id:{[Op.eq]: data}}});

        const result = {
             monto: FindBolsilloGlobal.monto, 
              tipo_bolsillo: tipoBolsillo.dataValues.nombre};

        return result;
    }
        catch(error){
        return error.message
    }
  };

  exports.createBolsilloGlobal = async (data) => {
    try {
        const tipoBolsillo = await createTipoBolsillo();
        
        const billetera = await saldo_bolsillo_global.create({
            id_tipo_bolsillo: tipoBolsillo.id,
            monto: 0
        })

       return billetera;
    } catch (error) {
      console.error(error); 
      return error.message
    }
  };