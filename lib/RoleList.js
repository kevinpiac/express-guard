const Role = require('./Role');

const roleListErrors = {
  INVALID_ROLE_INSTANCE: 'This role instance is not valid',
  DUPLICATE_ROLE_NAME: 'This role name is already in list',
  ROLE_NOT_FOUND: 'This role does not exist',
  INVALID_ROLE_LIST: 'Role list must be an array of roles',
};

const RoleList = class RoleList {
  constructor(roles) {
    this.$roles = {};
    if (roles) {
      this.addManyRoles(roles);
    }
  }

  addManyRoles(roles) {
    if (!roles || !Array.isArray(roles)) {
      throw Error(roleListErrors.INVALID_ROLE_LIST);
    }
    roles.forEach((role) => {
      this.addRole(role);
    });
  }

  addRole(role) {
    if (!Role.isValid(role)) {
      throw new Error(roleListErrors.INVALID_ROLE_INSTANCE);
    }
    if (this.$roles[role.name]) {
      throw new Error(roleListErrors.DUPLICATE_ROLE_NAME);
    }
    this.$roles[role.name] = role;
  }

  checkRoles(...args) {
    const results = {};
    const roles = this.toArray();
    roles.forEach((role) => {
      results[role.name] = role.checkRole(...args);
    });
    return results;
  }

  getRole(name) {
    const role = this.$roles[name];
    if (!role) {
      throw new Error(roleListErrors.ROLE_NOT_FOUND);
    }
    return role;
  }

  toArray() {
    return Object.values(this.roles);
  }

  static get errors() { return roleListErrors; }

  static get Role() { return Role; }

  get roles() {
    return this.$roles;
  }
};

module.exports = RoleList;
