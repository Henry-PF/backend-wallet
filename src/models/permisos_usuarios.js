const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permisos_usuarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_permisos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permisos',
        key: 'id'
      }
    },
    id_usuarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'permisos_usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permisos_usuarios_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
