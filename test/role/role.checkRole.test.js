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
});
