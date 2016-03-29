import { sync as globSync } from 'glob';
import po2json from 'po2json';
import mapValues from 'lodash/mapValues';
import toObjectBy from 'to-object-by';

const DEFAULT_MAPPER = (filename) =>
  filename.match(/[^.]\.(.*)\.po$/)[1];

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
  const filenames = globSync(srcPatterns);

  return toObjectBy(filenames, filename => {
    const json = po2json.parseFileSync(filename);
    const translated = mapValues(json, o => o[1]); // omit plural
    const locale = localeMapper(filename);         // parse locale name

    return {
      [locale]: translated,
    };
  });
}

export default readAllPOAsObjectSync;
