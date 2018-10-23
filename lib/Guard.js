const RoleList = require('./RoleList');
const Role = require('./Role');

const guardErrors = {
  FORBIDDEN: "You don't have required rights to access this ressource.",
};


const Guard = class Guard {
  constructor() {
    this.$roles = new RoleList();
  }

  requireAny(...allowedFeatures) {
    return async (req, res, next) => {
      const allowedRoles = this.roles.getRolesByFeatures(allowedFeatures);
      // TODO add `lazy` option allowing to compute roles one by one
      const promises = [];
      allowedRoles.forEach((role) => {
        promises.push(role.checkRole(req));
      });
      const results = await Promise.all(promises);
      if (results.includes(true)) {
        return next();
      }
      // TODO: add an error code OR anything to give more info about the error.
      return next(new Error(guardErrors.FORBIDDEN));
    };
  }

  static get Role() {
    return Role;
  }

  static get errors() { return guardErrors; }

  set roles(array) {
    this.$roles = new RoleList(array);
  }
  get roles() { return this.$roles; }
};

module.exports = Guard;
