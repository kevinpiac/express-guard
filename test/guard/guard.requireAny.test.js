const { expect } = require('chai');
const Guard = require('../../lib/Guard');
const Role = require('../../lib/Role');

describe('test guard middleware requireAny', () => {
  const request = {};
  const response = {};
  const next = arg => arg;
  let guard = null;
  beforeEach(() => {
    guard = new Guard();
    const anyone = new Role('anyone', {
      can: ['feature1', 'feature2'],
      func() {
        return true;
      },
    });
    const everybody = new Role('everybody', {
      can: ['feature3', 'feature4'],
      func() {
        return Promise.resolve(true);
      },
    });
    const nobody = new Role('nobody', {
      can: ['nothing', 'nobodyCanDoThat'],
      func() {
        return false;
      },
    });
    const nevertrue = new Role('nevertrue', {
      can: ['nope'],
      func() {
        return Promise.resolve(false);
      },
    });
    guard.roles.addRole(anyone);
    guard.roles.addRole(everybody);
    guard.roles.addRole(nobody);
    guard.roles.addRole(nevertrue);
  });

  it('should call next without arg (one feature)', async () => {
    const middleware = guard.requireAny('feature1');
    const res = await middleware(request, response, next);
    expect(res).to.be.undefined;
  });

  it('should call next without arg (two features)', async () => {
    const middleware = guard.requireAny('feature1', 'nobodyCanDoThat');
    const res = await middleware(request, response, next);
    expect(res).to.be.undefined;
  });

  it('should call next without arg (async role involved)', async () => {
    const middleware = guard.requireAny('nobodyCanDoThat', 'feature3');
    const res = await middleware(request, response, next);
    expect(res).to.be.undefined;
  });

  it('should call next with Error FORBIDDEN (one feature)', async () => {
    const middleware = guard.requireAny('nobodyCanDoThat');
    const res = await middleware(request, response, next);
    expect(res).to.be.an('Error');
    expect(res.message).to.equal(Guard.errors.FORBIDDEN);
  });

  it('should call next with Error FORBIDDEN (two features)', async () => {
    const middleware = guard.requireAny('nobodyCanDoThat', 'nothing');
    const res = await middleware(request, response, next);
    expect(res).to.be.an('Error');
    expect(res.message).to.equal(Guard.errors.FORBIDDEN);
  });

  it('should call next with Error FORBIDDEN (async role involved)', async () => {
    const middleware = guard.requireAny('nope');
    const res = await middleware(request, response, next);
    expect(res).to.be.an('Error');
    expect(res.message).to.equal(Guard.errors.FORBIDDEN);
  });

});
