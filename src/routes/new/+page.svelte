<script lang="ts">
	let query: string = $state('');

	let searching: boolean = $state(false);
	let images: Image[] = $state([]);

	async function search() {
		if (!query.trim()) return;
		searching = true;
		const res = await fetch(`./new/imageSearch/${encodeURIComponent(query)}`);
		images = await res.json();
		searching = false;
	}
</script>

<form method="POST" action="?/guess">
	<input type="text" placeholder="Your message" name="text" />

	<div id="search-container">
		<div class="row">
			<input type="text" placeholder="Search images" bind:value={query} />
			<button type="button" onclick={search}>Search</button>
		</div>

		<div id="images-container">
			{#if searching}
				Loading search results
			{:else if images.length}
				{#each images as image}
					<img src={image.src} alt={image.alt} />
				{/each}
			{:else}
				<span
					>Tip: If you have a specific image on Wikimedia Commons you want to use, use the url for
					its page as your search.</span
				>
			{/if}
		</div>
	</div>

	<input type="text" placeholder="Your name (optional)" name="author" />
	<button>Submit</button>
</form>

<style>
	#search-container {
		margin-bottom: 16px;
		padding: 16px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #110f1b;
	}

	#search-container input {
		background: #090811;
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
</style>
