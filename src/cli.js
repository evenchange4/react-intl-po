#!/usr/bin/env node

import program from 'commander';

const numberOrChars = s => (/^\d+$/.test(s) ? parseInt(s, 10) : s);

program
  .command('json2pot <srcPatterns>')
  .option(
    '-o, --output <path>',
    'The output pathname of `.pot` file to be translated',
  )
  .option(
    '-k, --message-key [key]',
    'Translation message key (default key is `defaultMessage`)',
  )
  .option(
    '-c, --message-context [context]',
    'Translation message context (defaults to no context)',
  )
  .action(require('./extractAndWritePOTFromMessagesSync'));

program
  .command('po2json <srcPatterns>')
  .option(
    '-m, --messages-pattern <path>',
    'The pattern of *json* files extracted from *babel-plugin-react-intl*',
  )
  .option('-o, --output <path>', 'The output pathname of a file / directory')
  .option(
    '-k, --message-key [key]',
    'Translation message key (default key is `defaultMessage`)',
  )
  .option(
    '-c, --message-context [context]',
    'Translation message context (defaults to no context)',
  )
  .option(
    '-l, --lang-mapper-pattern <pattern>',
    'Custom regex to use for lang mapping.',
  )
  .option(
    '-i, --lang-mapper-pattern-index [index]',
    'When specifying a custom lang-mapper-pattern, the index of match to use for the lang mapping. Default is 1, index is ignored if not using a custom lang mapping regex',
  )
  .option(
    '--indentation <number|characters>',
    'Number of spaces or characters to use for indenting (adding space) to the output json entries.',
    numberOrChars,
  )
  .action(require('./filterPOAndWriteTranslateSync'));

program.parse(process.argv);
