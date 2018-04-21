const roleErrors = {
  ROLE_NAME_REQUIRED: 'Role name is required',
  ROLE_FEATURES_TYPE_ERROR: 'Role features must be an array of strings',
  ROLE_FUNC_TYPE_ERROR: 'Role func must be a function',
  ROLE_NAME_TYPE_ERROR: 'Role name must be a string',
};

const Role = class Role {
  constructor(roleName) {
    if (!roleName) { throw new Error(roleErrors.ROLE_NAME_REQUIRED); }

    this.$name = roleName;
    this.$features = [];
    this.$func = null;
  }

  static isValid(role) {
    if (role && role instanceof Role) { return true; }
    return false;
  }

  checkRole(req) {
    return this.func(req);
  }

  static get errors() { return roleErrors; }

  set features(val) {
    if (!Array.isArray(val)) {
      throw new TypeError(roleErrors.ROLE_FEATURES_TYPE_ERROR);
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
