import potFormater from '../src/potFormater';

it('should return a function', () => {
  expect(typeof potFormater).toBe('function');
});

it('should return pot formatted string', () => {
  expect(
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
  ).toMatchSnapshot();
});

it('should return pot formatted string, with null or undefined description', () => {
  expect(
    potFormater({
      'Go to MCS website': [
        {
          id: 'NotFound.errorButton',
          defaultMessage: 'Go to MCS website',
          filename: './messages/src/containers/NotFound/messages.json',
        },
      ],
    }),
  ).toMatchSnapshot();
});

it('should return pot formatted string, with multi line values', () => {
  expect(
    potFormater({
      'NotFound.errorButton': [
        {
          id: 'NotFound.errorButton',
          description: 'My description\nis\nquite\nlong.',
          defaultMessage: 'This is\nmultiline',
          filename: './messages/src/containers/NotFound/messages.json',
        },
      ],
    }),
  ).toMatchSnapshot();
});

it('should return pot formatted string, with double quotes escaped', () => {
  expect(
    potFormater({
      'This is "quoted"': [
        {
          id: 'NotFound.errorButton',
          description: 'My description\nis\nquite\nlong.',
          defaultMessage: 'This is "quoted"',
          filename: './messages/src/containers/NotFound/messages.json',
        },
      ],
    }),
  ).toMatchSnapshot();
});
