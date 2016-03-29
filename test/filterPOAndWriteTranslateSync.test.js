import fs from 'fs';
import test from 'ava';
import filterPOAndWriteTranslateSync
  from '../src/filterPOAndWriteTranslateSync';

test('should return a function', t => {
  t.is(typeof filterPOAndWriteTranslateSync, 'function');
});

test('should return messages object with default mapper', t => {
  const messagesPattern = './messages/**/*.json';
  const output = './translations.json.temp';

  filterPOAndWriteTranslateSync('./po/mcs-public.*.po', { messagesPattern, output });
  t.same(
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
