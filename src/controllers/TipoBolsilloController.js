const { tipo_bolsillo } = require("../db.js");
const { Op } = require("sequelize");


    exports.getTipoBolsillo = async (data) => {
    try {
      console.log(data);
        const FindtipoBolsillo = await tipo_bolsillo.findOne({where: {id:{[Op.eq]: data}}});
        console.log(FindtipoBolsillo);
        return FindtipoBolsillo;

    } catch (error) {
      console.error(error);
      return error.message
    }
  };

  exports.createTipoBolsillo = async (data) => {
    try {
        const New_Tipo_Bolsillo = await tipo_bolsillo.create({
            nombre: "ARS"
        });
        return New_Tipo_Bolsillo.dataValues;
    } catch (error) {
      console.error(error);
      return error.message
    }
  };

