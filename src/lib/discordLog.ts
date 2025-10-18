import { DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } from "$env/static/private";
import { EmbedBuilder, WebhookClient } from "discord.js";

const webhookClient = new WebhookClient({ id: DISCORD_WEBHOOK_ID, token: DISCORD_WEBHOOK_TOKEN });

export default function discordLog(message: string) {
	const embed = new EmbedBuilder().setDescription(message).setColor(0x00ffff);

	webhookClient.send({
		embeds: [embed],
	});
}
