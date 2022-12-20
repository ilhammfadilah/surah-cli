import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import data from '../data.json' assert {type: "json"};

export function command() {
  yargs(hideBin(process.argv))
  .command(
    'daftar',
    'menampilkan daftar suarah',
    () => {},
    argv => {
      console.log(chalk.bgGreen.black('=== daftar surah ==='));
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

      const result = boxen(`${chalk.green('surah ditemukan')}!\nnama surah: ${chalk.green.bold(surah.nama)}\njumlah ayat: ${chalk.green.bold(surah.ayat)}
      `, {padding: 1});
      console.log(result);
    }
  )
  .command(
    'delete',
    'delete item',
    () => {},
    argv => {
      console.log(argv);
    }
  )
  .command(
    'a <namasurah>:<ayat>',
    'mencari surah',
    () => {},
    argv => {
      console.log(argv);
    }
  )
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
