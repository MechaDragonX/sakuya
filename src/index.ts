import * as fs from 'fs';
import * as Discord from 'discord.js';
const { prefix, token } = require('../config.json');

const client: any = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));
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
    
    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const command: string = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else
        client.commands.get('failsafe').execute(message);
});

client.login(token);
