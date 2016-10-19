/* eslint-disable no-console */
import fs from 'fs';
import chalk from 'chalk';
import flowRight from 'lodash/flowRight';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';

const CUSTOM_KEY_MAPPER = (message, messageKey, filename) => ({
  [message[messageKey]]: [{ ...message, filename }]
});

const defaultMapperFactory = (messageKey = 'defaultMessage') =>
  (message, filename) => CUSTOM_KEY_MAPPER(message, messageKey, filename);

function extractAndWritePOTFromMessagesSync(srcPatterns, { messageKey, output }) {
  const mapper = messageKey ? defaultMapperFactory(messageKey) : undefined;

  const result = flowRight(
    potFormater,                // 2. return formated string
    readAllMessageAsObjectSync, // 1. return messages object
  )(srcPatterns, mapper);

  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOTFromMessagesSync;
