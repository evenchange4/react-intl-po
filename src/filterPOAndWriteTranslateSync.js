/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import * as R from 'ramda';
import chalk from 'chalk';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import readAllPOAsObjectSync from './readAllPOAsObjectSync';

const isAJSONFile = string => /.json/.test(string);

const getContext = messageContext => message =>
  messageContext ? `${message[messageContext]}\u0004` : '';

const makeLangMapper = (pattern, index = 1) => filepath =>
  filepath.match(pattern)[index];

function filterPOAndWriteTranslateSync(
  srcPatterns,
  {
    messageKey = 'defaultMessage',
    messageContext = '',
    messagesPattern,
    langMapperPattern,
    langMapperPatternIndex,
    output,
    indentation,
    sortById,
  },
) {
  const sort = sortById ? R.sortBy(R.prop('id')) : R.identity;

  const placeholder = R.pipe(
    readAllMessageAsObjectSync,
    // 1. Object { messagekey: { messageContext: [[] , []] } }
    R.values,
    // 2. Array [{ messageContext: [[], []] }]
    R.map(R.values),
    // 3. Array [[], []]
    R.flatten,
    sort,
    // 4. Array []
    R.indexBy(R.prop('id')),
    // 5. Object { id: [] }
    R.mapObjIndexed(
      R.converge(R.concat, [
        getContext(messageContext),
        R.propOr('', messageKey),
      ]),
    ),
    // 6. Object { id: key }, key = (messageContext + messagekey)
  )(messagesPattern, messageKey, messageContext);

  const langMapperFn =
    langMapperPattern !== undefined
      ? makeLangMapper(langMapperPattern, langMapperPatternIndex)
      : undefined;

  const result = R.pipe(
    readAllPOAsObjectSync,
    // 1. Object { locale: { key: '' } }
    translation =>
      Object.keys(translation).map(locale => ({
        [locale]: R.mapObjIndexed(k => translation[locale][k] || '')(
          placeholder,
        ),
      })),
    // 2. Array [{ locale: { id: '' } }], replace key to translated string
    R.mergeAll,
    // 3. Object { locale: { id: '' } }
  )(srcPatterns, langMapperFn);

  // Output
  if (isAJSONFile(output)) {
    mkdirp.sync(path.dirname(output)); // ensure the output folder exists
    fs.writeFileSync(output, JSON.stringify(result, null, indentation));
    console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
  } else {
    mkdirp.sync(output); // ensure the output folder exists

    Object.keys(result).forEach(lang => {
      fs.writeFileSync(
        path.join(output, `${lang}.json`),
        JSON.stringify(result[lang], null, indentation),
      );
      console.log(
        chalk.green(
          `> [react-intl-po] write file -> ${path.join(
            output,
            `${lang}.json`,
          )} ✔️`,
        ),
      );
    });
  }
}

export default filterPOAndWriteTranslateSync;
