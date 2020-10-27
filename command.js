const Discord = require('discord.js');

let commands = [];

let cmdtk = '!';

let color = [255, 0, 255];
let name = "";

function generateHelpEmbed(){
    let cmdHelpDisp = [];

    commands.forEach(cmd => {
        if(!(cmd.usage === "" || cmd.description === ""))
            cmdHelpDisp.push({ name: cmdtk + cmd.cmd, value: "Usage: " + cmdtk + cmd.usage + " | " + cmd.description });
    });

    const helpEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${name} Commands | Help`)
        .addFields(
            ...cmdHelpDisp
        )
        .setTimestamp();

        return helpEmbed;
}

module.exports = {
    register: (botName, serverColor = [255, 0, 255]) => {
        color = serverColor;

        name = botName;

        commands.push({
            action: (msg, args) => {
                msg.channel.send(generateHelpEmbed());
                msg.delete();
            },
            cmd: "help",
            argcount: 0,
            description: "Shows this menu.",
            usage: "!help"
        });
    },

    registerCommandToken: (token = '!') => {
        cmdtk = token
    },

    registerCommand: (cmd = "", argcount, action, description = "", usage = "") => {
        commands.push({action, cmd, argcount, description, usage});
    },

    executeCommands: (message) => {
        if(message.content.charAt(0) === cmdtk && message.guild !== null){
            commands.forEach((cmd) => {

                if(message.content.split(" ")[0].split("!")[1].toLowerCase() !== cmd.cmd)
                    return;

                let args = message.content.split(" ").slice(1);

                if(args.length > cmd.argcount){
                    message.reply(`You gave to many arguments. Usage: ${cmd.usage}`);
                    return;
                }
                if(args.length < cmd.argcount){
                    message.reply(`This command requires more arguments. Usage: ${cmd.usage}`);
                    return;
                }

                cmd.action(message, args);
            });
        }
    }
}