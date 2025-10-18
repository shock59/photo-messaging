<script lang="ts">
	const { data } = $props();
</script>

<main>
	<h1>What do you think the message is?</h1>

	<div id="images-container">
		{#each data.message.images as image}
			<img src={image.srcs.small} alt={image.alt} />
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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 48px;
	}

	#images-container {
		margin: 8px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	img {
		height: 240px;
		margin: 8px;
		border: 2px #000000 solid;
		border-radius: 8px;
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
