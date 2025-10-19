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
	<a href="/">Guess a message</a> <span class="bullet">•</span>
	<a href="/new">Create a new message</a>
</header>

{@render children?.()}

<footer>
	Free images from <a href="https://commons.wikimedia.org/wiki/Main_Page" target="_blank"
		>Wikimedia Commons</a
	>
	and
	<a href="https://www.pexels.com/" target="_blank">Pexels</a>
	<span class="bullet">•</span>
	View the source code on my
	<a href="https://github.com/shock59/photo-messaging" target="_blank">GitHub</a>
</footer>

<style>
	header,
	footer {
		width: calc(100% - 32px);
		padding: 16px;
		background: #110f1b;
		text-align: center;
	}

	footer {
		margin-top: auto;
	}

	.bullet {
		color: #ffffff35;
	}
</style>
