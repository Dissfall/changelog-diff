import test from 'ava';
import changelogDiff from '../src';

test('File read', async (t) => {
  const result = await changelogDiff(
    './test/CHANGELOG-A.md',
    './test/CHANGELOG-B.md'
  );
  const expected =
    `New in 1.2.4\n` +
    `\n` +
    `Features\n` +
    `* feature C ([7a491a9](http://bitbucket.org/whitesharx/starfall-wx-v3/commit/7a491a9c12c9e09fdc67ea0454e0621ba6b9e8e7))\n` +
    `* feature B ([7a491a9](http://bitbucket.org/whitesharx/starfall-wx-v3/commit/7a491a9c12c9e09fdc67ea0454e0621ba6b9e8e7))\n` +
    `\n` +
    `Bug Fixes\n` +
    `* fix C ([7a491a9](http://bitbucket.org/whitesharx/starfall-wx-v3/commit/7a491a9c12c9e09fdc67ea0454e0621ba6b9e8e7))\n` +
    `* fix B ([7a491a9](http://bitbucket.org/whitesharx/starfall-wx-v3/commit/7a491a9c12c9e09fdc67ea0454e0621ba6b9e8e7))\n`;
  t.is(result, expected);
});
