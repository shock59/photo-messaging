<script lang="ts">
	import AttributionDialog from "$lib/components/AttributionDialog.svelte";
	import Info from "phosphor-svelte/lib/Info";

	const { data } = $props();

	let dialog: AttributionDialog;
	let dialogImage: ServiceImage | undefined = $state();

	function showAttribution(image: ServiceImage) {
		dialogImage = image;
		dialog.show();
	}
</script>

<main>
	<h1>What do you think the message is?</h1>
	<div class="author">Message created by {data.message.author}</div>

	<div id="images-container">
		{#each data.message.images as image}
			<div class="image-container">
				<img src={image.srcs.small} alt={image.alt} />

				<div class="image-overlay">
					<button type="button" onclick={() => showAttribution(image)}
						><Info size={32} weight="duotone" /></button
					>
				</div>
			</div>
		{/each}
	</div>

	{#if !data.guessed}
		<form method="POST" action="?/guess">
			<input type="text" placeholder="Your guess" name="text" />
			<input type="text" placeholder="Your name (optional)" name="author" />
			<button>Guess</button>
		</form>
	{:else}
		<div class="answer-text-introduction">The message was:</div>
		<div class="answer-text">“{data.message.text}”</div>

		<h2>Others' guesses</h2>

		{#each data.message.guesses as guess}
			<div class="guess">
				<div>{guess.text}</div>
				<div class="guess-author">{guess.author}</div>
			</div>
		{/each}
	{/if}

	<AttributionDialog image={dialogImage} bind:this={dialog} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		margin-bottom: 0;
		font-size: 48px;
	}

	.author {
		margin-bottom: 16px;
		font-style: italic;
	}

	#images-container {
		margin: 8px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.answer-text-introduction {
		font-size: 28px;
	}

	.answer-text {
		margin-bottom: 16px;
		font-size: 48px;
		font-weight: bold;
		font-style: italic;
	}

	.guess {
		width: 520px;
		margin-bottom: 16px;
		padding: 12px 22px;
		border-radius: 8px;
		background: #110f1b;
	}

	.guess-author {
		font-size: 16px;
		opacity: 0.5;
	}
</style>
