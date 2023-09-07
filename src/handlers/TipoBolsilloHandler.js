const {getTipoBolsillo, createTipoBolsillo} = require("../controllers/TipoBolsilloController");

exports.tipoBolsilloCreate= async (req, res) => {
    try {
        const result = await createTipoBolsillo();
        return res.status(201).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "Error": { message: error.message } });
    }
}

exports.tipoBolsillofindId= async (req, res) => {
    const id= Number(req.params.id);
    try {
       const result = await getTipoBolsillo(id)
       return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ "Error": { message: error.message } });
    }
}
