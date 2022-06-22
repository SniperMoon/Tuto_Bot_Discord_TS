import { Command, Event } from "../Structure";

export const event: Event = {
    name: "ready",
    run: async (client) => {
        console.log(`${client.user.tag} is online`);
    }
}