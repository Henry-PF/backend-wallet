const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registro_retiro', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    destino_cuenta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    destino_dni: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    destino_nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    concepto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'registro_retiro',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "registro_retiro_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
