import * as Discord from 'discord.js';

module.exports = {
	name: 'ping',
	description: 'Ping back a message!',
	execute(message: Discord.Message, args: string[]) {
		if(!args.length) {
            return message.reply('Pong!');
        }
        return message.channel.send(args.join(' '));
	}
};
