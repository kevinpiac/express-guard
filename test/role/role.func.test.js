const { expect } = require('chai');
const errors = require('../../lib/errors');
const Role = require('../../lib/Role');

describe('test role function', () => {
  it('should have a func getter/setter', () => {
    const role = new Role('testRole');
    const expected = 'Hello';
    role.func = () => expected;
    const output = role.func();
    expect(output).to.equal(expected);
  });
  it('should throw a TypeError ROLE_FUNC_TYPE_ERROR', () => {
    const role = new Role('testRole');
    expect(() => {
      role.func = 1;
    }).to.throw(TypeError, errors.ROLE_FUNC_TYPE_ERROR);
    expect(() => {
      role.func = {};
    }).to.throw(TypeError, errors.ROLE_FUNC_TYPE_ERROR);
    expect(() => {
      role.func = [];
    }).to.throw(TypeError, errors.ROLE_FUNC_TYPE_ERROR);
    expect(() => {
      role.func = 'invalid';
    }).to.throw(TypeError, errors.ROLE_FUNC_TYPE_ERROR);
  });
});
