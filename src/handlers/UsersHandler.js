const { create, update, findAll, FindID, Delete } = require("../controllers/UsersController");

exports.UserCreate = async (req, res) => {
    let result = {};
    try {
        result = await create(req);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { message: "Error al registrar el usuario." } });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { message: "Error al registrar el usuario." } });
  }
};

exports.UserUpdate = async (req, res) => {
    let result = {};
    try {

    } catch (error) {
        return res.status(500).json({ error: { message: "Error al actualizar el usuario." } });
    }
}

exports.findAll = async (req, res) => {
    let result = {};
    try {
        result = await findAll();
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la data del usuario." } });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: "Error al consultar la data del usuario." } });
  }
};

exports.findId = async (req, res) => {
    let result = {};
    try {
        result = await FindID(req.params.id);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: "Error al consultar la base de datos." } });
  }
};

exports.Userdelete = async (req, res) => {
    let result = {};
    try {
        result = await Delete(req.body.id);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: "Error al consultar la base de datos." } });
  }
};
