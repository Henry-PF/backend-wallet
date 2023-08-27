const {usuarios,datos_persona,tipo_usuario,usuarios_verificacion} = require("../db");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

exports.create= async (data)=>{
    let result   = {};
    let imgs     = data.files;
    let dataUser = data.body;
    let imgCloudinary={};
    try {
        if(dataUser.dataCliente){
            let dta =JSON.parse(dataUser.dataCliente);
            let dtaPersona= {
                nombre: dta.nombre,
                apellido: dta.apellido,
                dni: dta.dni,
                correo_electronico: dta.correo_electronico,
                direccion: dta.direccion,
                telefono: dta.telefono
            }
            let hashF= await bcrypt.hash(dataUser.contra, 10).then(hash => {
                return hash;
            })
            let dtaUsuario={
                nombre_usuario:dataUser.usuario,
	            contrasena:hashF,
                id_tipo_usuario:2,
                isverified:false,
                isactivo:true
            }
            //Verficacion si los datos de la persona ya existe
            const personaExiste = await datos_persona.findOne({where:{dni:{[Op.eq]:dtaPersona.dni}}})
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
            // almacenamos las imagenes
            
            Object.keys(imgs).forEach((img)=>{
                const extension = imgs[img].mimetype.split("/")[1];
                const validExtensions = ["png", "jpg", "jpeg"];
                if (!validExtensions.includes(extension)) {
                    return res.status(400).send("extesion de archivos no valida");
                }
            })
            const imgFront      = await cloudinary.v2.uploader.upload(imgs["imgFront"].tempFilePath);
            const imgFrontDni   = await cloudinary.v2.uploader.upload(imgs["imgFrontDni"].tempFilePath);
            const imgbackDni    = await cloudinary.v2.uploader.upload(imgs["imgbackDni"].tempFilePath);
            imgCloudinary["imgFront"] = imgFront.secure_url;
            imgCloudinary["imgFrontDni"] = imgFrontDni.secure_url;
            imgCloudinary["imgbackDni"] = imgbackDni.secure_url;
            let dataImg={
                id_usuario:user.id,
                img_front:imgCloudinary.imgFront,
                img_dni_front:imgCloudinary.imgFrontDni,
                img_dni_back:imgCloudinary.imgbackDni,
            }
            usuariosVerifi=await usuarios_verificacion.create(dataImg);
            if (usuariosVerifi) {
                result.data    = user;
                result.message = "Usuario registrado con éxito";
            } else {
                throw new Error("Error al intentar guardar las imagenes del usuario");
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
exports.FindID= async (id)=>{
    let result={};
    try {
        await usuarios.findOne({
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
        await datos_persona.findOne({
            include:[
                {
                    model: usuarios,
                    include:{model:tipo_usuario},
                    where:{
                        isactivo:{
                            [Op.eq]:true
                        }
                    }
                }
            ],
            where:{
                correo_electronico:{
                    [Op.eq]:data.user
                }
            }
        }).then((dta)=>{
            if(dta){
                if(!bcrypt.compareSync(data.pass,dta.usuarios[0].contrasena)){
                    throw new Error('Contraseña incorrecta');
                }else{
                    const secretKey = "mZ1IWqsOvcTD31fPsDLig8TZ7v8nkTTB";
                    const token = jwt.sign({ userId: dta.usuarios[0].nombre_usuario.id }, secretKey, {
                        expiresIn: "1h",
                    });
                    result.data     = dta;
                    result.token    = token;
                }
            }else{
                result.error= "Usuario no registrado";
            }
        });
        
    } catch (error) {
        console.log(error)
        result.error=error.message;
    }
    return result;
}

exports.Delete=async (id)=>{
    let result={};
    try {
        let dataUser = await usuarios.findOne({
            where:{
                id:{
                    [Op.eq]:id
                }
            }
        });
        if(dataUser){
            let dtaN = await usuarios.update({isactivo:false}, {
                where: {
                    id:{
                        [Op.eq]:id
                    }
                }
            });
            if(dtaN){
                result.data ={
                    message:"usuario eliminado con exito"
                };
            }
        }
    } catch (error) {
        console.log(error)
        result.error=error.message;
    }
    return result;
}