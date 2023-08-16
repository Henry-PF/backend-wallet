const { Router } = require("express");
const router = Router();
const {findAll} = require("../handlers/UsersHandler")


router.get("/getAll", findAll);

module.exports = router;