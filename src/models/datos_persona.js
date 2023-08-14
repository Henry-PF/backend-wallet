const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datos_persona', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'datos_persona',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "datos_persona_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
