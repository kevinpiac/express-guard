const { expect } = require('chai');
const Role = require('../../lib/Role');

describe('test role function', () => {
  it('should trigger the role func', () => {
    const role = new Role('testRole');
    const expected = 'Hello World!';
    role.func = (param) => `${param} World!`;
    const output = role.checkRole('Hello');
    expect(output).to.equal(expected);
  });
  it('should call role.func (without arg)', () => {
    const role = new Role('role1', { func: () => 'hello' });
    expect(role.checkRole()).to.equal('hello');
  });
  it('should call role.func (with arg)', () => {
    const role = new Role('role1', { func: (arg) => `hello ${arg}` });
    expect(role.checkRole('world!')).to.equal('hello world!');
  });
  it('should work with many args', () => {
    const role = new Role('role1', { func: (arg1, arg2) => `${arg1} ${arg2}` });
    expect(role.checkRole('hello', 'world!')).to.equal('hello world!');
  });
});
