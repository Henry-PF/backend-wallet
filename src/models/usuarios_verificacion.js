const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios_verificacion', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    img_front: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    img_dni_front: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    img_dni_back: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios_verificacion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_verificacion_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
