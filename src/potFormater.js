/**
 * Formatting POT comments
 * @param {Object[]}
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 */
const potCommentsFormater = (messageList) =>
  messageList.reduce((acc, { filename, id, description }) =>
    `${acc}#: ${filename}\n#. [${id}] - ${description}\n`
  , '');

/**
 * Formatting POT comments
 * @param {Object}
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 */

const potFormater = (messageObject) =>
  Object.keys(messageObject) // return array of id
    .sort()
    .map(id => `${potCommentsFormater(messageObject[id])}msgid "${id}"\nmsgstr ""\n`)
    .join('\n');

export default potFormater;
