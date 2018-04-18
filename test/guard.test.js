const { expect } = require('chai');
const { helloWorld } = require('../lib/guard');

describe('Introducing tests', () => {
  it('should return Hello World', () => {
    expect(helloWorld()).to.equal('Hello world');
  });
});
