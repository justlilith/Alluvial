<script lang='ts'>
	import { onMount } from 'svelte'
	
	import Header from '$lib/components/Header.svelte'
	import AuthMenu from '$lib/components/AuthMenu.svelte'
	import Statusbar from '$lib/components/Statusbar.svelte'
	
	import * as Helpers from '$lib/ts/helpers'
	import * as Auth from '$lib/ts/auth'
	import type { Session, User } from '@supabase/gotrue-js';
	
	let appStorage:Storage
	
	let loggedIn = false
	let userData: User = null
	let sessionData: Session = null
	
	onMount( async () => {
		Auth.authStore.subscribe(async (update) => {
			loggedIn = update.loggedIn
			userData = update.userData
			sessionData = update.sessionData
			if (loggedIn) {
				console.log('did fetch')
			}
		})
		
		loggedIn = await Auth.authCheck()
		
		appStorage = window.localStorage
		
		if (loggedIn == false) {
		}
	})
	
	let keysLockedOut = false
	
</script>

<svelte:head>
<title>Alluvial</title>
<!-- p5.js -->
<!-- <script type='text/javascript' src="/p5/p5.js"></script> -->
<script type='text/javascript' async src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js"></script>
<script type='text/javascript' async src="/p5/sketch.js"></script>
</svelte:head>

<svelte:window
on:keydown="{(event) => {
	if (keysLockedOut == false) {
		//keyboard shortcuts
		// Helpers.handleKeypress({userData, event})
	}
}}"
/>



<main>	
	<!-- <Header bind:keysLockedOut bind:userData></Header> -->
	<!-- <AuthMenu bind:keysLockedOut></AuthMenu> -->
	<section id="p5Canvas" class='p5Canvas'></section>
	<Statusbar></Statusbar>
</main>



<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0;
	}
	
	#p5Canvas {
		width: 100%;
		height: 100%;
		position: absolute;
		/* top: 48px; */
		background-color: hsl(200, 10%, 10%);
		/* overflow:scroll */
	}
	
	h1 {
		color: cyan;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		padding:10%;
	}
	
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
