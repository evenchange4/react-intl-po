import fs from 'fs';
import flowRight from 'lodash/flowRight';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';

function extractAndWritePOTFromMessagesSync(srcPatterns, { output }) {
  const result = flowRight(
    potFormater,                // 2. return formated string
    readAllMessageAsObjectSync, // 1. return messages object
  )(srcPatterns);

  fs.writeFileSync(output, result);
}

export default extractAndWritePOTFromMessagesSync;
