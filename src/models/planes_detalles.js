const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('planes_detalles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'planes',
        key: 'id'
      }
    },
    contenido: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'planes_detalles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "planes_detalles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
