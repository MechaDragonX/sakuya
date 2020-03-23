import * as Discord from 'discord.js';

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '!help',
    helpMessage: 'The command you are using now!',
	execute(commands: Map<string, any>, message: Discord.Message, args: string[]) {
        const commandHelp: Map<string, string> = new Map<string, string>();
        
        for(const key in commands) {
            commandHelp.set(commands.get(key).usage, commands.get(key).helpMessage);
        }

        let help: string = '**List of Commands I Can do**\n';
		commandHelp.forEach(function(key, value) {
            help = help.concat(`\`${key}\`: ${value}\n`);
        });
        message.channel.send(help);
	},
};
