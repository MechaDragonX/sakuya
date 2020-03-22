import * as fs from 'fs';
import * as Discord from 'discord.js';

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '!help',
    helpMessage: 'The command you are using now!',
	execute(message: Discord.Message, args: string[]) {
        const client: any = new Discord.Client();
        client.commands = new Discord.Collection();
        const commandFiles: string[] = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));
        for(const file of commandFiles) {
            const command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
        }
        const commandHelp: Map<string, string> = new Map<string, string>();
        for(const command of client.commands) {
            commandHelp.set(command.usage, command.helpMessage);
        }

        let help: string = '**List of Commands I Can do**\n';
		commandHelp.forEach(function(key, value) {
            help = help.concat(`\`${key}\`: ${value}\n`);
        });
        message.channel.send(help);
	},
};
