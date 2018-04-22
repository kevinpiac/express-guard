const { expect } = require('chai');
const Guard = require('../../lib/Guard');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test guard constructor', () => {
  it('should return a Guard instance', () => {
    const guard = new Guard();
    expect(guard).to.be.an.instanceof(Guard);
  });
  it('should init default properties', () => {
    const guard = new Guard();
    expect(guard.roles).to.be.an.instanceOf(RoleList);
  });
  it('should embed a Role class as static getter', () => {
    const role = new Guard.Role('name');
    expect(role).to.be.an.instanceOf(Role);
  });
});
