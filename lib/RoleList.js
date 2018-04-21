const Role = require('./Role');

const roleListErrors = {
  INVALID_ROLE_INSTANCE: 'This role instance is not valid',
  DUPLICATE_ROLE_NAME: 'This role name is already in list',
  ROLE_NOT_FOUND: 'This role does not exist',
};

const RoleList = class RoleList {
  constructor() {
    this.$roles = {};
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

  get roles() {
    return this.$roles;
  }
};

module.exports = RoleList;
