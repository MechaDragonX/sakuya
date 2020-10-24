import * as Discord from 'discord.js';

module.exports = {
	name: 'ping',
	description: 'Ping back a message!',
	usage: '!ping <message>',
	helpMessage: '\"Message\" is the message you want me to repeat back to you.',
	execute(message: Discord.Message, args: string[]) {
		if(!args.length) {
            return message.reply('Pong!');
        }
        return message.channel.send(args.join(' '));
	},
	help(message: Discord.Message) {
		return message.channel.send(`<@${message.author.id}>\nSyntax: \`${this.usage}\`\n${this.helpMessage}`)
    },
    toString() {
        return `${this.name}: ${this.description}\nSyntax: \`${this.usage}\``
    }
};
