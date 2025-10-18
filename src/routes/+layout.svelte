<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../style.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>Photo Messaging</title>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Andika:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header>
	<a href="/">Explore messages</a> •
	<a href="/new">Create a new message</a>
</header>
{@render children?.()}

<style>
	header {
		width: calc(100% - 32px);
		padding: 16px;
		background: #110f1b;
		color: #ffffff35;
		text-align: center;
	}
</style>
