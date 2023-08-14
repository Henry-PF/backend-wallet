const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registro_recarga', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario_receptor: {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'registro_recarga',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "registro_recarga_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
