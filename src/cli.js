#!/usr/bin/env node

import program from 'commander';

program
  .command('json2pot <srcPatterns>')
  .option('-o, --output <path>', 'output path of .pot file')
  .action(require('./extractAndWritePOTFromMessagesSync'));

program
  .command('po2json <srcPatterns>')
  .option('-m, --messages-pattern <path>', 'path to extracted message .json files')
  .option('-o, --output <path>', 'output path of pot file')
  .action(require('./filterPOAndWriteTranslateSync'));

program.parse(process.argv);
