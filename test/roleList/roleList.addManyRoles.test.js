const { expect } = require('chai');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList addRole', () => {
  it('addManyRoles should work as expected', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', (arg) => arg, ['feature1']);
    const role2 = new Role('role2', (arg) => arg, ['feature1']);
    roleList.addManyRoles([role1, role2]);
    expect(Object.keys(roleList.roles).length).to.equal(2);
  });
  it('should throw Error INVALID_ROLE_LIST', () => {
    const roleList = new RoleList();
    expect(() => {
      roleList.addManyRoles('invalid');
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_LIST);
    expect(() => {
      roleList.addManyRoles(1);
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_LIST);
    expect(() => {
      roleList.addManyRoles({});
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_LIST);
    expect(() => {
      roleList.addManyRoles();
    }).to.throw(Error, RoleList.errors.INVALID_ROLE_LIST);
  });
});
