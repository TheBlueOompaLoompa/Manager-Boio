const Discord = require('discord.js');
const client = new Discord.Client();

let CMD = require('./command');

/* Commands */

/* ASCII Characters */

CMD.registerCommand('lenny', 0, (msg, args) => { 
    msg.channel.send(`From ${'@' + msg.author.username} ( ͡° ͜ʖ ͡°)`);
    msg.delete();
});

/* Bot Code */

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => CMD.executeCommands(message));

client.login(process.env.DISCORD_BOT_TOKEN);