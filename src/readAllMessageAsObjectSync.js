import fs from 'fs';
import { sync as globSync } from 'glob';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';

const concatCustomizer = (accValue, objectValue) => {
  if (!isArray(accValue)) return objectValue;

  return accValue.concat(objectValue);
};

const mergeCustomizer = (accValue, objectValue) =>
  mergeWith(accValue, objectValue, concatCustomizer);

// hint: Use defaultMessage as key by default
const indexBy = (messageKey, messageContext) => ({ messages, filename }) =>
  messages.reduce((acc, message) => ({
    ...acc,
    [message[messageKey]]: mergeWith(
      acc[message[messageKey]],
      { [messageContext ? message[messageContext] : '']: [{ ...message, filename }]},
      concatCustomizer,
    ),
  }), {});

/**
 * Read extracted .json file synchronized and
 * aggregates origin messages objects
 *
 * @param {String} srcPatterns - path to translated .json file
 * @param {String} messageKey - [defaultMessage]
 * @return {Object} messages - return aggregates object
 *
 * @author Michael Hsu
 */

function readAllMessageAsObjectSync(srcPatterns, messageKey = 'defaultMessage', messageContext = '') {
  return globSync(srcPatterns)
    // 1. read messages
    .map(filename => ({ filename, messages: JSON.parse(fs.readFileSync(filename, 'utf8')) }))
    // 2. convert message list to nested objects by messageKey and messageContext
    .map(indexBy(messageKey, messageContext))
    // 3. aggregate objects (merge and concat)
    .reduce((acc, object) => mergeWith(acc, object, mergeCustomizer), {});
}

export default readAllMessageAsObjectSync;
