const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('identifiercard', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    chainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '所在标识链的序号',
      references: {
        model: 'identifierchain',
        key: 'id',
      },
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '标识卡的类别',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '标识卡的内容',
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '标识卡的图片信息',
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: '是否接受公开查询',
    },
  }, {
    sequelize,
    tableName: 'identifiercard',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ],
      },
      {
        name: 'chainId',
        using: 'BTREE',
        fields: [
          { name: 'chainId' },
        ],
      },
    ],
  });
};
