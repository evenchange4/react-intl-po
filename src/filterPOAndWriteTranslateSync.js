/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import values from 'lodash/values';
import flattenDeep from 'lodash/flattenDeep';
import flowRight from 'lodash/flowRight';
import toObjectBy from 'to-object-by';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import readAllPOAsObjectSync from './readAllPOAsObjectSync';

const isAJSONFile = string => /.json/.test(string);

const getTranslationTableContext = (messageContext, message) =>
  (messageContext ? `${message[messageContext]}\u0004` : '');

function filterPOAndWriteTranslateSync(srcPatterns,
  { messageKey = 'defaultMessage', messageContext = '', messagesPattern, output }) {
  const translationTable = readAllPOAsObjectSync(srcPatterns);
  const messageList = flowRight(
    flattenDeep,                             // 4. return flattened values
    objects => objects.map(o => values(o)),  // 3. return values
    values,                                  // 2. return context objects
    readAllMessageAsObjectSync,              // 1. return message object
  )(messagesPattern, messageKey, messageContext);

  const locales = Object.keys(translationTable);
  const result = toObjectBy(locales, locale => ({
    [locale]: toObjectBy(messageList, message => ({
      [message.id]: translationTable[locale][`${getTranslationTableContext(messageContext, message)}${message[messageKey]}`],
    })),
  }));

  if (isAJSONFile(output)) {
    mkdirp.sync(path.dirname(output)); // ensure the output folder exists
    fs.writeFileSync(output, JSON.stringify(result, null, 0));
    console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
  } else {
    mkdirp.sync(output); // ensure the output folder exists

    Object.keys(result).map((lang) => {
      fs.writeFileSync(path.join(output, `${lang}.json`), JSON.stringify(result[lang], null, 0));
      console.log(chalk.green(
        `> [react-intl-po] write file -> ${path.join(output, `${lang}.json`)} ✔️`));
      return null;
    });
  }
}

export default filterPOAndWriteTranslateSync;
