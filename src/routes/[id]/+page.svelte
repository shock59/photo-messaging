<script lang="ts">
	import { enhance } from "$app/forms";
	import AttributionDialog from "$lib/components/AttributionDialog.svelte";
	import stopEnterSubmittingForm from "$lib/stopEnterSubmittingForm.js";
	import Info from "phosphor-svelte/lib/Info";
	import { onMount } from "svelte";

	const { data, form } = $props();

	let formElement: HTMLFormElement | undefined = $state();

	let dialog: AttributionDialog;
	let dialogImage: ServiceImage | undefined = $state();

	function showAttribution(image: ServiceImage) {
		dialogImage = image;
		dialog.show();
	}

	onMount(() => {
		if (formElement) stopEnterSubmittingForm(formElement);
	});
</script>

<h1>Guess the message</h1>
<div>Message created by {data.message.author}</div>
<div class="bottom-title-text">What do you think they were trying to signal?</div>

<div id="images-container">
	{#each data.message.images as image}
		<div class="image-container">
			<img src={image.srcs.small} alt={image.alt} width={240 * image.widthHeightRatio} />

			<div class="image-overlay">
				<button type="button" onclick={() => showAttribution(image)}
					><Info size={32} weight="duotone" /></button
				>
			</div>
		</div>
	{/each}
</div>

{#if !data.guessed}
	<form method="POST" action="?/guess" bind:this={formElement} use:enhance>
		<input type="text" placeholder="Your guess" name="text" />
		<input type="text" placeholder="Your name (optional)" name="author" />
		<button>Guess</button>
		{#if form}
			<p class="error">{form}</p>
		{/if}
	</form>
{:else}
	<div class="answer-text-introduction">The message was:</div>
	<div class="answer-text">“{data.message.text}”</div>

	<div><a href="/">View a new message</a></div>

	<h2>Others' guesses</h2>

	{#if !data.message.guesses.length}
		<p>Nobody has guessed yet.</p>
	{/if}
	{#each data.message.guesses as guess}
		<div class="guess">
			<div>{guess.text}</div>
			<div class="guess-author">{guess.author}</div>
		</div>
	{/each}
{/if}

<AttributionDialog image={dialogImage} bind:this={dialog} />

<style>
	h1 {
		margin-bottom: 0;
	}

	.bottom-title-text {
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
