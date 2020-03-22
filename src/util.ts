import * as Discord from 'discord.js';

module.exports = {
    getUserFromMention: function(client: any, mention: string): Discord.User {
        if(!mention)
            return;
    
        if(mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if(mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    },
    hasMention: function(client: any, mention: string): boolean {
        if (!mention)
            return false;
    
        if(mention.startsWith('<@') && mention.endsWith('>'))
            return true;
    }
}
