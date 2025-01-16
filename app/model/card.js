const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    linkCode: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      comment: "标识链密码"
    },
    platform: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "平台"
    },
    platformId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "平台id"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "名称"
    },
    qrcode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "入口二维码"
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否接受公开查询"
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "备注"
    },
    sign: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "签名"
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "头像"
    },
    original: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "原创数量"
    }
  }, {
    sequelize,
    tableName: 'card',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "linkCode" },
        ]
      },
      {
        name: "chainId",
        using: "BTREE",
        fields: [
          { name: "linkCode" },
        ]
      },
    ]
  });
};
