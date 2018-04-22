const RoleList = require('./RoleList');
const Role = require('./Role');

const Guard = class Guard {
  constructor() {
    this.$roles = new RoleList();
  }

  static get Role() {
    return Role;
  }

  set roles(val) {
    this.$roles = new RoleList(val);
  }
  get roles() { return this.$roles; }
};

module.exports = Guard;
