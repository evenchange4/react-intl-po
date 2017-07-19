/* eslint-disable no-console */

import fs from 'fs';
import chalk from 'chalk';
import R from 'ramda';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';
import potHeader from './potHeader';

function extractAndWritePOTFromMessagesSync(
  srcPatterns,
  { messageKey = 'defaultMessage', messageContext = '', output, headerOptions },
) {
  const result = R.pipe(
    readAllMessageAsObjectSync,
    // 1. Object { messagekey: { messageContext: [[] , []] } }
    potFormater,
    // 2. String: pot formated
    R.concat(
      potHeader({
        potCreationDate: new Date(),
        charset: 'UTF-8',
        encoding: '8bit',
        ...headerOptions,
      }),
    ),
    // 3. String: with pot head
  )(srcPatterns, messageKey, messageContext);

  // Output
  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOTFromMessagesSync;
