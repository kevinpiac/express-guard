const { expect } = require('chai');
const guard = require('../lib');

describe('Roles', () => {
  it('should add a role', () => {
    const g = guard;
    const roleName = 'testRole';
    const features = ['feature1', 'features2', 'feature3'];
    const func = () => false;
    g.addRole(roleName, func, features);
    expect(g.roles.testRole).to.be.a('Object');
    expect(g.roles.testRole.name).to.equal(roleName);
    expect(g.roles.testRole.func).to.equal(func);
    expect(g.roles.testRole.features).to.equal(features);
  });

  it('should throw TypeError if roleName is not a string', () => {
    const g = guard;
    const func = () => true;
    const array = ['feature1'];

    expect(() => {
      g.addRole(1, func, array);
    }).to.throw(TypeError);

    expect(() => {
      g.addRole([], func, array);
    }).to.throw(TypeError);

    expect(() => {
      g.addRole(func, func, array);
    }).to.throw(TypeError);
  });
});
