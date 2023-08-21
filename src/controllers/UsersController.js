const {usuarios,datos_persona,tipo_usuario,usuarios_verificacion} = require("../db");
const { Op } = require("sequelize");
const {createHash} = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const Sequelize = require("sequelize");

exports.create= async (data)=>{
    let result={};
    try {
        if(data.dataCliente){
            let dtaPersona= {
                nombre: data.dataCliente.nombre,
                apellido: data.dataCliente.apellido,
                dni: data.dataCliente.dni,
                correo_electronico: data.dataCliente.correo_electronico,
                direccion: data.dataCliente.direccion,
                telefono: data.dataCliente.telefono
            }
            const hash=createHash('sha256')
            let dtaUsuario={
                nombre_usuario:data.usuario,
	            contrasena:hash.digest(data.contra)
            }
            //Verficacion si los datos de la persona ya existe
            const personaExiste = await datos_persona.findOne({where:{[Op.eq]:{dni:dtaPersona.dni}}})
            if(!personaExiste){
                data_p=await datos_persona.create(dtaPersona).then(data=>{
                    dtaUsuario.id_persona = data.id
                });
            }else{
                dtaUsuario.id_persona = personaExiste.id
            }
            //Crear usuario
            user=await usuarios.create(dtaUsuario);
            
        }else{

        }
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
            attributes:{exclude:['contrasena','id_persona','id_tipo_usuario']},
            include:[{model: datos_persona},{model: tipo_usuario}]
        }).then((dta)=>{
            result.data = dta;
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
        await usuarios.FindOne({
            attributes:{exclude:['contrasena','id_persona','id_tipo_usuario']},
            include:[{model: datos_persona},{model: tipo_usuario}],
            where:{
                id:{
                    [Op.eq]:id
                } 
            }
        }).then((dta)=>{
            result.data = dta;
        });
        
    } catch (error) {
        console.log(error)
        result.error=error.message;
    }
    return result;
}