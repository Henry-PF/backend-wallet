const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saldo_bolsillo_global', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo_bolsillo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_bolsillo',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'saldo_bolsillo_global',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "saldo_bolsillo_global_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
