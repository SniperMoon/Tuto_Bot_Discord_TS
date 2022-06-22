import { Message } from "discord.js";
import ClientPlus from "../Client";

interface CommandOption {(
    client: ClientPlus,
    message: Message,
    args: string[]
)}

export interface Command {
    name: string;
    description?: string;
    aliases: string[];
    category: string;
    run: CommandOption
}