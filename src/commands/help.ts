import * as fs from 'fs';
import * as path from 'path';
import * as Discord from 'discord.js';

let helpText: string[];
// let helpText: string[] = new Array<string>();
fs.readFile(path.join(__dirname, 'help.json'), (err, data) => {
    if (err) throw err;
    helpText = JSON.parse(data.toString());
    // let parts: string [];
    // for(let i = 0; i < base.length; i++) {
    //     parts = base[i].split('\n');
    //     helpText.push(parts[0], parts[1]);
    // }
});

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '!help',
    helpMessage: 'The command you are using now!',
	execute(message: Discord.Message) {
        let content: string = `<@${message.author.id}>\n`;
        for(let i = 0; i < helpText.length; i++) {
            if(i != helpText.length - 1)
                content += `${helpText[i]} + \n\n`;
            else
                content += helpText[i];

            // if((i + 1) % 2 == 1)
            //     content += `${helpText[i]} + \n`;
            // else if(((i + 1) % 2 == 0) && (i != helpText.length - 1))
            //     content += `${helpText[i]} + \n\n`;
            // else
            //     content += helpText[i];
        }
        return message.channel.send(content);
	},
	help(message: Discord.Message) {
		return message.channel.send(`<@${message.author.id}>\nSyntax: \`${this.usage}\`\n${this.helpMessage}`)
    },
    toString() {
        return `${this.name}: ${this.description}\nSyntax: \`${this.usage}\``
    }
};
