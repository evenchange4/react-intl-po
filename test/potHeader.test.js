import potHeader from '../src/potHeader';

it('should return a function', () => {
  expect(typeof potHeader).toBe('function');
});

it('should return pot header, without any parameter', () => {
  expect(
    potHeader(),
  ).toMatchSnapshot();
});

it('should return pot header, without empty options', () => {
  expect(
    potHeader({}),
  ).toMatchSnapshot();
});

it('should return pot header, with a single comment', () => {
  expect(
    potHeader({
      comments: 'This is a single line comment',
    }),
  ).toMatchSnapshot();
});

it('should return pot header, with a single comment, with CR in it', () => {
  expect(
    potHeader({
      comments: 'This is a multi-line\ncomment\n',
    }),
  ).toMatchSnapshot();
});

it('should return pot header, with a list of comments', () => {
  expect(
    potHeader({
      comments: ['A', 'B', 'C'],
    }),
  ).toMatchSnapshot();
});


it('should return pot header, with all options', () => {
  expect(
    potHeader({
      comments: 'This is a single line comment',
      projectIdVersion: 'FUBAR',
      potCreationDate: new Date(Date.UTC(1995, 11, 17, 3, 24, 0)),
      charset: 'UTF-8',
      encoding: '8bit',
    }),
  ).toMatchSnapshot();
});
