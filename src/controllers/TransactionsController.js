const { Transactions } = require("../db.js");

const transactionsController = {
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transactions.findAll();
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las transacciones" });
    }
  },

  getTransactionById: async (req, res) => {
    const { id } = req.params;
    try {
      const transaction = await Transactions.findByPk(id);
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
      const newTransaction = await Transactions.create({
        concepto,
        id_usuario_emisor,
        monto,
        id_usuario_receptor,
        fecha,
      });

      res.status(201).json(newTransaction);
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
      const transaction = await Transactions.findByPk(id);
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
      const transaction = await Transactions.findByPk(id);
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
