import * as Discord from "discord.js";
const { getUserFromMention, hasMention } = require('../util');

module.exports = {
	name: 'addRole',
	description: 'Give users roles',
	usage: '!addRole <role> <User 1> <User 2>... | !addRole <User> <role 1> <role 2>...',
	helpMessage: '\"Message\" is the message you want me to repeat back to you.',
	async execute(message: any, args: string[]) {
		if(!args.length) {
            return message.reply('Not enough arguments~! >_<\n Type `!addRole help` for help!');
        }

        if(message.mentions != null) {
            let passedRoles: string[] = new Array<string>();
            for(let i: number = 1; i < args.length; i++) {
                passedRoles.push(message.guild.roles.cache.find(role => role.name === args[i]));
            }

            let user: Discord.GuildMember = message.mentions.members.first()
            if(user.roles.cache.some(role => passedRoles.includes(role.name)) ) {
                passedRoles.forEach(function(role) {
                    if(user.roles.cache.find(r => r.name === role))
                        passedRoles.splice(passedRoles.findIndex(name => role));
                })
            } else {
                try {
                    await user.roles.add(passedRoles);
                    message.reply(`${passedRoles} added to <@${user.id}> successfully!`);
                }
                catch(error) {
                    console.error(error);
                    message.reply('there was an error trying to execute that command~! >_<');
                }
            }
        }
	},
	help(message: Discord.Message) {
		return message.channel.send(`<@${message.author.id}>\nUsage: \`${this.usage}\`\n${this.helpMessage}`)
	}
};
