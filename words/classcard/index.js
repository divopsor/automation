const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const list = [
  { name: 'day-01.csv', url: 'https://www.classcard.net/set/10317671' },
  { name: 'day-02.csv', url: 'https://www.classcard.net/set/10317672' },
  { name: 'day-03.csv', url: 'https://www.classcard.net/set/10317673' },
  { name: 'day-04.csv', url: 'https://www.classcard.net/set/10317674' },
  { name: 'day-05.csv', url: 'https://www.classcard.net/set/10317675' },
  { name: 'day-06.csv', url: 'https://www.classcard.net/set/10317676' },
  { name: 'day-07.csv', url: 'https://www.classcard.net/set/10317677' },
  { name: 'day-08.csv', url: 'https://www.classcard.net/set/10317678' },
  { name: 'day-09.csv', url: 'https://www.classcard.net/set/10317679' },
  { name: 'day-10.csv', url: 'https://www.classcard.net/set/10317680' },
  { name: 'day-11.csv', url: 'https://www.classcard.net/set/10317681' },
  { name: 'day-12.csv', url: 'https://www.classcard.net/set/10317682' },
  { name: 'day-13.csv', url: 'https://www.classcard.net/set/10317683' },
  { name: 'day-14.csv', url: 'https://www.classcard.net/set/10317684' },
  { name: 'day-15.csv', url: 'https://www.classcard.net/set/10317685' },
  { name: 'day-16.csv', url: 'https://www.classcard.net/set/10317686' },
  { name: 'day-17.csv', url: 'https://www.classcard.net/set/10317687' },
  { name: 'day-18.csv', url: 'https://www.classcard.net/set/10317688' },
  { name: 'day-19.csv', url: 'https://www.classcard.net/set/10317689' },
  { name: 'day-20.csv', url: 'https://www.classcard.net/set/10317690' },
  { name: 'day-21.csv', url: 'https://www.classcard.net/set/10317691' },
  { name: 'day-22.csv', url: 'https://www.classcard.net/set/10317692' },
  { name: 'day-23.csv', url: 'https://www.classcard.net/set/10317693' },
  { name: 'day-24.csv', url: 'https://www.classcard.net/set/10317694' },
  { name: 'day-25.csv', url: 'https://www.classcard.net/set/10317695' },
  { name: 'day-26.csv', url: 'https://www.classcard.net/set/10317696' },
  { name: 'day-27.csv', url: 'https://www.classcard.net/set/10317697' },
  { name: 'day-28.csv', url: 'https://www.classcard.net/set/10317698' },
  { name: 'day-29.csv', url: 'https://www.classcard.net/set/10317699' },
  { name: 'day-30.csv', url: 'https://www.classcard.net/set/10317700' },
  { name: 'day-31.csv', url: 'https://www.classcard.net/set/10317701' },
  { name: 'day-32.csv', url: 'https://www.classcard.net/set/10317702' },
  { name: 'day-33.csv', url: 'https://www.classcard.net/set/10317703' },
  { name: 'day-34.csv', url: 'https://www.classcard.net/set/10317704' },
  { name: 'day-35.csv', url: 'https://www.classcard.net/set/10317705' },
  { name: 'day-36.csv', url: 'https://www.classcard.net/set/10317706' },
  { name: 'day-37.csv', url: 'https://www.classcard.net/set/10317707' },
  { name: 'day-38.csv', url: 'https://www.classcard.net/set/10317708' },
  { name: 'day-39.csv', url: 'https://www.classcard.net/set/10317709' },
  { name: 'day-40.csv', url: 'https://www.classcard.net/set/10317710' },
  { name: 'day-41.csv', url: 'https://www.classcard.net/set/10317711' },
  { name: 'day-42.csv', url: 'https://www.classcard.net/set/10317712' },
  { name: 'day-43.csv', url: 'https://www.classcard.net/set/10317713' },
  { name: 'day-44.csv', url: 'https://www.classcard.net/set/10317714' },
  { name: 'day-45.csv', url: 'https://www.classcard.net/set/10317715' },
  { name: 'day-46.csv', url: 'https://www.classcard.net/set/10317716' },
  { name: 'day-47.csv', url: 'https://www.classcard.net/set/10317717' },
  { name: 'day-48.csv', url: 'https://www.classcard.net/set/10317718' },
  { name: 'day-49.csv', url: 'https://www.classcard.net/set/10317719' },
  { name: 'day-50.csv', url: 'https://www.classcard.net/set/10317720' },
  { name: 'day-51.csv', url: 'https://www.classcard.net/set/10317721' },
  { name: 'day-52.csv', url: 'https://www.classcard.net/set/10317722' },
  { name: 'day-53.csv', url: 'https://www.classcard.net/set/10317723' },
  { name: 'day-54.csv', url: 'https://www.classcard.net/set/10317724' },
  { name: 'day-55.csv', url: 'https://www.classcard.net/set/10317725' },
  { name: 'day-56.csv', url: 'https://www.classcard.net/set/10317726' },
  { name: 'day-57.csv', url: 'https://www.classcard.net/set/10317727' },
  { name: 'day-58.csv', url: 'https://www.classcard.net/set/10317728' },
  { name: 'day-59.csv', url: 'https://www.classcard.net/set/10317729' },
  { name: 'day-60.csv', url: 'https://www.classcard.net/set/10317730' },
];

async function downloadCSV({ url }) {
  const data = await fetch(url);
  const text = await data.text();
  const $ = cheerio.load(text);
  const body$ = cheerio.load($('.flip-body.done').html());
  const list = body$('.flip-card');
  
  const result = [...list].map(x => cheerio.load(x)('.card-content > div > div')).map(([word, value]) => {
    return `${word.children[0].data.trim()},${value.children[0].data.trim().replace(/,/g, '‚')}`;
  }).join('\n');

  return result;
}

(async () => {
  let result = `T,D,P,E\n`;
  for (const item of list) {
    result += (await downloadCSV(item) + '\n');
  }

  await fs.promises.writeFile(`${__dirname}/voca-2000.csv`, result, 'utf-8');
})();
