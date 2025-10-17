<script lang="ts">
	const images = [
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Gray_eyes.jpg',
			alt: 'These are my eyes when they are gray.'
		},
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Love_padlocks_on_the_Butchers%27_Bridge_%28Ljubljana%29.jpg',
			alt: "Love padlocks on the Butchers' Bridge in Ljubljana, Slovenia."
		},
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Programming_code.jpg',
			alt: 'HTML and Javascript code with highlighted scripts and functions. Script on a computer with source code – screen of a software developer. Photographed by Martin Vorel - https://martinvorel.com'
		},
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Andorra_M_5312_license_plate.jpg',
			alt: 'Andorra M 5312. seen in Liechtenstein'
		},
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/0/09/S02_692_Bf_Bern_Hbf%2C_IC2000-Bt.jpg',
			alt: 'S02 692 Bf Bern Hbf, IC2000-Bt'
		}
	];
</script>

<main>
	<h1>What do you think the message is?</h1>

	<div id="images-container">
		{#each images as image}
			<img src={image.src} alt={image.alt} />
		{/each}
	</div>

	<form>
		<input type="text" placeholder="Your guess" />
		<input type="text" placeholder="Your name (optional)" />
		<button>Guess</button>
	</form>

	<h2>Others' guesses</h2>

	<div class="guess">
		<div>This is an example guess from someone else</div>
		<div class="guess-author">Guess by Anonymous</div>
	</div>

	<div class="guess">
		<div>This is another example guess from someone else</div>
		<div class="guess-author">Guess by Anonymous</div>
	</div>
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
