let commands = [];

let cmdtk = '!';

module.exports = {
    registerCommandToken: (token = '!') => {
        cmdtk = token
    },

    registerCommand: (cmd = "", argcount, action, description = "", usage = "") => {
        commands.push({action, cmd, argcount, description, usage});
    },

    executeCommands: (message) => {
        if(message.content.charAt(0) === cmdtk){
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