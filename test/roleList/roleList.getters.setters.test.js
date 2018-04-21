const { expect } = require('chai');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList getters/setters', () => {
  it('should get roles object', () => {
    const roleList = new RoleList();
    const expected = { fake: true, real: false };
    roleList.$roles = expected;
    expect(roleList.roles).to.deep.equal(expected);
  });
  it('should return roles array', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', (arg) => arg, ['feature1']);
    const role2 = new Role('role2', (arg) => arg, ['feature2']);
    roleList.addRole(role1);
    roleList.addRole(role2);
    const expected = [role1, role2];
    const res = roleList.toArray();
    expect(res).to.deep.equal(expected);
  });
});
