import * as Discord from 'discord.js';
const config = require('../config.json');

const client: any = new Discord.Client();

client.once('ready', (): any => {
	console.log('Ready!');
});

client.on('message', message => {
	if(message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

client.login(config.token);
