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
