const errors = require('./errors');

const Role = class Role {
  constructor(roleName) {
    if (!roleName) { throw new Error(errors.ROLE_NAME_REQUIRED); }

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

  set features(val) {
    if (!Array.isArray(val)) {
      throw new TypeError(errors.ROLE_FEATURES_TYPE_ERROR);
    }
    this.$features = val;
  }
  get features() { return this.$features; }

  set func(val) {
    if (typeof val !== 'function') {
      throw new TypeError(errors.ROLE_FUNC_TYPE_ERROR);
    }
    this.$func = val;
  }
  get func() { return this.$func; }

  set name(val) {
    if (!val) { throw new Error(errors.ROLE_NAME_REQUIRED); }
    if (typeof val !== 'string') { throw new TypeError(errors.ROLE_NAME_TYPE_ERROR); }

    this.$name = val;
  }
  get name() { return this.$name; }
};

module.exports = Role;
