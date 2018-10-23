const Role = require('./Role');

const roleListErrors = {
  INVALID_ROLE_INSTANCE: 'This role instance is not valid',
  DUPLICATE_ROLE_NAME: 'This role name is already in list',
  ROLE_NOT_FOUND: 'This role does not exist',
  INVALID_ROLE_LIST: 'Role list must be an array of roles',
  INVALID_FEATURE_LIST: 'Feature list must be an array of strings (features)',
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

  // / A ROLE SHOULD HAVE ALL FIELD REQUIRED
  // / TO BE ADDED TO ROLE LIST
  // / EACH TIME A ROLE IS ADDED WE'LL MAP
  // / AN OBJECT BY FEATURES

  async checkRoles(...args) {
    const results = {};
    const roles = this.toArray();
    const promises = [];
    roles.forEach((role) => {
      const length = promises.push(role.checkRole(...args));
      results[role.name] = length - 1; // role promise index
    });
    const computedRoles = await Promise.all(promises);
    Object.keys(results).forEach((key) => {
      results[key] = computedRoles[results[key]];
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

  getRolesByFeatures(features = []) {
    if (!Array.isArray(features)) {
      throw new Error(roleListErrors.INVALID_FEATURE_LIST);
    }
    const roles = {};
    this.toArray().forEach((role) => {
      features.forEach((feature) => {
        if (role.features.includes(feature)) {
          roles[role.name] = role;
        }
      });
    });
    return Object.values(roles);
  }

  toArray() {
    return Object.values(this.roles);
  }

  static get errors() { return roleListErrors; }

  static get Role() { return Role; }

  get roles() { return this.$roles; }
};

module.exports = RoleList;
