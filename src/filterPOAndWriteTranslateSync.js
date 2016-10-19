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

const isAJSONFile = string => /.json/.test(string);

function filterPOAndWriteTranslateSync(srcPatterns, { messageKey = 'defaultMessage', messagesPattern, output }) {
  const translationTable = readAllPOAsObjectSync(srcPatterns);
  const messageList = flowRight(
    flatten,                    // 3. return flatten object values
    values,                     // 2. return object values
    readAllMessageAsObjectSync, // 1. return message object
  )(messagesPattern);

  const locales = Object.keys(translationTable);
  const result = toObjectBy(locales, locale => ({
    [locale]: toObjectBy(messageList, (message) => ({
      [message.id]: translationTable[locale][message[messageKey]],
    })),
  }));

  if (isAJSONFile(output)) {
    mkdirp.sync(path.dirname(output)); // ensure the output folder exists
    fs.writeFileSync(output, JSON.stringify(result, null, 0));
    console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
  } else {
    mkdirp.sync(output); // ensure the output folder exists

    Object.keys(result).map(lang => {
      fs.writeFileSync(path.join(output, `${lang}.json`), JSON.stringify(result[lang], null, 0));
      console.log(chalk.green(
        `> [react-intl-po] write file -> ${path.join(output, `${lang}.json`)} ✔️`));
      return null;
    });
  }
}

export default filterPOAndWriteTranslateSync;
