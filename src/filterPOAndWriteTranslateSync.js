/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import flowRight from 'lodash/flowRight';
import toObjectBy from 'to-object-by';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import readAllPOAsObjectSync from './readAllPOAsObjectSync';

function filterPOAndWriteTranslateSync(srcPatterns, { messagesPattern, output }) {
  const translationTable = readAllPOAsObjectSync(srcPatterns);
  const messageList = flowRight(
    flatten,                    // 3. return flatten object values
    values,                     // 2. return object values
    readAllMessageAsObjectSync, // 1. return message object
  )(messagesPattern);

  const locales = Object.keys(translationTable);
  const result = toObjectBy(locales, locale => ({
    [locale]: toObjectBy(messageList, ({ id, defaultMessage }) => ({
      [id]: translationTable[locale][defaultMessage],
    })),
  }));

  mkdirp(path.dirname(output)); // ensure the output folder exists

  if(fs.lstatSync(output).isDirectory()) //if 'output' is a directory generate one file for each input file.
    for(let lang of Object.keys(result))
      fs.writeFileSync(path.join(output, `${lang}.json`), JSON.stringify(result[lang], null, 0));
  else //else write full result in 'output'
    fs.writeFileSync(output, JSON.stringify(result, null, 0));
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default filterPOAndWriteTranslateSync;
