const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log_transacciones', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    traza: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'log_transacciones',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "log_transacciones_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
