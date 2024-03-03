const { WebClient } = require('@slack/web-api');
const { exec } = require('child_process');

// 當 CI 流程失敗時，這個檔案會被執行，執行一個 shell 指令以取得最後一次的 git commit 資訊

exec('git show -s --pretty=medium HEAD', (err, stdout) => {
  const text = 'cdic-mascot-web failed 😭\n' + stdout;
  const web = new WebClient(process.env.SLACK_TOKEN);
  web.chat
    .postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text,
    })
    .then(() => console.log('Sent message'));
});
