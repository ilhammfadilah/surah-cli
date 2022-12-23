import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import data from '../data.json' assert {type: "json"};
import fs from 'fs';

const data = fs.readFileSync('./data.json');

export function command() {
  yargs(hideBin(process.argv))
  .command(
    'daftar',
    'menampilkan daftar suarah',
    () => {},
    argv => {
      console.log(boxen(chalk.white('Daftar Surah'), {padding: 1}));
      data.forEach((surah, i) => {
      console.log(chalk.bold(`${i+1}\t: ${chalk.green(surah.nama)}`));
    })
    }
  )
  .command(
    'info <namasurah>',
    'menampilkan informasi surah',
    () => {},
    argv => {
      const surah = data.find(
        (surah) => surah.nama.toLowerCase() == argv.namasurah.toLowerCase()
      );

      if (!surah) {
        console.log(boxen(chalk.red('mohon maaf, surah tidak ditemukan'), {padding: 1}));
        return;
      }

      const result = boxen(`${chalk.green('surah ditemukan')}!\nnama surah: ${chalk.green.bold(surah.nama)}\njumlah ayat: ${chalk.green.bold(surah.ayat)} `, {padding: 1});
      console.log(result);
    }
  )
  .command('cari nomorsurah:ayat',
    'menampilkan terjemahan surah',
    (yargs) => yargs
      .positional('nomorsurah', {
        describe: 'nomor surah',
        type: 'number'
      })
      .positional('ayat', {
          describe: 'ayat surah',
          type: 'number'
      }),
    argv => {
      const arg = argv['nomorsurah:ayat'];
      const arrArg = arg.split(':', 2);
      // console.log(arrArg);
      // const { nomorsurah, ayat } = argv;
      const rawSurah = fs.readFileSync('./data/'+arrArg[0]+'.json');
      const jsonSurah = JSON.parse(rawSurah)
      console.log('Terjemah dari '+jsonSurah[arrArg[0]]["name_latin"]+' ayat ke '+arrArg[1]);
      const result = jsonSurah[arrArg[0]]["translations"]["id"]["text"][arrArg[1]];
      console.log(boxen(chalk.green(result), {padding: 1}));
    })
  // .usage('Usage: $0 -a <arg1> -b <arg2>')
  // .option('a', {
  //   alias: 'arg1',
  //   describe: 'Argument 1',
  //   type: 'string',
  // })
  // .option('b', {
  //   alias: 'arg2',
  //   describe: 'Argument 2',
  //   type: 'string',
  // })
  .argv
}

// export function daftarSurah() {
// yargs(hideBin(process.argv))
//   .command('daftar', 'meanmpilkan daftar surah', () => {}, (argv) => {
//     console.log(chalk.bgGreen.black('=== daftar surah ==='));
//     data.forEach((surah, i) => {
//       console.log(chalk.bold(`${i+1}\t: ${chalk.green(surah.nama)}`));
//     })
//   })
//   .demandCommand(1)
//   .help()
//   .parse()
// }

// export function infoSurah() {
//   yargs(hideBin(process.argv))
//   .command('info <namasurah>', 'mencari detail surah', (yargs, helpOrVersionSet) => {
//     return yargs.option('url', {
//       alias: 'u',
//       default: 'https://yargs.js.org'
//     })
//   }, (argv) => {
//   })
//   .demandCommand(1)
//   .help()
//   .parse()
// }
