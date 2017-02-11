import readAllMessageAsObjectSync from '../src/readAllMessageAsObjectSync';

it('should return a function', () => {
  expect(typeof readAllMessageAsObjectSync).toBe('function');
});

it('should return messages object with default mapper', () => {
  expect(
    readAllMessageAsObjectSync('./test/messages/**/*.json'),
  ).toMatchSnapshot();
});

it('should return messages object with description as key', () => {
  expect(
    readAllMessageAsObjectSync(
      './test/messages/**/App.json',
      (message, filename) => ({ [message.description]: [{ ...message, filename }]}),
    ),
  ).toMatchSnapshot();
});
