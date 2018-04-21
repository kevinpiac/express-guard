const { expect } = require('chai');
const errors = require('../../lib/errors');
const Role = require('../../lib/Role');

describe('test role static isValid', () => {
  it('should return true', () => {
    const role = new Role('testRole');
    expect(Role.isValid(role)).to.equal(true);
  });
  it('should return false', () => {
    expect(Role.isValid(1)).to.equal(false);
    expect(Role.isValid(true)).to.equal(false);
    expect(Role.isValid(false)).to.equal(false);
    expect(Role.isValid(null)).to.equal(false);
    expect(Role.isValid()).to.equal(false);
    expect(Role.isValid('invalid')).to.equal(false);
    expect(Role.isValid({})).to.equal(false);
    expect(Role.isValid([])).to.equal(false);
  });
});
