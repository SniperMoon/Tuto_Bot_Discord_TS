import { Command } from "../../Structure";

export const command: Command = {
    name: "ping",
    description: "Pong",
    category: "Members",
    aliases: ["p"],
    run: async (client, message, args) => {
        try {
            message.reply("Ok")
        } catch(err) {
            console.log(err);
        }
    }
}