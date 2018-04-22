const { expect } = require('chai');
const { hasDuplicate } = require('../../lib/common');

describe('test common hasDuplicate func', () => {
  it('should return true', () => {
    expect(hasDuplicate(['one', 'one'])).to.equal(true);
    expect(hasDuplicate(['one', 'two', 'one'])).to.equal(true);
    expect(hasDuplicate(['one', 'one', 'one'])).to.equal(true);
    expect(hasDuplicate(['one', 'two', 'two', 'one'])).to.equal(true);
  });
  it('should return false', () => {
    expect(hasDuplicate(['one', 'two'])).to.equal(false);
    expect(hasDuplicate(['1', '2', '3', '4', '5'])).to.equal(false);
    expect(hasDuplicate(['1', '2', '3', '4', '5'])).to.equal(false);
    expect(hasDuplicate(['1', '2', '3', '4', '5'])).to.equal(false);
    expect(hasDuplicate(['1', '2', '3', '4', '5'])).to.equal(false);
  });
});
