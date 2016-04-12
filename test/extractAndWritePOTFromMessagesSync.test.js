import fs from 'fs';
import test from 'ava';
import extractAndWritePOTFromMessagesSync
  from '../src/extractAndWritePOTFromMessagesSync';

test('should return a function', t => {
  t.is(typeof extractAndWritePOTFromMessagesSync, 'function');
});

test('should return messages object with default mapper', t => {
  const output = './extract.pot.temp';

  extractAndWritePOTFromMessagesSync('./messages/**/*.json', { output });
  t.is(
    fs.readFileSync(output, 'utf8'),
    '#: ./messages/src/containers/App/App.json' + '\n' +
    '#. [App.Creator] - Creator' + '\n' +
    '#: ./messages/src/containers/NotFound/messages.json' + '\n' +
    '#. [NotFound.Creator] - Creator' + '\n' +
    'msgid "Creator"' + '\n' +
    'msgstr ""' + '\n\n' +
    '#: ./messages/src/containers/App/App.json' + '\n' +
    '#. [App.errorButton] - Click error Button' + '\n' +
    '#: ./messages/src/containers/NotFound/messages.json' + '\n' +
    '#. [NotFound.errorButton] - Click error Button' + '\n' +
    'msgid "Go to MCS website"' + '\n' +
    'msgstr ""' + '\n\n' +
    '#: ./messages/src/containers/App/App.json' + '\n' +
    '#. [App.errorMessage] - The error message when api response as 404 not found' + '\n' +
    'msgid "The device is now private or deleted."' + '\n' +
    'msgstr ""' + '\n',
  );
});
