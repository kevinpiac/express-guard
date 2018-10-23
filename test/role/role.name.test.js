const { expect } = require('chai');
const Role = require('../../lib/Role');

describe('test role name', () => {
  it('should have a name getter/setter', () => {
    const expected = 'testRole';
    const role = new Role(expected);
    role.name = expected;
    expect(role.name).to.equal(expected);
  });
  it('should throw TypeError ROLE_NAME_TYPE_ERROR', () => {
    const role = new Role('testRole');
    expect(() => {
      role.name = 1111;
    }).to.throw(TypeError, Role.errors.ROLE_NAME_TYPE_ERROR);
    expect(() => {
      role.name = () => true;
    }).to.throw(TypeError, Role.errors.ROLE_NAME_TYPE_ERROR);
    expect(() => {
      role.name = [];
    }).to.throw(TypeError, Role.errors.ROLE_NAME_TYPE_ERROR);
    expect(() => {
      role.name = {};
    }).to.throw(TypeError, Role.errors.ROLE_NAME_TYPE_ERROR);
  });
  it('should throw Error ROLE_NAME_REQUIRED', () => {
    const role = new Role('testRole');
    expect(() => {
      role.name = '';
    }).to.throw(Error, Role.errors.ROLE_NAME_REQUIRED);
    expect(() => {
      role.name = null;
    }).to.throw(Error, Role.errors.ROLE_NAME_REQUIRED);
    expect(() => {
      role.name = undefined;
    }).to.throw(Error, Role.errors.ROLE_NAME_REQUIRED);
  });
});
