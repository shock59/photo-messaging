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

<h1>What do you think the message is?</h1>

<div id="images-container">
	{#each images as image}
		<img src={image.src} alt={image.alt} />
	{/each}
</div>

<p>Answer: I love coding and trains</p>

<style>
	#images-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	img {
		height: 240px;
		margin: 8px;
		border-radius: 8px;
	}
</style>
