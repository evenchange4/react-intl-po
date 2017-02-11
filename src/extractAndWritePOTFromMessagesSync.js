/* eslint-disable no-console */
import fs from 'fs';
import chalk from 'chalk';
import flowRight from 'lodash/flowRight';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';
import potHeader from './potHeader';

function extractAndWritePOTFromMessagesSync(srcPatterns,
  { messageKey = 'defaultMessage', output, headerOptions }) {
  let result = potHeader({
    potCreationDate: new Date(),
    charset: 'UTF-8',
    encoding: '8bit',
    ...headerOptions,
  });

  result += flowRight(
    potFormater,                // 2. return formated string
    readAllMessageAsObjectSync, // 1. return messages object
  )(srcPatterns, messageKey);

  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOTFromMessagesSync;
