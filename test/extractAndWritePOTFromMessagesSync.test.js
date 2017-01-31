import fs from 'fs';
import test from 'ava';
import extractAndWritePOTFromMessagesSync
  from '../src/extractAndWritePOTFromMessagesSync';

test('should return a function', (t) => {
  t.is(typeof extractAndWritePOTFromMessagesSync, 'function');
});

test('should return messages object with default mapper', (t) => {
  const output = './temp/extract.pot';
  const headerOptions = { potCreationDate: new Date(Date.UTC(2017, 1, 1, 11, 23, 12)) };

  extractAndWritePOTFromMessagesSync('./messages/**/*.json', { output, headerOptions });

  t.is(
    fs.readFileSync(output, 'utf8'),
    'msgid ""\n' +
    'msgstr ""\n' +
    '"POT-Creation-Date: 2017-02-01T11:23:12.000Z\\n"\n' +
    '"Content-Type: text/plain; charset=UTF-8\\n"\n' +
    '"Content-Transfer-Encoding: 8bit\\n"\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n' +
    '\n' +
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.Creator] - Creator\n' +
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.Creator] - Creator\n' +
    'msgid "Creator"\n' +
    'msgstr ""\n\n' +
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.errorButton] - Click error Button\n' +
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.errorButton] - Click error Button\n' +
    'msgid "Go to MCS website"\n' +
    'msgstr ""\n\n' +
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.errorMessage] - The error message when api response as 404 not found\n' +
    'msgid "The device is now private or deleted."\n' +
    'msgstr ""\n',
  );
});

test('should return messages object with custom message key mapper', (t) => {
  const output = './temp/extract2.pot';
  const headerOptions = { potCreationDate: new Date(Date.UTC(2017, 1, 1, 11, 23, 12)) };

  extractAndWritePOTFromMessagesSync('./messages/**/*.json', { messageKey: 'id', output, headerOptions });
  t.is(
    fs.readFileSync(output, 'utf8'),
    'msgid ""\n' +
    'msgstr ""\n' +
    '"POT-Creation-Date: 2017-02-01T11:23:12.000Z\\n"\n' +
    '"Content-Type: text/plain; charset=UTF-8\\n"\n' +
    '"Content-Transfer-Encoding: 8bit\\n"\n' +
    '"MIME-Version: 1.0\\n"\n' +
    '"X-Generator: react-intl-po\\n"\n' +
    '\n' +
    '\n' +
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.Creator] - Creator\n' +
    'msgid "App.Creator"\n' +
    'msgstr ""\n\n' +
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.errorButton] - Click error Button\n' +
    'msgid "App.errorButton"\n' +
    'msgstr ""\n\n' +
    '#: ./messages/src/containers/App/App.json\n' +
    '#. [App.errorMessage] - The error message when api response as 404 not found\n' +
    'msgid "App.errorMessage"\n' +
    'msgstr ""\n\n' +
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.Creator] - Creator\n' +
    'msgid "NotFound.Creator"\n' +
    'msgstr ""\n\n' +
    '#: ./messages/src/containers/NotFound/messages.json\n' +
    '#. [NotFound.errorButton] - Click error Button\n' +
    'msgid "NotFound.errorButton"\n' +
    'msgstr ""\n',
  );
});
