import * as Discord from 'discord.js';

module.exports = {
	name: 'failsafe',
	description: 'Error message for nonexisting commands',
	execute(message: Discord.Message) {
        return message.reply('that command doesn\'t exist~!');
	}
};
