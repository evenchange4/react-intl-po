/**
 * Ensure that multi-line strings are properly commented out
 *
 * For instance:
 * This is\nmy multi-line\ncomment
 *
 * should be escaped as :
 * #. This is
 * #. my multi-line
 * #. comment
 *
 * @param {String} commentPrefix
 * @param {String} rawComment
 * @returns {String}
 *
 * @author Guillaume Boddaert
 */
const potCommentMultiLineWrapper = (commentPrefix, rawComment) => {
  const comments = rawComment.split('\n');
  return comments.reduce((a, b) => `${a}${commentPrefix} ${b}\n`, '');
};


/**
 * Formatting POT comments
 * @param {Object[]} messageList
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 * @author Guillaume Boddaert
 */
const potCommentsFormater = messageList =>
  messageList.reduce((acc, { filename, id, description, defaultMessage }) => {
    let out = acc;
    out += potCommentMultiLineWrapper('#:', filename);
    if (description) {
      out += potCommentMultiLineWrapper('#.', `[${id}] - ${description}`);
    } else {
      out += potCommentMultiLineWrapper('#.', `[${id}]`);
    }
    out += potCommentMultiLineWrapper('#.', `defaultMessage is:\n${defaultMessage}`);

    return out;
  }, '');

/**
 * Formatting POT comments
 * @param {Object} messageObject
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 */

const potFormater = messageObject =>
  Object.keys(messageObject) // return array of id
    .sort()
    .map(id => `${potCommentsFormater(messageObject[id])}msgid ${JSON.stringify(id)}\nmsgstr ""\n`)
    .join('\n');

export default potFormater;
