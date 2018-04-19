const guard = {
  roles: {},
};

/**
 * Registers a new role function and allowed features
 * @method addRole
 * @param  {string} roleName        The role name
 * @param  {function} roleFunc    The function used to calculate the role
 * @param  {[string]} features Allowed features for this role
 */
guard.addRole = (roleName, roleFunc, features) => {
  if (typeof roleName !== 'string') {
    throw new TypeError(`roleName expected string but got ${typeof roleName}`);
  }
  if (typeof roleFunc !== 'function') {
    throw new TypeError(`roleFunc expected function but got ${typeof roleFunc}`);
  }
  guard.roles[roleName] = {
    name: roleName,
    func: roleFunc,
    features,
  };
};

/**
 * Inits a configuration from a configuration object
 * @method config
 * @param  {Object} config Configuration object represenation
 */
guard.config = (config) => {
  const rolesConfig = config.roles;
  Object.keys(rolesConfig).forEach((roleName) => {
    guard.addRole(roleName, rolesConfig[roleName].check, rolesConfig[roleName].allowed);
  });
};

/**
 * Middleware used to protect a specific route
 * @method requireAny
 * @param  {[args]}   whiteList required features access
 */
guard.requireAny = () => true; // TODO

//
// guard.requireAny('listVote', 'role.authenticated');
module.exports = {
  guard,
};
