/* eslint-disable no-console */
import fs from 'fs';
import chalk from 'chalk';
import flowRight from 'lodash/flowRight';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';
import potHeader from './potHeader';

const customKeyMapper = (message, messageKey, filename) => ({
  [message[messageKey]]: [{ ...message, filename }],
});

const customKeyMapperFactory = (messageKey = 'defaultMessage') =>
  (message, filename) => customKeyMapper(message, messageKey, filename);

function extractAndWritePOTFromMessagesSync(srcPatterns, { messageKey, output, headerOptions }) {
  const mapper = messageKey ? customKeyMapperFactory(messageKey) : undefined;

  let result = potHeader({
    potCreationDate: new Date(),
    charset: 'UTF-8',
    encoding: '8bit',
    ...headerOptions
  });

  result += flowRight(
    potFormater,                // 2. return formated string
    readAllMessageAsObjectSync, // 1. return messages object
  )(srcPatterns, mapper);

  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOTFromMessagesSync;
