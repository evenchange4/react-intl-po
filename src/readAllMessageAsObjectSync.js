import fs from 'fs';
import { sync as globSync } from 'glob';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import toObjectBy from 'to-object-by';

// hint: Use defaultMessage as key by default
const DEFAULT_MAPPER = (message, filename) => ({
  [message.defaultMessage]: [{ ...message, filename, mappedBy: 'defaultMessage' }],
});

/**
 * Read extracted .json file synchronized and
 * aggregates origin messages objects
 *
 * @param {String} srcPatterns - path to translated .json file
 * @return {Object} messages - return aggregates object
 *
 * @author Michael Hsu
 */

function readAllMessageAsObjectSync(srcPatterns, messageMapper = DEFAULT_MAPPER) {
  return globSync(srcPatterns)
    // 1. read messages
    .map(filename => ({ filename, messages: JSON.parse(fs.readFileSync(filename, 'utf8')) }))
    // 2. convert message list to object by defaultMessage
    .map(({ filename, messages }) => toObjectBy(messages, e => messageMapper(e, filename)))
    // 3. aggregate objects (merge and concat)
    .reduce((acc, object) => mergeWith(acc, object, (accValue, objectValue) => {
      if (!isArray(accValue)) return objectValue;

      return accValue.concat(objectValue);
    }), {});
}

export default readAllMessageAsObjectSync;
