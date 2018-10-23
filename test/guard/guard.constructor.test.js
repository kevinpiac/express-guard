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
    expect(Guard.Role.name).to.equal('Role');
  });
  it('should have an errors static getter', () => {
    expect(Guard.errors).to.be.an('object');
    expect(Guard.errors.FORBIDDEN).to.be.a('string');
  });
});
