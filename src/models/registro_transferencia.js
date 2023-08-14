const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registro_transferencia', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    concepto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_usuario_emisor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_usuario_receptor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'registro_transferencia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "registro_transferencia_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
