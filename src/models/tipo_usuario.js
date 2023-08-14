const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_usuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_usuario_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
