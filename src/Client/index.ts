import Discord, { Collection } from "discord.js";
import path from "path";
import { readdirSync } from "fs";
import { Command, Event, Config } from '../Structure'
import ConfigJson from '../config.json'

export default class Client extends Discord.Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = ConfigJson;
    public aliases: Collection<string, Command> = new Collection();

    constructor() {
        super({ intents: ["GUILDS","GUILD_MEMBERS","GUILD_BANS","GUILD_INTEGRATIONS","GUILD_WEBHOOKS","GUILD_INVITES","GUILD_VOICE_STATES","GUILD_PRESENCES","GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_MESSAGE_TYPING","DIRECT_MESSAGES","DIRECT_MESSAGE_REACTIONS","DIRECT_MESSAGE_TYPING"]})
    }

    public start() {
        this.handler()
        this.login(this.config.bot.token)
    }

    public handler() {
        const commandPath = path.join(__dirname, "..", "Commands")
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
            for(const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`)
                this.commands.set(command.name, command)

                console.log(`La commands: ${command.name}, category: ${command.category} a été charger`);

                if(command?.aliases.lenght !== 0) {
                    command.aliases.forEach((alias: any) => {
                        this.aliases.set(alias, command)
                    })
                }
                
            }
        })

        const eventPath = path.join(__dirname, "..", "Events")
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`)
            this.events.set(event.name, event)
            console.log(`L'event: ${event.name} a été charger`);
            this.on(event.name, event.run.bind(null, this))
        })
    }
}