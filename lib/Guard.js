const RoleList = require('./RoleList');

const Guard = class Guard {
  constructor() {
    this.roles = new RoleList();
  }

  config(config) {
    Object.keys(config).forEach((roleName) => {
      const role = config[roleName];
      const { features, func } = role;
      const newRole = new RoleList.Role(roleName, func, features);
      this.roles.addRole(newRole);
    });
  }
};

module.exports = Guard;
