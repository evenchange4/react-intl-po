import test from 'ava';
import {
  default as readAllPOAsObjectSync,
  DEFAULT_MAPPER as defaultMapper,
} from '../src/readAllPOAsObjectSync';

test('should return a function', (t) => {
  t.is(typeof readAllPOAsObjectSync, 'function');
});

test('should return locale when DEFAULT_MAPPER w/o prefix', (t) => {
  t.is(defaultMapper('mcs-public.zh-CN.po'), 'zh-CN');
  t.is(defaultMapper('mcs-public.zh-TW.po'), 'zh-TW');
  t.is(defaultMapper('mcs-public.en.po'), 'en');

  t.is(defaultMapper('./node_modules/mcs-translation/po/mcs-public.zh-cn.po'), 'zh-cn');
  t.is(defaultMapper('./node_modules/mcs-translation/po/mcs-public.zh-tw.po'), 'zh-tw');
  t.is(defaultMapper('./node_modules/mcs-translation/po/mcs-public.en.po'), 'en');

  t.is(defaultMapper('./node_modules/mcs-translation/po/zh-CN.po'), 'zh-CN');
  t.is(defaultMapper('./node_modules/mcs-translation/po/zh-TW.po'), 'zh-TW');
  t.is(defaultMapper('./node_modules/mcs-translation/po/en.po'), 'en');

  t.is(defaultMapper('zh-CN.po'), 'zh-CN');
  t.is(defaultMapper('zh-TW.po'), 'zh-TW');
  t.is(defaultMapper('en.po'), 'en');
});

test('should return po object with default localeMapper', (t) => {
  t.deepEqual(
    readAllPOAsObjectSync('./po/mcs-public.*.po'),
    {
      'zh-CN': { '': undefined, Creator: '建立者（簡中）', Version: '版本（簡中）' },
      'zh-TW': { '': undefined, Creator: '建立者', Version: '版本' },
    },
  );
});

test('should return po object with custom localeMapper', (t) => {
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
