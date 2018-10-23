const { expect } = require('chai');
const Guard = require('../../lib/Guard');
const Role = require('../../lib/Role');

describe('test guard roles', () => {
  it('should add many roles to guard roleList', () => {
    const guard = new Guard();
    const role1 = new Guard.Role('role1');
    const role2 = new Guard.Role('role2');
    const role3 = new Guard.Role('role3');
    guard.roles = [role1, role2, role3];
    expect(guard.$roles.getRole('role1')).to.be.an.instanceof(Role);
    expect(guard.$roles.getRole('role2')).to.be.an.instanceof(Role);
    expect(guard.$roles.getRole('role3')).to.be.an.instanceof(Role);
  });
  it('should have a role getter', () => {
    const guard = new Guard();
    const role1 = new Guard.Role('role1');
    guard.roles = [role1];
    expect(guard.roles).to.deep.equal(guard.$roles);
  });
});
