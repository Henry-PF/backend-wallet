const {usuarios,datos_persona,tipo_usuario,usuarios_verificacion} = require("../db");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

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
            let hashF= bcrypt.hash(data.contra, 10).then(hash => {
                return hash;
            })
            let dtaUsuario={
                nombre_usuario:data.usuario,
	            contrasena:hashF,
                id_tipo_usuario:2,
                isverified:false,
                isactivo:true
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
            if (user) {
                result.data    = user;
                result.message = "Usuario registrado con éxito";
            } else {
                throw new Error("Error al intentar registrar el usuario");
            }
            
        }else{
            throw new Error("Error faltan datos para proceder con el registro");
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

exports.login= async (data)=>{
    let result={};
    try {
        await usuarios.FindOne({
            include:[{model: datos_persona},{model: tipo_usuario}],
            where:{
                [Op.or]:{
                    nombre_usuario:{
                        [Op.eq]:data.user
                    },
                    email:{
                        [Op.eq]:data.user
                    }
                }
                
            }
        }).then((dta)=>{
            if(!bcryptjs.compareSync(data.pass,dta[0].contrasena)){
                throw new Error('Contraseña incorrecta');
            }else{
                const secretKey = "mZ1IWqsOvcTD31fPsDLig8TZ7v8nkTTB";
                const token = jwt.sign({ userId: user.id }, secretKey, {
                    expiresIn: "1h",
                });
                result.data     = dta;
                result.token    = token;
            }
            
        });
        
    } catch (error) {
        console.log(error)
        result.error=error.message;
    }
    return result;
}