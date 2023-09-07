const {getBolsillo, createBolsillo, updateBolsillo} = require("../controllers/UsuarioBolsilloController")

exports.bolsillofindId= async (req, res) => {
    const DNIuser = req.params.id;
    try {
       const result = await getBolsillo(DNIuser);
       return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ "Error": { message: error.message } });
    }
}

exports.bolsilloCreate= async (req, res) => {
    const data = req.body
    try {
       const result =  await createBolsillo(data); 

       return res.status(201).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "Error": { message: error.message } });
    }
}

exports.bolsilloUpdate= async (req, res) => {
    const toSend = {
        data: req.body,
        DNIuser: req.params.id
    }
    try {
        const result = await updateBolsillo(toSend);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ "Error": { message: error.message } });
    }
}

