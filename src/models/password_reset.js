const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('password_reset', {
    id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'password_reset',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "password_reset_pkey",
        unique: true,
        fields: [
          { name: "id_users" },
        ]
      },
    ]
  });
};
