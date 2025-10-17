<script lang="ts">
	import { onMount } from 'svelte';

	let images: Image[] = $state([]);

	onMount(async () => {
		const res = await fetch('./new/imageSearch/Earth');
		images = await res.json();
	});
</script>

<form method="POST" action="?/guess">
	<input type="text" placeholder="Your message" name="text" />

	<h2>Images</h2>

	<div id="images-container">
		{#each images as image}
			<img src={image.src} alt={image.alt} />
		{/each}
	</div>

	<input type="text" placeholder="Your name (optional)" name="author" />
	<button>Submit</button>
</form>

<style>
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
</style>
