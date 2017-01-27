/**
 * Create a POT header string
 * @param {Object} options
 * @param {String|String[]} [options.comments]
 * @param {Date} [options.potCreationDate] used for POT-Creation-Date
 * @param {String} [options.projectIdVersion] Project-Id-Version
 * @param {String} [options.charset]
 * @param {String} [options.encoding]
 * @return {String} potSource
 *
 * example: see tests
 *
 * @see https://www.gnu.org/software/trans-coord/manual/gnun/html_node/PO-Header.html
 * @author Guillaume Boddaert
 */

export const potHeader = (options = {}) => {
  let header = '';

  if (options.comments) {
    if (!Array.isArray(options.comments)) {
      options.comments = [options.comments];
    }
    const comments = options.comments.reduce((o, n) => o.concat(n.split('\n')), []);
    header += comments.map(comment => `# ${comment}`).join('\n') + '\n';
  }
  header += 'msgid ""\nmsgstr ""\n';

  if (options.projectIdVersion) {
    header += `"Project-Id-Version: ${options.projectIdVersion}\\n"\n`;
  }
  if (options.potCreationDate) {
    header += `"POT-Creation-Date: ${options.potCreationDate.toISOString()}\\n"\n`;
  }
  if (options.charset) {
    header += `"Content-Type: text/plain; charset=${options.charset}\\n"\n`;
  }
  if (options.encoding) {
    header += `"Content-Transfer-Encoding: ${options.encoding}\\n"\n`;
  }
  header += `"MIME-Version: 1.0\\n"\n`;
  header += `"X-Generator: react-intl-po\\n"\n`;
  header += '\n\n';
  return header;
};

export default potHeader
