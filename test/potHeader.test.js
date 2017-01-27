import test from 'ava';
import potHeader from '../src/potHeader';

test('should return a function', (t) => {
  t.is(typeof potHeader, 'function');
});

test('should return pot header, without any parameter', (t) => {
  t.is(
    potHeader(),
    'msgid ""\n' +
    'msgstr ""\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n\n',
  );
});

test('should return pot header, without empty options', (t) => {
  t.is(
    potHeader({}),
    'msgid ""\n' +
    'msgstr ""\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n\n',
  );
});

test('should return pot header, with a single comment', (t) => {
  t.is(
    potHeader({
      comments: 'This is a single line comment'
    }),
    '# This is a single line comment\n' +
    'msgid ""\n' +
    'msgstr ""\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n\n',
  );
});

test('should return pot header, with a single comment, with CR in it', (t) => {
  t.is(
    potHeader({
      comments: 'This is a multi-line\ncomment\n'
    }),
    '# This is a multi-line\n' +
    '# comment\n' +
    '# \n' +
    'msgid ""\n' +
    'msgstr ""\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n\n',
  );
});

test('should return pot header, with a list of comments', (t) => {
  t.is(
    potHeader({
      comments: ['A', 'B', 'C']
    }),
    '# A\n' +
    '# B\n' +
    '# C\n' +
    'msgid ""\n' +
    'msgstr ""\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n\n',
  );
});


test('should return pot header, with all options', (t) => {
  t.is(
    potHeader({
      comments: 'This is a single line comment',
      projectIdVersion: 'FUBAR',
      potCreationDate: new Date(1995,11,17,3,24,0),
      charset: 'UTF-8',
      encoding: '8bit'
    }),
    '# This is a single line comment\n' +
    'msgid ""\n' +
    'msgstr ""\n' +
    '"Project-Id-Version: FUBAR\\n"\n' +
    '"POT-Creation-Date: 1995-12-17T02:24:00.000Z\\n"\n' +
    '"Content-Type: text/plain; charset=UTF-8\\n"\n' +
    '"Content-Transfer-Encoding: 8bit\\n"\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n\n',
  );
});
