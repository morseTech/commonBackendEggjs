const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    platform: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "平台"
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "分类"
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
