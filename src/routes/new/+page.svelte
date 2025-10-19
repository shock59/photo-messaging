<script lang="ts">
	import Info from "phosphor-svelte/lib/Info";
	import Plus from "phosphor-svelte/lib/Plus";
	import Trash from "phosphor-svelte/lib/Trash";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import AttributionDialog from "$lib/components/AttributionDialog.svelte";
	import { onMount } from "svelte";
	import stopEnterSubmittingForm from "$lib/stopEnterSubmittingForm";
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";

	let form: HTMLFormElement;
	let formResponse: { message: string } | undefined = $state();
	let disableForm: boolean = $state(false);

	let selectedImages: ServiceImage[] = $state([]);

	let searchQuery: string = $state("");
	let searchSource: "commons" | "pexels" = $state("commons");
	let searching: boolean = $state(false);
	let searchResults: ServiceImage[] = $state([]);

	let dialog: AttributionDialog;
	let dialogImage: ServiceImage | undefined = $state();

	async function search() {
		if (!searchQuery.trim()) return;
		searching = true;
		const res = await fetch(`./new/imageSearch/${encodeURIComponent(searchQuery)}/${searchSource}`);
		searchResults = await res.json();
		searching = false;
	}

	function showAttribution(image: ServiceImage) {
		dialogImage = image;
		dialog.show();
	}

	onMount(() => {
		stopEnterSubmittingForm(form);
	});
</script>

<h1>Create a new message</h1>

<form
	method="POST"
	bind:this={form}
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type == "failure") {
				formResponse = result.data as { message: string };
				disableForm = false;
			} else if (result.type == "redirect") {
				goto(result.location);
			}
		};
	}}
	onsubmit={() => (disableForm = true)}
>
	<input type="text" placeholder="Your message" name="text" />

	<div class="container">
		<div><b>Selected images</b></div>
		<div class="images-container">
			{#if !selectedImages.length}
				<div class="no-images">
					There are no images currently selected - add one by searching for images below, hovering
					over one and clicking the <Plus
						size={22}
						style="vertical-align: sub;"
						class="aligned-image"
					/>
				</div>
			{/if}
			{#each selectedImages as image, index}
				<div class="image-container">
					<img src={image.srcs.small} alt={image.alt} width={240 * image.widthHeightRatio} />
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
			<input
				type="text"
				placeholder="Search images"
				bind:value={searchQuery}
				onkeydown={(event) => {
					if (event.key == "Enter") search();
				}}
			/>
			<select bind:value={searchSource}>
				<option value="commons">Wikimedia Commons</option>
				<option value="pexels">Pexels</option>
			</select>
			<button type="button" onclick={search}><MagnifyingGlass weight="bold" /></button>
		</div>

		<div class="images-container">
			{#if searching}
				Loading search results
			{:else if searchResults.length}
				{#each searchResults as image}
					<div class="image-container">
						<img src={image.srcs.small} alt={image.alt} width={240 * image.widthHeightRatio} />
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
				<span>No search results.</span>
				<span
					>Tip: If you have a specific image on Wikimedia Commons you want to use, use the url for
					its page as your search.</span
				>
			{/if}
		</div>
	</div>

	<input type="text" placeholder="Your name (optional)" name="author" />

	<input
		type="text"
		name="images"
		class="hidden"
		value={JSON.stringify(
			selectedImages.map((image) => [
				image.type,
				image.type == "commons" ? image.filename : image.id,
			]),
		)}
	/>
	<button disabled={disableForm}>Submit</button>
	<p class="error">{formResponse?.message}</p>
</form>

<AttributionDialog image={dialogImage} bind:this={dialog} />

<style>
	form {
		width: 100%;
	}

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

	.container input,
	.container select {
		background: #090811;
	}

	.images-container {
		margin: 8px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.no-images {
		text-align: center;
	}
</style>
