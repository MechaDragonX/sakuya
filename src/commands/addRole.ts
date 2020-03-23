import * as Discord from "discord.js";

const singleUser = async (message: any, args: string[]) => {
    let passedRoles: string[] = new Array<string>();
    for(let i: number = 1; i < args.length; i++) {
        passedRoles.push(message.guild.roles.cache.find(role => role.name === args[i]));
    }

    let user: Discord.GuildMember = message.mentions.members.first();
    if(user.roles.cache.some(role => passedRoles.includes(role.name))) {
        passedRoles.forEach(function (role) {
            if(user.roles.cache.find(r => r.name === role))
                passedRoles.splice(passedRoles.findIndex(name => role));
        });
    }
    else {
        try {
            await user.roles.add(passedRoles);
            return message.reply(`${passedRoles} added to <@${user.id}> successfully!`);
        }
        catch(error) {
            console.error(error);
            return message.reply('there was an error trying to execute that command~! >_<');
        }
    }
}
const multiUser = async (message: any, args: string[]) => {
    if(!message.guild.roles.cache.find(r => r.name === args[0]))
        return message.reply('The role was not found~! >_<');
    let role: Discord.Role = message.guild.roles.cache.find(r => r.name === args[0]);
    
    let passedUsers: Discord.GuildMember[] = new Array<Discord.GuildMember>();
    for(let i: number = 1; i < args.length; i++) {
        args[i] = args[i].substring(3, args[i].length - 1);
        passedUsers.push(message.guild.members.cache.find(member => member.id === args[i]));
    }
    passedUsers.forEach(function(user) {
        if(user.roles.cache.has(role.id))
            passedUsers.splice(passedUsers.findIndex(u => user))
    });
    try {
        await passedUsers.forEach(function(user) {
            user.roles.add(role);
        });

        let response: string = `<@&${role.id}> was added to `;
        for(let i: number = 0; i < passedUsers.length; i++) {
            if(i === passedUsers.length - 1) {
                response += `and <@${passedUsers[i].id}>!`;
            }
            else
                response += `<@${passedUsers[i].id}>, `;
        }
        return message.reply(response);
    }
    catch(error) {
        console.error(error);
        return message.reply('there was an error trying to execute that command~! >_<');
    }
}

module.exports = {
	name: 'addRole',
	description: 'Give users roles',
	usage: '!addRole <role> <User 1> <User 2>... | !addRole <User> <role 1> <role 2>...',
	helpMessage: 'The first method adds **one** *role* to **multiple** *users*. The second method adds **multiple** *roles* to **one** *user*',
	async execute(message: Discord.Message, args: string[]) {
		if(!args.length) {
            return message.reply('Not enough arguments~! >_<\n Type `!addRole help` for help!');
        }

        if(message.mentions != null) {
            if(!message.mentions.members.first())
                return message.reply('you didn\' mention any users~! >_<\n Type `!addRole help` for help!');
            if(message.mentions.members.size == 1)
                return await singleUser(message, args);
            return await multiUser(message, args);
        }
	},
	help(message: Discord.Message) {
		return message.channel.send(`<@${message.author.id}>\nUsage: \`${this.usage}\`\n${this.helpMessage}`)
	}
};
