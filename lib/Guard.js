const RoleList = require('./RoleList');
const Role = require('./Role');

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

  static get Role() {
    return Role;
  }
};

module.exports = Guard;
