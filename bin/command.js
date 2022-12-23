import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import data from '../data.json' assert {type: "json"};
import fs from 'fs';

const dataBuff = fs.readFileSync('./data.json');
const data = JSON.parse(dataBuff);

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
      if (arrArg[0] > 114) {
        console.log('tidak ditemukan');
        return;
      }
      // console.log(arrArg);
      // const { nomorsurah, ayat } = argv;
      const rawSurah = fs.readFileSync('./data/'+arrArg[0]+'.json');
      const jsonSurah = JSON.parse(rawSurah)
      console.log('Terjemah dari '+jsonSurah[arrArg[0]]["name_latin"]+' ayat ke '+arrArg[1]);
      const result = jsonSurah[arrArg[0]]["translations"]["id"]["text"][arrArg[1]];
      if (!result) {
        console.log('mohon maaf data tidak ditemukan');
        return;
      }
      console.log(boxen(chalk.green(result), {padding: 1}));
    })
    .demandCommand(1)
  .argv
}