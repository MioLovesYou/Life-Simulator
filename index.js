var Client = require('./structures/client');
const client = new Client({
  disableEveryone: true,
  messageCacheMaxSize: 80,
  messageSweepInterval: 6000,
  messageCacheLifetime: 6000,
  disabledEvents: [
    'TYPING_START',
    'USER_UPDATE',
    'USER_NOTE_UPDATE',
    'USER_SETTINGS_UPDATE',
    'PRESENCE_UPDATE',
    'WEBHOOKS_UPDATE',
    'CHANNEL_PINS_UPDATE',
    'CHANNEL_UPDATE',
    'GUILD_BAN_ADD',
    'GUILD_ROLE_UPDATE',
    'GUILD_MEMBER_ADD',
    'GUILD_MEMBER_REMOVE',
    'GUILD_MEMBER_UPDATE',
    'GUILD_ROLE_CREATE',
    'GUILD_UPDATE',
    'MESSAGE_DELETE_BULK',
    'MESSAGE_DELETE',
    'PRESENCE_UPDATE',
    'VOICE_STATE_UPDATE'
  ]
});

client.run();

client.login(process.env.TOKEN)