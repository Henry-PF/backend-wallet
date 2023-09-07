const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tipo_bolsillo",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tipo_bolsillo",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "tipo_bolsillo_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
