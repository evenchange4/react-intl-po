#!/usr/bin/env node

import program from 'commander';

program
  .command('json2pot <srcPatterns>')
  .option('-o, --output <path>', 'The output pathname of `.pot` file to be translated')
  .action(require('./extractAndWritePOTFromMessagesSync'));

program
  .command('po2json <srcPatterns>')
  .option(
    '-m, --messages-pattern <path>',
    'The pattern of *json* files extracted from *babel-plugin-react-intl*',
  )
  .option('-o, --output <path>', 'The output pathname of a file / directory')
  .action(require('./filterPOAndWriteTranslateSync'));

program.parse(process.argv);
