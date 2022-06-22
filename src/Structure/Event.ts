import { ClientEvents } from "discord.js";
import Client from "../Client";

interface EventOption {(
    client: Client,
    ...args: any[]
)}

export interface Event {
    name: keyof ClientEvents
    run: EventOption
}