const {getBolsilloGlobal, createBolsilloGlobal} = require("../controllers/SaldoBolsilloController");


exports.bolsilloGlobalfindId= async (req, res) => {
    const idUser = Number(req.params.id);
    try {
        const result = await getBolsilloGlobal(idUser);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ "Error": { message: error.message } });
    }
}

exports.bolsilloGlobalCreate= async (req, res) => {
    try {
       const result = await createBolsilloGlobal();

       return res.status(201).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "Error": { message: error.message } });
    }
}

