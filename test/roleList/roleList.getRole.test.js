const { expect } = require('chai');
const errors = require('../../lib/errors');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList getRole', () => {
  it('should find and return the corresponding role', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', (arg) => arg, ['feature1']);
    const role2 = new Role('role2', (arg) => arg, ['feature2']);
    roleList.addRole(role1);
    roleList.addRole(role2);
    expect(roleList.getRole('role1')).to.deep.equal(role1);
    expect(roleList.getRole('role1')).to.be.an.instanceof(Role);
    expect(roleList.getRole('role2')).to.deep.equal(role2);
    expect(roleList.getRole('role2')).to.be.an.instanceof(Role);
  });
  it('should throw Error ROLE_NOT_FOUND', () => {
    const roleList = new RoleList();
    expect(() => {
      roleList.getRole('42');
    }).to.throw(Error, RoleList.errors.ROLE_NOT_FOUND);
    const role1 = new Role('role1', (arg) => arg, ['feature1']);
    const role2 = new Role('role2', (arg) => arg, ['feature2']);
    expect(() => {
      roleList.getRole('42');
    }).to.throw(Error, RoleList.errors.ROLE_NOT_FOUND);
  });
});
