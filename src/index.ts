import * as fs from 'fs';
import * as Discord from 'discord.js';
import * as tsSerializer from 'serialize-ts';
import * as jsSerialize from 'serialize-javascript';

const { prefix, token, bannedUsers } = require('../config.json');
const { isClean, clean } = require('./clean');

const client: any = new Discord.Client();
const commands: Map<string, any> = new Map<string, any>();

const commandFiles: string[] = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));
for(const file of commandFiles) {
	const command: any = require(`./commands/${file}`);
	commands.set(command.name, command);
}

client.once('ready', (): any => {
    console.log('Ready!');
    client.user.setActivity("\"Night of Knights\" at full blast", { type: 'LISTENING' });
});

client.on('message', (message: Discord.Message): any => {
    if(!message.author.bot) {
        if(!isClean(message))
            return clean(message);
    }

    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    if(bannedUsers.includes(message.author.id))
        return;
    
    const args: string[] = message.content.slice(prefix.length).split(/ +/g);
    const commandName: string = args.shift();

    if (!commands.has(commandName))
        return message.reply('that command doesn\'t exist~! >_<');

    const command: any = commands.get(commandName);
    if(args.length === 1 && args[0].toLowerCase() === 'help')
        return command.help(message);
    try {
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply('there was an error trying to execute that command~! >_<');
    }

});

client.login(token);
