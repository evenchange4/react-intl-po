import { sync as globSync } from 'glob';
import path from 'path';
import * as R from 'ramda';
import po2jsonHelper from './utils/po2jsonHelper';

export const DEFAULT_MAPPER = filepath =>
  path.basename(filepath).match(/([^.]*\.)*([^.]+)\.po$/)[2];

/**
 * Read translated .po file synchronized and
 * aggregates translated messages object
 * @param {String} srcPatterns - path to translated .po file
 * @return {Object} po - return aggregates object
 */

const readAllPOAsObjectSync = (srcPatterns, localeMapper = DEFAULT_MAPPER) =>
  R.pipe(
    globSync,
    // 1. Array [filename, ...]
    R.map(R.converge(R.objOf, [localeMapper, po2jsonHelper.parseFileSync])),
    // 2. Array [{ locale: json }, ...]
    R.mergeAll,
    // 3. Object { locale: json }
  )(srcPatterns);

export default readAllPOAsObjectSync;
