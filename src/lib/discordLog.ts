import { DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } from "$env/static/private";
import {
	ContainerBuilder,
	EmbedBuilder,
	MessageFlags,
	TextDisplayBuilder,
	WebhookClient,
	type RGBTuple,
} from "discord.js";

const webhookClient = new WebhookClient({ id: DISCORD_WEBHOOK_ID, token: DISCORD_WEBHOOK_TOKEN });

export default function discordLog(
	title: string,
	message: string,
	accentColor: RGBTuple | undefined = undefined,
) {
	const component = new ContainerBuilder().addTextDisplayComponents(
		new TextDisplayBuilder().setContent(`## ${title}`),
		new TextDisplayBuilder().setContent(message),
	);
	if (accentColor) component.setAccentColor(accentColor);

	webhookClient.send({
		flags: MessageFlags.IsComponentsV2,
		components: [component],
		withComponents: true,
	});
}
