import * as Discord from 'discord.js';
const { prefix, token } = require('../config.json');
const ping = require('./commands/ping');

const client: any = new Discord.Client();

client.once('ready', (): any => {
	console.log('Ready!');
});

client.on('message', (message: Discord.Message) => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    
    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const command: string = args.shift().toLowerCase();

    if(command === 'ping') {
        ping.execute(message, args);
    }
});

client.login(token);
