const { expect } = require('chai');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList constructor', () => {
  it('should return a RoleList instance', () => {
    const roleList = new RoleList();
    expect(roleList).to.be.an.instanceof(RoleList);
  });
  it('should init RoleList with default values', () => {
    const roleList = new RoleList();
    expect(roleList.$roles).to.deep.equal({});
  });
  it('should init RoleList with roles', () => {
    const roleList = new RoleList([
      new Role('role1'),
      new Role('role2'),
    ]);
    expect(roleList.getRole('role1')).to.be.an.instanceof(Role);
    expect(roleList.getRole('role2')).to.be.an.instanceof(Role);
  });
});
