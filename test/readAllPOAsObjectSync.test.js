import readAllPOAsObjectSync, {
  DEFAULT_MAPPER as defaultMapper,
} from '../src/readAllPOAsObjectSync';

it('should return a function', () => {
  expect(typeof readAllPOAsObjectSync).toBe('function');
});

it('should return locale when DEFAULT_MAPPER w/o prefix', () => {
  expect(defaultMapper('mcs-public.zh-CN.po')).toBe('zh-CN');
  expect(defaultMapper('mcs-public.zh-TW.po')).toBe('zh-TW');
  expect(defaultMapper('mcs-public.en.po')).toBe('en');

  expect(defaultMapper('./node_modules/mcs-translation/po/mcs-public.zh-cn.po')).toBe('zh-cn');
  expect(defaultMapper('./node_modules/mcs-translation/po/mcs-public.zh-tw.po')).toBe('zh-tw');
  expect(defaultMapper('./node_modules/mcs-translation/po/mcs-public.en.po')).toBe('en');

  expect(defaultMapper('./node_modules/mcs-translation/po/zh-CN.po')).toBe('zh-CN');
  expect(defaultMapper('./node_modules/mcs-translation/po/zh-TW.po')).toBe('zh-TW');
  expect(defaultMapper('./node_modules/mcs-translation/po/en.po')).toBe('en');

  expect(defaultMapper('zh-CN.po')).toBe('zh-CN');
  expect(defaultMapper('zh-TW.po')).toBe('zh-TW');
  expect(defaultMapper('en.po')).toBe('en');
});

it('should return po object with default localeMapper', () => {
  expect(
    readAllPOAsObjectSync('./test/po/mcs-public.*.po'),
  ).toMatchSnapshot();
});

it('should return po object with custom localeMapper', () => {
  expect(
    readAllPOAsObjectSync(
      './test/po/*_project.po',
      filename => filename.split(/(\/|_)/g)[4],
    ),
  ).toMatchSnapshot();
});
