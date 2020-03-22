import * as Discord from 'discord.js';
const { prefix, token } = require('../config.json');

const client: any = new Discord.Client();

client.once('ready', (): any => {
	console.log('Ready!');
});

client.on('message', (message: any) => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    
    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const command: string = args.shift().toLowerCase();

    if(command === 'args-info') {
        if(!args.length) {
            return message.reply(`You didn't provide any arguments, ${message.author.username}!`);
        }
        return message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
    if(command === 'ping') {
        if(!args.length) {
            return message.reply('Pong!');
        }
        return message.channel.send(args.join(' '));
    }
});

client.login(token);
