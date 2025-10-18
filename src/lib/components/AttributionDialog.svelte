<script lang="ts">
	const { image }: { image: ServiceImage | undefined } = $props();

	let dialog: HTMLDialogElement;
	export function show() {
		dialog.showModal();
	}
</script>

<dialog bind:this={dialog}>
	{#if image}
		<div class="image-container">
			{#key image}<img src={image.srcs.large} alt={image.alt} />{/key}
		</div>
		<div>{image.alt}</div>
		<div class="attribution">
			Attribution: <a href={image.attribution.href} target="_blank">{image.attribution.text}</a>
		</div>
	{/if}

	<form method="dialog">
		<button>Close</button>
	</form>
</dialog>

<style>
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
