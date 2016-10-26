import fs from 'fs';
import test from 'ava';
import filterPOAndWriteTranslateSync
  from '../src/filterPOAndWriteTranslateSync';

test('should return a function', (t) => {
  t.is(typeof filterPOAndWriteTranslateSync, 'function');
});

test('should output one merged file if a *json file* is set', (t) => {
  const messagesPattern = './messages/**/*.json';
  const output = './temp/translations.json';

  filterPOAndWriteTranslateSync('./po/mcs-public.*.po', { messagesPattern, output });
  t.deepEqual(
    JSON.parse(fs.readFileSync(output, 'utf8')),
    {
      'zh-CN': {
        'App.Creator': '建立者（簡中）',
        'NotFound.Creator': '建立者（簡中）',
      },
      'zh-TW': {
        'App.Creator': '建立者',
        'NotFound.Creator': '建立者',
      },
    },
  );
});

test('should output one file per locale if a *directory* is set', (t) => {
  const messagesPattern = './messages/**/*.json';
  const output = './temp/translations';

  filterPOAndWriteTranslateSync('./po/mcs-public.*.po', { messagesPattern, output });
  t.deepEqual(
    JSON.parse(fs.readFileSync(`${output}/zh-CN.json`, 'utf8')),
    {
      'App.Creator': '建立者（簡中）',
      'NotFound.Creator': '建立者（簡中）',
    }
  );

  t.deepEqual(
    JSON.parse(fs.readFileSync(`${output}/zh-TW.json`, 'utf8')),
    {
      'App.Creator': '建立者',
      'NotFound.Creator': '建立者',
    }
  );
});
