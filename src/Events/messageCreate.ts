import { Message } from "discord.js";
import { Command, Event } from "../Structure";

export const event: Event = {
    name: "messageCreate",
    run: async (client, message: Message) => {
        
        const prefix = client.config.bot.prefix

        if(message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g)

        const cmd = args.shift().toLowerCase()
        if(!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd)
        if(!command) return message.reply("Cette commande n'existe pas !")
        if(command) (command as Command).run(client, message, args)
    }
}