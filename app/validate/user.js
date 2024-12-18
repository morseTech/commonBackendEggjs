module.exports = app => {
  const { validator } = app;
  const rules = [
    // 用户名规则
    {
      name: 'username',
      valid: /^([0-9a-zA-Z\u4e00-\u9fa5]{3,20})$/,
      message: '长度须是3到20之间',
    },
    // 密码规则
    {
      name: 'password',
      valid: /^[A-Za-z0-9!_-]{6,20}$/,
      message: '密码必须包含6-20个英文字母、数字和!_-特殊符号',
    },
    // 正整数规则
    {
      name: 'absInteger',
      valid: /^[1-9]\d*$/,
      message: '必须是正整数',
    },
    // 浮点数规则
    {
      name: 'float',
      valid: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
      message: '必须是浮点数',
    },
  ];

  rules.forEach(myrule => {
    const { name, valid, message } = myrule;
    validator.addRule(name, (rule, value) => {
      if (!valid.test(value)) {
        return message;
      }
    });
  });
};
