const Discord = require('discord.js');
const client = new Discord.Client();

let CMD = require('./command');


/* Commands */

CMD.registerCommand('roll', 1, (msg, args) => { msg.channel.send(`${msg.member.toString()} rolled a ${Math.round(Math.random() * (args[0] - 1)) + 1}`) },
        "Shows a random number from 1 to whatever you input", 'roll {Maximum number}');

CMD.registerCommand('ban', 2, (msg, args) => {

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send('You can\'t use that!');
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send('I don\'t have the right permissions.')

    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if(!member) return msg.channel.send('Can\'t seem to find this user. Sorry \'bout that :/');
    if(!member.bannable) return msg.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

    if(member.id === msg.author.id) return msg.channel.send('Bruh, you can\'t ban yourself!');

    let reason = args.slice(1).join(" ");

    if(!reason) reason = 'Unspecified';

    member.ban({ reason }).catch(err => { 
        msg.channel.send('Something went wrong')
        console.log(err)
    })

    const banembed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Banned by', msg.author)
        .addField('Reason', reason)
        .setFooter('Time banned', client.user.displayAvatarURL())
        .setTimestamp()

    msg.channel.send(banembed);

}, "Perma-bans the user from the discord server", 'ban {user} {reason}');

CMD.registerCommand('tempban', 3, (msg, args) => {

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send('You can\'t use that!');
    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send('I don\'t have the right permissions.')

    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if(!member) return msg.channel.send('Can\'t seem to find this user. Sorry \'bout that :/');
    if(!member.bannable) return msg.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

    if(member.id === msg.author.id) return msg.channel.send('Bruh, you can\'t ban yourself!');

    let reason = args.slice(2).join(" ");

    if(!reason) reason = 'Unspecified';

    member.ban({ days: parseInt(args[1], 10), reason }).catch(err => { 
        msg.channel.send('Something went wrong')
        console.log(err)
    })

    const banembed = new Discord.MessageEmbed()
        .setTitle('Member Temp-Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Temp-Banned', member)
        .addField('Temp-Banned by', msg.author)
        .addField('Reason', reason)
        .setFooter('Time temp-banned', client.user.displayAvatarURL())
        .setTimestamp()

    msg.channel.send(banembed);

}, "Temp-bans the user from the discord server", 'tempban {user} {days} {reason}');

/* ASCII Characters */

function sendChar(char, msg){
    msg.delete();
    msg.channel.send(`From ${msg.member.toString()}\n${char}`);
}

CMD.registerCommand('lenny', 0, (msg, args) => sendChar('( ͡° ͜ʖ ͡°)', msg), "Displays ( ͡° ͜ʖ ͡°)", 'lenny');
CMD.registerCommand('shrug', 0, (msg, args) => sendChar('¯\\_(ツ)_/¯', msg), "Displays ¯\\_(ツ)_/¯", 'shrug');
CMD.registerCommand('partyart', 0, (msg, args) => sendChar('♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪¯', msg), "Displays ♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪", 'partyart');
CMD.registerCommand('crayola', 0, (msg, args) => sendChar('((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅a̲̅( ̲̅((>', msg), "Displays ((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅a̲̅( ̲̅((>", 'crayola');
CMD.registerCommand('awyeah', 0, (msg, args) => sendChar('─=≡Σ((( つ◕ل͜◕)つ', msg), "Displays ─=≡Σ((( つ◕ل͜◕)つ", 'awyeah');
CMD.registerCommand('friku', 0, (msg, args) => sendChar('┌ಠ_ಠ)┌∩┐ ᶠᶸᶜᵏ:hearts:ᵧₒᵤ', msg), "Displays ┌ಠ_ಠ)┌∩┐ ᶠ***:hearts:ᵧₒᵤ", 'friku');

/* Bot Code */

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    CMD.register(client.user.username, 'LUMINOUS_VIVID_PINK');
});

client.on('message', (message) => {
    CMD.executeCommands(message);
    
});

client.login(process.env.DISCORD_BOT_TOKEN);