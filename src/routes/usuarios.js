const { Router } = require("express");
const router = Router();
const {findAll,UserCreate,findId,Userdelete} = require("../handlers/UsersHandler");
const UsuarioBolsilloController = require("../controllers/UsuarioBolsilloController");
const TipoBolsilloController = require("../controllers/TipoBolsilloController");
const SaldoBolsilloController = require("../controllers/SaldoBolsilloController");

// usuario bolsillo / relacion entre el usuario y el bolsillo (monto y capacidad)
router.get("/bolsillo/:id", UsuarioBolsilloController.getBolsillo);
router.post("/bolsillo", UsuarioBolsilloController.createBolsillo);
// saldo bolsillo global / relacion entre el usuario bolsillo y el monto total de la cuenta
router.get("/bolsillo_global", SaldoBolsilloController.getBolsilloGlobal );
router.post("/bolsillo_global", SaldoBolsilloController.createBolsilloGlobal);
// tipo bolsillo / relacion del saldo bolsiilo global y el tipo de moneda que maneja la cuenta (ARS, USD, VES)
router.get("/tipo_bolsillo", TipoBolsilloController.getTipoBolsillo);
router.post("/tipo_bolsillo", TipoBolsilloController.createTipoBolsillo);

router.get("/getAll", findAll);
router.post("/", UserCreate);
router.get("/:id",findId);
router.post("/delete",Userdelete);


module.exports = router;