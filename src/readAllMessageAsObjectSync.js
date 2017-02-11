import fs from 'fs';
import { sync as globSync } from 'glob';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';

const customizer = (accValue, objectValue) => {
  if (!isArray(accValue)) return objectValue;

  return accValue.concat(objectValue);
};

// hint: Use defaultMessage as key by default
const indexBy = messageKey => ({ messages, filename }) =>
  messages.reduce((acc, message) => ({
    ...acc,
    [message[messageKey]]: acc[message[messageKey]]
      ? acc[message[messageKey]].concat([{ ...message, filename }])
      : [{ ...message, filename }],
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

function readAllMessageAsObjectSync(srcPatterns, messageKey = 'defaultMessage') {
  return globSync(srcPatterns)
    // 1. read messages
    .map(filename => ({ filename, messages: JSON.parse(fs.readFileSync(filename, 'utf8')) }))
    // 2. convert message list to object by messageKey
    .map(indexBy(messageKey))
    // 3. aggregate objects (merge and concat)
    .reduce((acc, object) => mergeWith(acc, object, customizer), {});
}

export default readAllMessageAsObjectSync;
