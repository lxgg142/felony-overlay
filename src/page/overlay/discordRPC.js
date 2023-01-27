const LoggerManager = require('../../helper/Logger');
const logger = new LoggerManager('RPC');

const clientId = '1067537275132575844';
const startTimestamp = new Date();

const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

DiscordRPC.register(clientId);

async function setActivity() {
  if (!RPC) return;
  RPC.setActivity({
    instance: false,
    startTimestamp,
    buttons: [
      {
        label: `Get Overlay`,
        url: `https://github.com/andy-bergner/felony-overlay/releases/latest`,
      },
      {
        label: `Felony Guild`,
        url: `https://discord.gg/felony`,
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

RPC.login({ clientId }).catch((err) => {
  logger.error(err);
});
