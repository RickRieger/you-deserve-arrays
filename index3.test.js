// Extra test added during the 2026 cleanup (not part of the original assignment).
// The original tests use arrays of 5 items and of fewer than 4, but never exactly
// 4, which is the smallest array that HAS an index 3. The old code checked
// `length > 4` and `length < 4`, so a 4-item array matched neither and got undefined.
const { getIndex3 } = require('./main.js');

describe('getIndex3 (exactly 4 items)', () => {
  it('returns index 3 when the array has exactly 4 items', () => {
    expect(getIndex3(['a', 'b', 'c', 'd'])).toBe('d');
    expect(getIndex3([10, 20, 30, 40])).toBe(40);
  });
});
