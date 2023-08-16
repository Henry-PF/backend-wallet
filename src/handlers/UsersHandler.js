const { create,update,findAll,FindOne} = require("../controllers/UsersController");
exports.UserCreate= async (req, res) => {
    let result={};
    try {
        
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al registrar el usuario." } });
    }
}

exports.UserUpdate= async (req, res) => {
    let result={};
    try {
        
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al actualizar el usuario." } });
    }
}

exports.findAll= async (req, res) => {
    let result={};
    try {
        result = await findAll();
        if(result){
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la data del usuario." } });
    }
}

exports.findOne= async (req, res) => {
    let result={};
    try {
        
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
}