import * as fs from 'fs';
import * as Discord from 'discord.js';
const { prefix, token, bannedUsers } = require('../config.json');

const client: any = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles: string[] = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', (): any => {
	console.log('Ready!');
});

client.on('message', (message: Discord.Message): any => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    if(bannedUsers.includes(message.author.id))
        return;
    
    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const commandName: string = args.shift().toLowerCase();

    if (!client.commands.has(commandName))
        return client.commands.get('failsafe').execute(message);

    const command: any = client.commands.get(commandName);

    if(args.length === 1 && args[0].toLowerCase() === 'help')
        return command.help(message);
    
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command~! >_<');
    }

});

client.login(token);
