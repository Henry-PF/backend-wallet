const { Router } = require("express");
const router = Router();
const { findAll, UserCreate, findId, Userdelete, UserFilter } = require("../handlers/UsersHandler")

router.get("/filter", UserFilter);
router.get("/getAll", findAll);
router.post("/", UserCreate);
router.get("/:id", findId)
router.post("/delete", Userdelete)

module.exports = router;