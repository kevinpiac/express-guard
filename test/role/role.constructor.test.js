const { expect } = require('chai');
const Role = require('../../lib/Role');

describe('test role constructor', () => {
  it('should return a Role instance', () => {
    const role = new Role('roleName');
    expect(role).to.be.an.instanceof(Role);
  });
  it('should throw Error ROLE_NAME_REQUIRED', () => {
    expect(() => {
      const role = new Role();
    }).to.throw(Error, Role.errors.ROLE_NAME_REQUIRED);
  });
  it('should instanciate a Role with default values', () => {
    const role = new Role('roleName');
    expect(role.features).to.deep.equal([]);
    expect(role.func()).to.equal(false);
  });
  it('should instanciate a Role with all values', () => {
    const roleName = 'roletest';
    const func = () => 3;
    const features = ['ft1', 'ft2'];
    const role = new Role(roleName, {
      can: features,
      func,
    });
    expect(role.name).to.equal(roleName);
    expect(role.func()).to.equal(func());
    expect(role.features).to.deep.equal(features);
  });
  it('should have an errors static getter', () => {
    expect(Role.errors).to.be.an('object');
    expect(Role.errors.ROLE_NAME_REQUIRED).to.be.a('string');
  });
});
