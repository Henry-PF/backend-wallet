const { Router } = require("express");
const router = Router();
const {getAll} = require("../handlers/BolsilloGlobalHandler");

router.get("/", getAll);


module.exports = router;