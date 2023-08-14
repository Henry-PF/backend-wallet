const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permisos_modulos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_modulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modulos',
        key: 'id'
      }
    },
    id_permiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permisos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'permisos_modulos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permisos_modulos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
