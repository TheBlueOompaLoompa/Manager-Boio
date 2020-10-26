const Discord = require('discord.js');
const client = new Discord.Client();

let CMD = require('./command');

/* Commands */

/* ASCII Characters */

function sendChar(char, msg){
    msg.delete();
    msg.channel.send(`From ${msg.member.toString()} ${char}`);
}

CMD.registerCommand('lenny', 0, (msg, args) => { 
    sendChar('( ͡° ͜ʖ ͡°)', msg);
});

/* Bot Code */

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => CMD.executeCommands(message));

client.login(process.env.DISCORD_BOT_TOKEN);