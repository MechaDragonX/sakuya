import * as Discord from 'discord.js';
const { prefix, token } = require('../config.json');

const client: any = new Discord.Client();

client.once('ready', (): any => {
	console.log('Ready!');
});

client.on('message', (message: any) => {
	if(message.content.startsWith(`${prefix}ping`)) {
        if(message.content[5] != ' ')
            message.channel.send('You need to have a space after `!ping`!');
        else
            message.channel.send(message.content.slice(6));
    }
});

client.login(token);
