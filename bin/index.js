#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import data from '../data.json' assert {type: "json"};


yargs(hideBin(process.argv))
  .command('info <namasurah>', 'mencari detail surah', () => {}, (argv) => {
    const surah = data.find(
      (surah) => surah.nama.toLowerCase() == argv.namasurah.toLowerCase()
    );

    if (!surah) {
      console.log(boxen(chalk.red('mohon maaf, surah tidak ditemukan'), {padding: 1}));
      return;
    }

    const result = boxen(`
    ${chalk.green('surah ditemukan')}!\n
    nama surah: ${chalk.green.bold(surah.nama)}
    jumlah ayat: ${chalk.green.bold(surah.ayat)}
    `, {padding: 1});
    console.log(result);
  })
  .demandCommand(1)
  .parse()

yargs(hideBin(process.argv))
  .command('daftar', 'meanmpilkan daftar surah', () => {}, (argv) => {
    console.log(chalk.bgGreen.black('=== daftar surah ==='));
    data.forEach((surah, i) => {
      console.log(chalk.bold(`${i+1}\t: ${chalk.green(surah.nama)}`));
    })
  })
  .demandCommand(1)
  .parse()
