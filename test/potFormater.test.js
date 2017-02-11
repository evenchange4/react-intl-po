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
