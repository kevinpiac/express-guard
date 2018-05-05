const { expect } = require('chai');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList rolesByAllowedFeatures', () => {
  it('should return roles by features', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', {
      can: ['feature1', 'feature2'],
    });
    const role2 = new Role('role2', {
      can: ['feature3', 'feature4'],
    });
    roleList.addRole(role1);
    roleList.addRole(role2);
    expect(roleList.getRolesByFeatures(['feature1'])).to.deep.equal([
      role1,
    ]);
    expect(roleList.getRolesByFeatures(['feature4'])).to.deep.equal([
      role2,
    ]);
    expect(roleList.getRolesByFeatures(['feature4', 'feature1'])).to.deep.equal([
      role1, role2,
    ]);
    expect(roleList.getRolesByFeatures(['feature3', 'feature2'])).to.deep.equal([
      role1, role2,
    ]);
    expect(roleList.getRolesByFeatures(['feature4', 'feature3'])).to.deep.equal([
      role2,
    ]);
    expect(roleList.getRolesByFeatures(['feature1', 'feature2'])).to.deep.equal([
      role1,
    ]);
  });
  it('should return an empty list without args', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', {
      can: ['feature1', 'feature2'],
    });
    const role2 = new Role('role2', {
      can: ['feature3', 'feature4'],
    });
    roleList.addRole(role1);
    roleList.addRole(role2);
    expect(roleList.getRolesByFeatures()).to.deep.equal([]);
  });
  it('should throw Error INVALID_FEATURE_LIST', () => {
    const roleList = new RoleList();
    const role1 = new Role('role1', {
      can: ['feature1', 'feature2'],
    });
    const role2 = new Role('role2', {
      can: ['feature3', 'feature4'],
    });
    roleList.addRole(role1);
    roleList.addRole(role2);
    expect(() => {
      roleList.getRolesByFeatures({});
    }).to.throw(Error, RoleList.errors.INVALID_FEATURE_LIST);
  });
});
