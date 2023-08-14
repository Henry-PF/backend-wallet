const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios_bolsillo', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_bolsillo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'saldo_bolsillo_global',
        key: 'id'
      }
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios_bolsillo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_bolsillo_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
          { name: "id_bolsillo" },
        ]
      },
    ]
  });
};
