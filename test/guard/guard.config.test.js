const { expect } = require('chai');
const Guard = require('../../lib/Guard');

describe('test guard config method', () => {
  it('should configure roles properly', () => {
    const guard = new Guard();
    guard.config({
      role1: {
        func() { return true; },
        features: ['feature1', 'feature2', 'feature3'],
      },
      role2: {
        func() { return false; },
        features: ['feature1', 'feature2'],
      },
    });
    const role1 = guard.roles.getRole('role1');
    expect(role1.name).to.equal('role1');
    expect(role1.func()).to.equal(true);
    expect(role1.features).to.deep.equal(['feature1', 'feature2', 'feature3']);
  });
});
