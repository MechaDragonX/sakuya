import * as Discord from "discord.js";

const { bannedWords } = require('../config.json');
const warningLimit: number = 10;
let count: number = 0;

module.exports = {
    warningLimit,
    count,
    isClean: function(message: Discord.Message): boolean {
        let cleanliness: boolean = true;
        let words: string[] = message.content.split(/ +/g);
        for(let i: number = 0; i < words.length; i++) {
            if(bannedWords.includes(words[i].toLowerCase())) {
                cleanliness = false;
                break;
            }
        }
        return cleanliness;
    },
	clean: async function(message: Discord.Message) {
        let foundWord: string[] = new Array<string>();
        let words: string[] = message.content.split(/ +/g);
        words.forEach(function(word: string) {
            if(bannedWords.includes(word))
                count++;
        });
        if(count >= warningLimit) {
            message.reply(`Don't you know that ${ foundWord } is banned! >_<\nI will delete your message now~!`);
            return await message.delete();
        }
        return await message.reply(`Don't you know that ${ foundWord } is banned! >_<\nWrite any of them **${ warningLimit - count }** more times, and I will delete that message~! :3`);
    }
};
