const { expect } = require('chai');
const RoleList = require('../../lib/RoleList');
const Role = require('../../lib/Role');

describe('test roleList checkRoles method', () => {
  it('should check each role (sync func without arg)', async () => {
    const role1 = new Role('role1', {
      can: [],
      func() { return true; },
    });
    const role2 = new Role('role2', {
      can: [],
      func() { return false; },
    });
    const roleList = new RoleList([role1, role2]);
    const expected = { role1: true, role2: false };
    const res = await roleList.checkRoles();
    expect(res).to.deep.equal(expected);
  });
  it('should check each role (sync func with arg)', async () => {
    const role1 = new Role('role1', {
      can: [],
      func(arg) { return arg; },
    });
    const role2 = new Role('role2', {
      can: [],
      func(arg) { return !arg; },
    });
    const roleList = new RoleList([role1, role2]);
    const expected = { role1: true, role2: false };
    const res = await roleList.checkRoles(true);
    expect(res).to.deep.equal(expected);
  });
  it('should check each role (sync func with many args)', async () => {
    const role1 = new Role('role1', {
      can: [],
      func(arg1, arg2) { return arg1 || arg2; }, // true
    });
    const role2 = new Role('role2', {
      can: [],
      func(arg1, arg2) { return arg1 && arg2; }, // false
    });
    const roleList = new RoleList([role1, role2]);
    const expected = { role1: true, role2: false };
    const res = await roleList.checkRoles(true, false);
    expect(res).to.deep.equal(expected);
  });
  it('should check each role (async func with many args)', async () => {
    const role1 = new Role('role1', {
      can: [],
      func(arg1, arg2) { return Promise.resolve(arg1 || arg2); }, // true
    });
    const role2 = new Role('role2', {
      can: [],
      func(arg1, arg2) { return Promise.resolve(arg1 && arg2);}, // false
    });
    const roleList = new RoleList([role1, role2]);
    const expected = { role1: true, role2: false };
    const res = await roleList.checkRoles(true, false);
    expect(res).to.deep.equal(expected);
  });
  it('should check each role (async/await func)', async () => {
    const func = async () => (await Promise.resolve(true));

    const role1 = new Role('role1', {
      can: [],
      func: func,
    });
    const roleList = new RoleList([role1]);
    const expected = { role1: true };
    const res = await roleList.checkRoles();
    expect(res).to.deep.equal(expected);
  });
});
