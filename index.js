const Discord = require('discord.js');
const client = new Discord.Client();

let CMD = require('./command');


/* Commands */

CMD.registerCommand('roll', 1, (msg, args) => { msg.channel.send(`${msg.member.toString()} rolled a ${Math.round(Math.random() * args[0])}`) },
        "Shows a random number from 1 to whatever you input", 'roll {Maximum number}');

/* ASCII Characters */

function sendChar(char, msg){
    msg.delete();
    msg.channel.send(`From ${msg.member.toString()}\n${char}`);
}

CMD.registerCommand('lenny', 0, (msg, args) => sendChar('( ͡° ͜ʖ ͡°)', msg), "Displays ( ͡° ͜ʖ ͡°)", 'lenny');
CMD.registerCommand('shrug', 0, (msg, args) => sendChar('¯\\_(ツ)_/¯', msg), "Displays ¯\\_(ツ)_/¯", 'shrug');
CMD.registerCommand('partyart', 0, (msg, args) => sendChar('♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪¯', msg), "Displays ♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪", 'partyart');
CMD.registerCommand('crayola', 0, (msg, args) => sendChar('((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅a̲̅( ̲̅((>', msg), "Displays ((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅a̲̅( ̲̅((>", 'crayola');


/* Bot Code */

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    CMD.register(client.user.username, 'LUMINOUS_VIVID_PINK');
});

client.on('message', (message) => CMD.executeCommands(message));

client.login(process.env.DISCORD_BOT_TOKEN);