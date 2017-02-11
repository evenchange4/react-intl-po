import fs from 'fs';
import extractAndWritePOTFromMessagesSync from '../src/extractAndWritePOTFromMessagesSync';

it('should return a function', () => {
  expect(typeof extractAndWritePOTFromMessagesSync).toBe('function');
});

it('should return messages object with default mapper', () => {
  const output = './test/temp/extract.pot';
  const headerOptions = { potCreationDate: new Date(Date.UTC(2017, 1, 1, 11, 23, 12)) };

  extractAndWritePOTFromMessagesSync('./test/messages/**/*.json', { output, headerOptions });
  expect(fs.readFileSync(output, 'utf8')).toMatchSnapshot();
});

it('should return messages object with custom message key mapper', () => {
  const output = './test/temp/extract2.pot';
  const headerOptions = { potCreationDate: new Date(Date.UTC(2017, 1, 1, 11, 23, 12)) };

  extractAndWritePOTFromMessagesSync('./test/messages/**/*.json', { messageKey: 'id', output, headerOptions });
  expect(fs.readFileSync(output, 'utf8')).toMatchSnapshot();
});
