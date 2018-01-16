import fs from 'fs';
import { sync as globSync } from 'glob';
import * as R from 'ramda';

/**
 * Read extracted .json file synchronized and
 * aggregates origin messages objects
 *
 * @param {String} srcPatterns - path to translated .json file
 * @param {String} messageKey - [defaultMessage]
 * @param {String} messageContext - [''] empty string
 * @return {Object} messages - return aggregates object
 *
 * @author Michael Hsu
 */

const readAllMessageAsObjectSync = (
  srcPatterns,
  messageKey = 'defaultMessage',
  messageContext = '',
) =>
  R.pipe(
    globSync,
    // 1. Array [filename, ...]
    R.map(filename =>
      JSON.parse(fs.readFileSync(filename, 'utf8')).map(e => ({
        ...e,
        filename,
      })),
    ),
    R.flatten,
    // 2. Array [{ ...messages, filename  }, ... ]
    R.groupBy(R.prop(messageKey)),
    // 3. Object { messageKey: { }, ... }
    R.mapObjIndexed(R.groupBy(R.propOr(messageContext, messageContext))),
    // 4. Object { messagekey: { messageContext: { } } }
    // 4. groupBy context (nested for -c argument)
  )(srcPatterns);

export default readAllMessageAsObjectSync;
