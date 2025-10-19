import { DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } from "$env/static/private";
import {
	ContainerBuilder,
	EmbedBuilder,
	MessageFlags,
	TextDisplayBuilder,
	WebhookClient,
} from "discord.js";

const webhookClient = new WebhookClient({ id: DISCORD_WEBHOOK_ID, token: DISCORD_WEBHOOK_TOKEN });

export default function discordLog(title: string, message: string) {
	const components = [
		new ContainerBuilder().addTextDisplayComponents(
			new TextDisplayBuilder().setContent(`## ${title}`),
			new TextDisplayBuilder().setContent(message),
		),
	];
	console.log(components);

	webhookClient.send({
		flags: MessageFlags.IsComponentsV2,
		components,
		withComponents: true,
	});
}
