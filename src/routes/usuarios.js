const { Router } = require("express");
const router = Router();
const {findAll,UserCreate,findId,Userdelete} = require("../handlers/UsersHandler");
const {bolsilloCreate, bolsilloUpdate, bolsillofindId} = require("../handlers/UserBolsilloHandler");
const  {tipoBolsilloCreate, tipoBolsilloUpdate, tipoBolsillofindId} = require("../handlers/TipoBolsilloHandler");
const {bolsilloGlobalCreate, bolsilloGlobalUpdate, bolsilloGlobalfindId} = require("../handlers/BolsilloGlobalHandler");

// usuario bolsillo / relacion entre el usuario y el bolsillo (monto y capacidad)
router.get("/bolsillo/:id", bolsillofindId);
router.post("/bolsillo/:id", bolsilloUpdate);
router.post("/bolsillo", bolsilloCreate);
// saldo bolsillo global / relacion entre el usuario bolsillo y el monto total de la cuenta
router.get("/bolsillo_global/:id", bolsilloGlobalfindId);
router.post("/bolsillo_global",bolsilloGlobalCreate);
// tipo bolsillo / relacion del saldo bolsiilo global y el tipo de moneda que maneja la cuenta (ARS, USD, VES)
router.get("/tipo_bolsillo/:id", tipoBolsillofindId);
router.post("/tipo_bolsillo", tipoBolsilloCreate);

router.get("/getAll", findAll);
router.post("/", UserCreate);
router.get("/:id",findId);
router.post("/delete",Userdelete);


module.exports = router;