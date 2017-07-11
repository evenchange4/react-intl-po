import readAllMessageAsObjectSync from '../src/readAllMessageAsObjectSync';

it('should return a function', () => {
  expect(typeof readAllMessageAsObjectSync).toBe('function');
});

it('should return messages object with default messageKey', () => {
  expect(
    readAllMessageAsObjectSync('./test/messages/**/*.json'),
  ).toMatchSnapshot();
});

it('should return messages object with description as key', () => {
  expect(
    readAllMessageAsObjectSync(
      './test/messages/**/App.json',
      'description',
    ),
  ).toMatchSnapshot();
});

it('should return messages object with id as key', () => {
  expect(
    readAllMessageAsObjectSync(
      './test/messages/**/*.json',
      'id',
    ),
  ).toMatchSnapshot();
});

it('should return messages object with id as context', () => {
  expect(
    readAllMessageAsObjectSync(
      './test/messages/**/*.json',
      undefined,
      'id',
    ),
  ).toMatchSnapshot();
});
