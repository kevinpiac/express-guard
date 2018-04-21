const { expect } = require('chai');
const errors = require('../../lib/errors');
const RoleList = require('../../lib/RoleList');

describe('test roleList constructor', () => {
  it('should return a RoleList instance', () => {
    const roleList = new RoleList();
    expect(roleList).to.be.an.instanceof(RoleList);
  });
  it('should init RoleList with default values', () => {
    const roleList = new RoleList();
    expect(roleList.$roles).to.deep.equal({});
  });  
});
