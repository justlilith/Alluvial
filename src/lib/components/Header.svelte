<script lang='ts'>
	import * as State from '$lib/ts/state'
	import type { User } from '@supabase/gotrue-js';
	
	export let userData:User
	export let keysLockedOut:boolean
	
	let inputContent:string = ''
	
	const keypressCheck = async (event) => {
		// console.log(event)
		if (event.key.toLowerCase() == 'enter') {
			keysLockedOut = false
			inputContent = ''
		}
		
	}
</script>

<section id='header' on:click|preventDefault>
	<div id='submit'>
	</div>
</section>

<style lang='scss'>
	#header {
		background-color: black;
		border:none;
		color:purple;
		// width: 100%;
		// height: 2em;
		// background-color: theme.$primary;
		display:grid;
		// grid-template-columns: repeat(30px);
		grid-column: 7;
		grid-template-rows: auto;
		grid-template-columns: repeat(12, 1fr);
		grid-gap:1em;
		height:48px;
		// grid-auto-columns: min-content;
		min-width:200px;
		padding:1em;
		position:fixed;
		text-decoration: none;
		top:0;
		width:100%;
		z-index: 100;
	}
	button {
		vertical-align: middle;
		text-transform: uppercase;
	}
	.button-text {
		vertical-align: middle;
	}
	
	:global(.mdc-button--outlined:not(:disabled)) {
		color:cyan;
	}
</style>