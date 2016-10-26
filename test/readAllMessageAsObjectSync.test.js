import test from 'ava';
import readAllMessageAsObjectSync from '../src/readAllMessageAsObjectSync';

test('should return a function', (t) => {
  t.is(typeof readAllMessageAsObjectSync, 'function');
});

test('should return messages object with default mapper', (t) => {
  t.deepEqual(
    readAllMessageAsObjectSync('./messages/**/*.json'),
    {
      'The device is now private or deleted.': [
        {
          id: 'App.errorMessage',
          description: 'The error message when api response as 404 not found',
          defaultMessage: 'The device is now private or deleted.',
          filename: './messages/src/containers/App/App.json',
        },
      ],
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
      Creator: [
        {
          id: 'App.Creator',
          description: 'Creator',
          defaultMessage: 'Creator',
          filename: './messages/src/containers/App/App.json',
        },
        {
          id: 'NotFound.Creator',
          description: 'Creator',
          defaultMessage: 'Creator',
          filename: './messages/src/containers/NotFound/messages.json',
        },
      ],
    }
  );
});

test('should return messages object with description as key', (t) => {
  t.deepEqual(
    readAllMessageAsObjectSync(
      './messages/**/App.json',
      (message, filename) => ({ [message.description]: [{ ...message, filename }]})
    ),
    {
      'The error message when api response as 404 not found': [
        {
          id: 'App.errorMessage',
          description: 'The error message when api response as 404 not found',
          defaultMessage: 'The device is now private or deleted.',
          filename: './messages/src/containers/App/App.json',
        },
      ],
      'Click error Button': [
        {
          id: 'App.errorButton',
          description: 'Click error Button',
          defaultMessage: 'Go to MCS website',
          filename: './messages/src/containers/App/App.json',
        },
      ],
      Creator: [
        {
          id: 'App.Creator',
          description: 'Creator',
          defaultMessage: 'Creator',
          filename: './messages/src/containers/App/App.json',
        },
      ],
    }
  );
});
