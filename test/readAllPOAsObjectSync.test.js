import test from 'ava';
import readAllPOAsObjectSync from '../src/readAllPOAsObjectSync';

test('should return a function', t => {
  t.is(typeof readAllPOAsObjectSync, 'function');
});

test('should return po object with default localeMapper', t => {
  t.deepEqual(
    readAllPOAsObjectSync('./po/mcs-public.*.po'),
    {
      'zh-CN': { '': undefined, Creator: '建立者（簡中）', Version: '版本（簡中）' },
      'zh-TW': { '': undefined, Creator: '建立者', Version: '版本' },
    },
  );
});

test('should return po object with custom localeMapper', t => {
  t.deepEqual(
    readAllPOAsObjectSync(
      './po/*_project.po',
      filename => filename.split(/(\/|_)/g)[4],
    ),
    {
      'zh-CN': { '': undefined, '( default )': '（默认值）' },
      'zh-TW': { '': undefined, '( default )': '（默認值）' },
    },
  );
});
