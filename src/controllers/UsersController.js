const {usuarios,datos_persona,tipo_usuario,usuarios_verificacion} = require("../db");
const { Op } = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const Sequelize = require("sequelize");

exports.create= async (data)=>{
    let result={};
    try {
        
    } catch (error) {
        result.error=error.message;
    }
    return result;
}
exports.update= async (data)=>{
    let result={};
    try {
        
    } catch (error) {
        result.error=error.message;
    }
    return result;
}
exports.findAll= async ()=>{
    let result={};
    try {
        await usuarios.findAll({
            attributes:['id'],
            include:{model: datos_persona}
        }).then((dta)=>{
            result.data = dta;
            console.log("dta: ",dta);
        });
        
    } catch (error) {
        console.log(error)
        result.error=error.message;
    }
    return result;
}
exports.FindOne= async (id)=>{
    let result={};
    try {
        
    } catch (error) {
        result.error=error.message;
    }
    return result;
}