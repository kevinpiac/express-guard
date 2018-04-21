const { expect } = require('chai');
const Role = require('../../lib/Role');

describe('test role constructor', () => {
  it('should return a Role instance', () => {
    const role = new Role('roleName');
    expect(role).to.be.an.instanceof(Role);
  });
  it('should throw Error ROLE_NAME_REQUIRED', () => {
    expect(() => {
      const role = new Role();
    }).to.throw(Error, Role.errors.ROLE_NAME_REQUIRED);
  });
  it('should instanciate a Role with default values', () => {
    const role = new Role('roleName');
    expect(role.features).to.deep.equal([]);
    expect(role.func).to.equal(null);
  });
});
