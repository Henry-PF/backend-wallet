const { registro_transferencia, usuarios, usuarios_bolsillo } = require("../db.js");
const { Op } = require("sequelize");

const transactionsController = {
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await registro_transferencia.findAll({
        include: [{ model: usuarios }],
      });
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las transacciones" });
    }
  },

  getTransactionById: async (req, res) => {
    const { id } = req.params;
    try {
      const transaction = await registro_transferencia.findByPk(id,{
        include: [{ model: usuarios }],
      });
      if (transaction) {
        res.status(200).json(transaction);
      } else {
        res.status(404).json({ message: "Transaccion no encontrada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la transaccion" });
    }
  },

  createTransaction: async (req, res) => {
    const { concepto, id_usuario_emisor, monto, id_usuario_receptor, fecha } =
      req.body;

    try {
      //verificar usuario emisor
      let usuario_emisor = await usuarios.findByPk(id_usuario_emisor);
      if (usuario_emisor) {
        let usuario_receptor = await usuarios.findByPk(id_usuario_receptor);
        if (usuario_receptor) {
          let saldo_usuario_emi = await usuarios_bolsillo.findOne(
            {
              where: { 
                id_usuario: { 
                  [Op.eq]: usuario_emisor.id 
                } 
              },
              include: [{ model: usuarios }]
            });
            if(saldo_usuario_emi){
              if(parseFloat(saldo_usuario_emi.saldo)>=parseFloat(monto)){
                let newTransaction = await registro_transferencia.create({
                  concepto,
                  id_usuario_emisor,
                  monto,
                  id_usuario_receptor,
                  fecha,
                });
                if(newTransaction){
                  let new_saldo = {saldo:parseFloat(saldo_usuario_emi.saldo)-parseFloat(monto)}
                  await saldo_usuario_emi.update(new_saldo);
                  let saldo_usuario_rep = await usuarios_bolsillo.findOne({
                    where: { 
                      id_usuario: { 
                        [Op.eq]: usuario_receptor.id 
                      } 
                    },
                    include: [{ model: usuarios }]
                  });
                  if(saldo_usuario_rep){
                    let new_saldo_rep = {saldo:parseFloat(saldo_usuario_rep.saldo)+parseFloat(monto)}
                    await saldo_usuario_rep.update(new_saldo_rep);
                    res.status(201).json({ message: "Transaccion exitosamente" });
                  }else{
                    res.status(500).json({ message: "Error al obtener el saldo del receptor" });
                  }
                }else{
                  res.status(500).json({ message: "Transaccion no realiza" });
                }
              }else{
                res.status(500).json({ message: "Saldo insuficiente" });
              }
            }
        }else{
          res.status(500).json({ message: "Error usuario receptor no encontrado" });
        }
      }else{
        res.status(500).json({ message: "Error usuario emisor no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la transaccion" });
    }
  },

  updateTransaction: async (req, res) => {
    const { id } = req.params;
    const { concepto, id_usuario_emisor, monto, id_usuario_receptor, fecha } =
      req.body;
    try {
      const transaction = await registro_transferencia.findByPk(id);
      if (transaction) {
        await transaction.update({
          concepto,
          id_usuario_emisor,
          monto,
          id_usuario_receptor,
          fecha,
        });
        res
          .status(200)
          .json({ message: "Transaccion actualizada exitosamente" });
      } else {
        res.status(404).json({ message: "Transaccion no encontrada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la transaccion" });
    }
  },

  deleteTransaction: async (req, res) => {
    const { id } = req.params;
    try {
      const transaction = await registro_transferencia.findByPk(id);
      if (transaction) {
        await transaction.destroy();
        res.status(200).json({ message: "Transaccion eliminada exitosamente" });
      } else {
        res.status(404).json({ message: "Transaccion no encontrada" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el transaccion" });
    }
  },
};

module.exports = transactionsController;
