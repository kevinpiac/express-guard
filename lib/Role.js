const { hasDuplicate } = require('./common');

const roleErrors = {
  ROLE_NAME_REQUIRED: 'Role name is required',
  ROLE_FEATURES_TYPE_ERROR: 'Role features must be an array of strings',
  ROLE_FUNC_TYPE_ERROR: 'Role func must be a function',
  ROLE_NAME_TYPE_ERROR: 'Role name must be a string',
  DUPLICATE_ROLE_FEATURE: 'Role feature must be unique',
};

const Role = class Role {
  constructor(roleName, options = {}) {
    if (!roleName) { throw new Error(roleErrors.ROLE_NAME_REQUIRED); }

    const { can, func } = options;

    this.$name = roleName;
    this.$features = can || [];
    this.$func = func || (() => false);
  }

  static isValid(role) {
    if (role && role instanceof Role) { return true; }
    return false;
  }

  async checkRole(...args) {
    return Promise.resolve(this.func(...args));
  }

  static get errors() { return roleErrors; }

  set features(val) {
    if (!Array.isArray(val)) {
      throw new TypeError(roleErrors.ROLE_FEATURES_TYPE_ERROR);
    }
    if (hasDuplicate(val)) {
      throw new Error(roleErrors.DUPLICATE_ROLE_FEATURE);
    }
    this.$features = val;
  }

  get features() { return this.$features; }

  set func(val) {
    if (typeof val !== 'function') {
      throw new TypeError(roleErrors.ROLE_FUNC_TYPE_ERROR);
    }
    this.$func = val;
  }
  get func() { return this.$func; }

  set name(val) {
    if (!val) { throw new Error(roleErrors.ROLE_NAME_REQUIRED); }
    if (typeof val !== 'string') { throw new TypeError(roleErrors.ROLE_NAME_TYPE_ERROR); }

    this.$name = val;
  }
  get name() { return this.$name; }
};

module.exports = Role;
