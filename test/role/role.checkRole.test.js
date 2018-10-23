const { expect } = require('chai');
const Role = require('../../lib/Role');

describe('test role function', () => {
  it('should call role.func (without arg)', async () => {
    const role = new Role('role1', { func: () => 'hello' });
    const result = await role.checkRole();
    expect(result).to.equal('hello');
  });
  it('should call role.func (with arg)', async () => {
    const role = new Role('role1', { func: (arg) => arg });
    const result = await role.checkRole('42');
    expect(result).to.equal('42');
  });
  it('should work with many args', async() => {
    const role = new Role('role1', { func: (arg1, arg2) => `${arg1} ${arg2}` });
    const result = await role.checkRole('hello', 'world!');
    expect(result).to.equal('hello world!');
  });
  it('should work with async function', async () => {
    const role = new Role('role1', { func: (arg1) => Promise.resolve(arg1) });
    const result = await role.checkRole('42');
    expect(result).to.equal('42');
  });
});
