/* eslint-disable no-console */
import fs from 'fs';
import chalk from 'chalk';
import flowRight from 'lodash/flowRight';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';

function extractAndWritePOTFromMessagesSync(srcPatterns, { output }) {
  const result = flowRight(
    potFormater,                // 2. return formated string
    readAllMessageAsObjectSync, // 1. return messages object
  )(srcPatterns);

  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [rip] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOTFromMessagesSync;
