import fs from 'fs';
import filterPOAndWriteTranslateSync from '../src/filterPOAndWriteTranslateSync';

it('should return a function', () => {
  expect(typeof filterPOAndWriteTranslateSync).toBe('function');
});

it('should output one merged file if a *json file* is set', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations-defaultMessage.json';

  filterPOAndWriteTranslateSync('./test/po/mcs-public.*.po', {
    messagesPattern,
    output,
  });
  expect(JSON.parse(fs.readFileSync(output, 'utf8'))).toMatchSnapshot();
});

it('should output one file per locale if a *directory* is set', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations';

  filterPOAndWriteTranslateSync('./test/po/mcs-public.*.po', {
    messagesPattern,
    output,
  });
  expect(
    JSON.parse(fs.readFileSync(`${output}/zh-CN.json`, 'utf8')),
  ).toMatchSnapshot();
  expect(
    JSON.parse(fs.readFileSync(`${output}/zh-TW.json`, 'utf8')),
  ).toMatchSnapshot();
});

it('should output one file per locale if a *directory* is set, using custom lang mapper regex', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations';
  const langMapperPattern = /.*\/(\w{1,3}_\w{1,3})\/.*/;
  const langMapperPatternIndex = 1;

  filterPOAndWriteTranslateSync('./test/alternate_po/**/messages.po', {
    messagesPattern,
    langMapperPattern,
    langMapperPatternIndex,
    output,
  });
  expect(
    JSON.parse(fs.readFileSync(`${output}/zh_CN.json`, 'utf8')),
  ).toMatchSnapshot();
  expect(
    JSON.parse(fs.readFileSync(`${output}/zh_TW.json`, 'utf8')),
  ).toMatchSnapshot();
});

it('should output correct filter merged file with id as messageKey', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations-id.json';

  filterPOAndWriteTranslateSync('./test/po/mcs-id.*.po', {
    messageKey: 'id',
    messagesPattern,
    output,
  });
  expect(JSON.parse(fs.readFileSync(output, 'utf8'))).toMatchSnapshot();
});

it('should output correct filter merged file with id as messageContext', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations-ctxt.json';

  filterPOAndWriteTranslateSync('./test/po/mcs-ctxt.*.po', {
    messageContext: 'id',
    messagesPattern,
    output,
  });
  expect(JSON.parse(fs.readFileSync(output, 'utf8'))).toMatchSnapshot();
});

it('should output json file with spaces if indentation number is used', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations-defaultMessage-indent4.json';
  const indentation = 4;

  filterPOAndWriteTranslateSync('./test/po/mcs-public.*.po', {
    messagesPattern,
    output,
    indentation,
  });
  expect(fs.readFileSync(output, 'utf8')).toMatchSnapshot();
});

it('should output json file with prefix char if indentation char is used', () => {
  const messagesPattern = './test/messages/**/*.json';
  const output = './test/temp/translations-defaultMessage-indentchar.json';
  const indentation = '\t\t';

  filterPOAndWriteTranslateSync('./test/po/mcs-public.*.po', {
    messagesPattern,
    output,
    indentation,
  });
  expect(fs.readFileSync(output, 'utf8')).toMatchSnapshot();
});
