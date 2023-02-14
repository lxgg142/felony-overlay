const loggerManager = require('../../helper/logger.js');
const logger = new loggerManager('RPC');

const { clientId } = require('../../config.json');

const discordRPC = require('discord-rpc');
const RPC = new discordRPC.Client({ transport: 'ipc' });

const startTimestamp = new Date();

discordRPC.register(clientId);

async function setActivity() {
  if (!RPC) return;
  RPC.setActivity({
    instance: false,
    details: `The Official Felony Stats Overlay`,
    startTimestamp,
    buttons: [
      {
        label: `Get Overlay`,
        url: `https://github.com/lxgg142/felony-overlay/releases/latest`,
      },
      {
        label: `Felony Guild`,
        url: `https://discord.gg/F2FFSB8JTr`,
      },
    ],
  });
}

RPC.on('ready', async () => {
  setActivity();

  setInterval(() => {
    setActivity();
  }, 15 * 1000);
});

RPC.login({ clientId: clientId }).catch((err) => {
  logger.error(err);
});
