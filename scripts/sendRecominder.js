const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function sendRecominder() {
  const jobs = JSON.parse(await fs.promises.readFile(path.join(__dirname, '..', 'jobs.json'), 'utf-8'));
  const schedules = JSON.parse(await fs.promises.readFile(path.join(__dirname, '..', 'schedules.json'), 'utf-8'));
  const LAST_TRIGGERED_AT = (await fs.promises.readFile(path.join(__dirname, '..', 'LAST_TRIGGERED_AT', 'utf-8'))).trim();

  const last = new Date(Number(LAST_TRIGGERED_AT));
  const now = new Date();

  console.log(`[now] getHours: ${now.getHours()}`);
  console.log(`[last] getHours: ${last.getHours()}`);

  if (last.getHours() === now.getHours()) {
    console.log(`${last.toLocaleString('ko-KR', { timeZone: 'UTC' })}`);
    return;
  }

  for (const schedule of schedules) {
    const { jobId, hoursList } = schedule;

    console.log({ jobId, hoursList });

    if (hoursList.some(h => `${h}` === '*' || `${h}` === `${now.getHours()}`)) {
      const job = jobs.find(j => j.id === jobId);

      if (job == null) {
        console.error(`job 이 없습니다. (${job})`);
        continue;
      }

      await fetch(`https://api.telegram.org/bot${process.env[job.accessTokenKey]}/sendMessage`, {
        method: 'post',
        body: JSON.stringify({
          ['chat_id']: process.env[job.chatIdKey],
          text: job.message,
        }),
        headers: {'Content-Type': 'application/json'}
      });
    }
  }
}

sendRecominder()
  .catch((e) => {
    console.error(e.message);
    console.error(e.stack);
    process.exit(1);
  });