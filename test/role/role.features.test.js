const { expect } = require('chai');
const Role = require('../../lib/Role');

describe('test role features', () => {
  it('should have a features getter/setter', () => {
    const expected = ['feature1', 'feature2'];
    const role = new Role('testRole');
    role.features = expected;
    expect(role.features).to.deep.equal(expected);
  });
  it('should throw TypeError ROLE_FEATURES_TYPE_ERROR', () => {
    const role = new Role('testRole');
    expect(() => {
      role.features = 1111;
    }).to.throw(TypeError, Role.errors.ROLE_FEATURES_TYPE_ERROR);
    expect(() => {
      role.features = () => true;
    }).to.throw(TypeError, Role.errors.ROLE_FEATURES_TYPE_ERROR);
    expect(() => {
      role.features = {};
    }).to.throw(TypeError, Role.errors.ROLE_FEATURES_TYPE_ERROR);
  });
});
