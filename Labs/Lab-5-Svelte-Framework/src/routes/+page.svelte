<script lang="ts">
	import type {IRecipeItem} from '../lib/RecipeItemTypes'
	import RecipeItem from '../components/RecipeItem.svelte'
	import { empty, null_to_empty } from 'svelte/internal';
	let recipeItems:IRecipeItem[] = []

	let name: string=''
	let value: number=0
	let units: string=''

	const addItem = () => {
		let i:number = recipeItems.length
		recipeItems[i] = ({name, units, value})
		name = ''
		value = 0
		units = ''
	}
	const deleteItem = (i:number) => {
		recipeItems.splice(i, 1)
		recipeItems = [...recipeItems]
	}


</script>

<h1>Lab 5: Svelte</h1>
<section>
	<div class="prose">
		<p>
			This week we'll begin learning about the <a href="https://svelte.dev">Svelte</a> framework.
		</p>
		<p>
			You can see that with Svelte a <code>page</code> is developed by creating a corresponding
			<code>.svelte</code> file. This one file contains typescript, html, and css. Your challenge this
			week is to implement the project you developed in HW4 using the svelte framework.
		</p>
	</div>
</section>

Value: <input type="number" bind:value={value}>
Units: <input bind:value={units}>
Name: <input bind:value={name}>
<button on:click={addItem}>Add</button>
<p/>
<div class="cntOutput">
	<ul>
	{#each recipeItems as rItem,i}
		<li><RecipeItem {...rItem} on:delete={()=>deleteItem(i)}/></li>
	{/each}
	</ul>
	<p/>
</div>
