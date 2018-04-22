const { expect } = require('chai');
const Guard = require('../../lib/Guard');
const RoleList = require('../../lib/RoleList');

describe('test guard constructor', () => {
  it('should return a Guard instance', () => {
    const guard = new Guard();
    expect(guard).to.be.an.instanceof(Guard);
  });
  it('should init default properties', () => {
    const guard = new Guard();
    expect(guard.roles).to.be.an.instanceOf(RoleList);
  });
});
