import test from 'ava';
import potFormater from '../src/potFormater';

test('should return a function', (t) => {
  t.is(typeof potFormater, 'function');
});

test('should return pot formatted string', (t) => {
  t.is(
    potFormater({
      'Go to MCS website': [
        {
          id: 'App.errorButton',
          description: 'Click error Button',
          defaultMessage: 'Go to MCS website',
          filename: './messages/src/containers/App/App.json',
        },
        {
          id: 'NotFound.errorButton',
          description: 'Click error Button',
          defaultMessage: 'Go to MCS website',
          filename: './messages/src/containers/NotFound/messages.json',
        },
      ],
    }),
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.errorButton] - Click error Button\n' +
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.errorButton] - Click error Button\n' +
    'msgid "Go to MCS website"\n' +
    'msgstr ""\n',
  );
});

test('should return pot formatted string, with explicit mapping specified and not defaultMessage', (t) => {
  t.is(
    potFormater({
      'NotFound.errorButton': [
        {
          id: 'NotFound.errorButton',
          description: 'Click error Button',
          defaultMessage: 'Go to MCS website',
          filename: './messages/src/containers/NotFound/messages.json',
          mappedBy: 'id',
        },
      ],
    }),
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.errorButton] - Click error Button\n' +
    '#. defaultMessage is:\n' +
    '#. Go to MCS website\n' +
    'msgid "NotFound.errorButton"\n' +
    'msgstr ""\n',
  );
});

test('should return pot formatted string, with null or undefined description', (t) => {
  t.is(
    potFormater({
      'Go to MCS website': [
        {
          id: 'NotFound.errorButton',
          defaultMessage: 'Go to MCS website',
          filename: './messages/src/containers/NotFound/messages.json',
          mappedBy: 'defaultMessage',
        },
      ],
    }),
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.errorButton]\n' +
    'msgid "Go to MCS website"\n' +
    'msgstr ""\n',
  );
});


test('should return pot formatted string, with multi line values', (t) => {
  t.is(
    potFormater({
      'NotFound.errorButton': [
        {
          id: 'NotFound.errorButton',
          description: 'My description\nis\nquite\nlong.',
          defaultMessage: 'This is\nmultiline',
          filename: './messages/src/containers/NotFound/messages.json',
          mappedBy: 'id',
        },
      ],
    }),
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.errorButton] - My description\n' +
    '#. is\n' +
    '#. quite\n' +
    '#. long.\n' +
    '#. defaultMessage is:\n' +
    '#. This is\n' +
    '#. multiline\n' +
    'msgid "NotFound.errorButton"\n' +
    'msgstr ""\n',
  );
});
