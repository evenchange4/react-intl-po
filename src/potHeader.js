import * as R from 'ramda';

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

const potHeader = (options = {}) => {
  const o = R.evolve({
    comments: R.pipe(
      R.cond([[R.is(Array), R.identity], [R.is(String), R.of]]),
      R.map(R.split('\n')),
      R.flatten,
      R.map(e => `# ${e}`),
      R.join('\n'),
    ),
    projectIdVersion: e => `"Project-Id-Version: ${e}\\n"`,
    potCreationDate: e => `"POT-Creation-Date: ${e.toISOString()}\\n"`,
    charset: e => `"Content-Type: text/plain; charset=${e}\\n"`,
    encoding: e => `"Content-Transfer-Encoding: ${e}\\n"`,
  })(options);

  return `${o.comments}
msgid ""
msgstr ""
${o.projectIdVersion}
${o.potCreationDate}
${o.charset}
${o.encoding}
"MIME-Version: 1.0\\n"
"X-Generator: react-intl-po\\n"


`.replace(/undefined\r?\n|\r/g, '');
};

export default potHeader;
