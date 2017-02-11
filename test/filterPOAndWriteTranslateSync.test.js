import fs from 'fs';
import filterPOAndWriteTranslateSync from '../src/filterPOAndWriteTranslateSync';

it('should return a function', () => {
  expect(typeof filterPOAndWriteTranslateSync).toBe('function');
});

it('should output one merged file if a *json file* is set', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations.json';

  filterPOAndWriteTranslateSync('./test/po/mcs-public.*.po', { messagesPattern, output });
  expect(JSON.parse(fs.readFileSync(output, 'utf8'))).toMatchSnapshot();
});

it('should output one file per locale if a *directory* is set', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations';

  filterPOAndWriteTranslateSync('./test/po/mcs-public.*.po', { messagesPattern, output });
  expect(JSON.parse(fs.readFileSync(`${output}/zh-CN.json`, 'utf8'))).toMatchSnapshot();
  expect(JSON.parse(fs.readFileSync(`${output}/zh-TW.json`, 'utf8'))).toMatchSnapshot();
});
