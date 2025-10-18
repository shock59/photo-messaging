<script lang="ts">
	import Info from "phosphor-svelte/lib/Info";
	import Plus from "phosphor-svelte/lib/Plus";
	import Trash from "phosphor-svelte/lib/Trash";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";

	let selectedImages: Image[] = $state([]);

	let SearchQuery: string = $state("");
	let searching: boolean = $state(false);
	let searchResults: Image[] = $state([]);

	let dialog: HTMLDialogElement;
	let dialogImage: Image | undefined = $state();

	async function search() {
		if (!SearchQuery.trim()) return;
		searching = true;
		const res = await fetch(`./new/imageSearch/${encodeURIComponent(SearchQuery)}`);
		searchResults = await res.json();
		searching = false;
	}

	function showAttribution(image: Image) {
		dialogImage = image;
		dialog.showModal();
	}
</script>

<form method="POST" action="?/guess">
	<input type="text" placeholder="Your message" name="text" />

	<div class="container">
		<div><b>Selected images</b></div>
		<div class="images-container">
			{#each selectedImages as image, index}
				<div class="image-container">
					<img src={image.srcs.small} alt={image.alt} />
					<div class="image-overlay">
						<button type="button" onclick={() => showAttribution(image)}
							><Info size={32} weight="duotone" /></button
						>

						<button type="button" onclick={() => selectedImages.splice(index, 1)}
							><Trash size={32} weight="duotone" /></button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="container">
		<div class="row">
			<input type="text" placeholder="Search images" bind:value={SearchQuery} />
			<button type="button" onclick={search}><MagnifyingGlass weight="bold" /></button>
		</div>

		<div class="images-container">
			{#if searching}
				Loading search results
			{:else if searchResults.length}
				{#each searchResults as image}
					<div class="image-container">
						<img src={image.srcs.small} alt={image.alt} />
						<div class="image-overlay">
							<button type="button" onclick={() => showAttribution(image)}
								><Info size={32} weight="duotone" /></button
							>

							<button type="button" onclick={() => selectedImages.push(image)}
								><Plus size={32} /></button
							>
						</div>
					</div>
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

<dialog bind:this={dialog}>
	{#if dialogImage}
		<div class="image-container">
			{#key dialogImage}<img src={dialogImage.srcs.large} alt={dialogImage.alt} />{/key}
		</div>
		<div>{dialogImage.alt}</div>
		<div class="attribution">
			Attribution: <a href={dialogImage.attribution.href}>{dialogImage.attribution.text}</a>
		</div>
	{/if}

	<form method="dialog">
		<button>Close</button>
	</form>
</dialog>

<style>
	.container {
		width: calc(100% - 44px);
		max-width: 1260px;
		margin-bottom: 16px;
		padding: 12px 22px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #110f1b;
	}

	.container input {
		background: #090811;
	}

	.images-container {
		margin: 8px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.image-container {
		height: 240px;
		margin: 8px;
		position: relative;
		border: 2px #000000 solid;
		border-radius: 8px;
	}

	img {
		height: 100%;
	}

	.image-overlay {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: right;
		opacity: 0;
		transition: 0.5s ease;
	}

	.image-container:hover .image-overlay {
		opacity: 1;
	}

	.image-overlay button {
		height: fit-content;
		padding: 0;
		margin: 8px;
		display: flex;
		background: none;
	}

	dialog {
		padding: 12px 22px;
		flex-direction: column;
		align-items: center;
		border: none;
		border-radius: 8px;
		background: #110f1b;
		color: inherit;
	}

	dialog[open] {
		display: flex;
	}

	dialog::backdrop {
		background: #000000d0;
	}

	dialog .image-container {
		height: 480px;
	}

	.attribution {
		margin-top: 16px;
	}
</style>
