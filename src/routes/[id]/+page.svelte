<script lang="ts">
	const { data } = $props();
</script>

<main>
	<h1>What do you think the message is?</h1>

	<div id="images-container">
		{#each data.message.images as image}
			<img src={image.src} alt={image.alt} />
		{/each}
	</div>

	<form method="POST" action="?/guess">
		<input type="text" placeholder="Your guess" name="text" />
		<input type="text" placeholder="Your name (optional)" name="author" />
		<button>Guess</button>
	</form>

	<h2>Others' guesses</h2>

	{#each data.message.guesses as guess}
		<div class="guess">
			<div>{guess.text}</div>
			<div class="guess-author">{guess.author}</div>
		</div>
	{/each}
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

	form {
		margin: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input,
	button {
		padding: 16px;
		border: none;
		border-radius: 8px;
		color: inherit;
		font: inherit;
		font-size: 22px;
	}

	input {
		width: 520px;
		margin-bottom: 16px;
		outline: none;
		background: #110f1b;
	}

	button {
		width: fit-content;
		background: #b5598f;
		cursor: pointer;
	}

	.guess {
		width: 520px;
		margin-bottom: 16px;
		padding: 16px;
		border-radius: 8px;
		background: #110f1b;
		font-size: 22px;
	}

	.guess-author {
		font-size: 16px;
		opacity: 0.5;
	}
</style>
