import { sync as globSync } from 'glob';
import path from 'path';
import po2json from 'po2json';
import mapValues from 'lodash/mapValues';
import toObjectBy from 'to-object-by';

export const DEFAULT_MAPPER = filepath =>
  path.basename(filepath).match(/([^.]*\.)*([^.]+)\.po$/)[2];

/**
 * Read translated .po file synchronized and
 * aggregates translated messages object
 *
 * @param {String} srcPatterns - path to translated .po file
 * @return {Object} po - return aggregates object
 *
 * @author Michael Hsu
 */

function readAllPOAsObjectSync(srcPatterns, localeMapper = DEFAULT_MAPPER) {
  const filepaths = globSync(srcPatterns);

  return toObjectBy(filepaths, filepath => {
    const json = po2json.parseFileSync(filepath);
    const translated = mapValues(json, o => o[1]); // omit plural
    const locale = localeMapper(filepath); // parse locale name

    return {
      [locale]: translated,
    };
  });
}

export default readAllPOAsObjectSync;
