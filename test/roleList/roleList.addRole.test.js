const { expect } = require('chai');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList addRole', () => {
  it('addRole should work as expected', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', (arg) => arg, ['feature1']);
    roleList.addRole(role1);
    expect(roleList.roles).to.be.an.instanceof(Object);
    expect(Object.keys(roleList.roles).length).to.equal(1);
  });
  it('should throw TypeError INVALID_ROLE_INSTANCE', () => {
    const roleList = new RoleList();
    expect(() => {
      roleList.addRole(1);
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_INSTANCE);
    expect(() => {
      roleList.addRole({});
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_INSTANCE);
    expect(() => {
      roleList.addRole('');
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_INSTANCE);
    expect(() => {
      roleList.addRole();
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_INSTANCE);
  });
  it('should throw Error DUPLICATE_ROLE_NAME', () => {
    const role1 = new Role('role1', (arg) => arg, ['feature1']);
    const roleList = new RoleList();
    roleList.addRole(role1);
    expect(() => {
      roleList.addRole(role1);
    }).to.throw(Error, RoleList.errors.DUPLICATE_ROLE_NAME);
  });
});
