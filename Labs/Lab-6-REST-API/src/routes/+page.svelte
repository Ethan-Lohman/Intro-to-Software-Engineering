<script lang="ts">
	import {Recipe} from "../lib/recipe"
	import RecipeItemDisplay from "../components/RecipeItemDisplay.svelte"
	import RecipeCountDisplay from "../components/RecipeCountDisplay.svelte"
	import {onMount} from 'svelte'
	import RecipeTotalCostDisplay from "/workspaces/202310-lab-6-lab-6-ethan-and-cole/src/components/RecipeTotalCostDisplay.svelte";
	let theRecipe = new Recipe()
	theRecipe.addIngredient("milk", 3, "cups", 9.3)
	theRecipe.addIngredient("eggs", 2,"ea", 1.2)

	let theIngredients = theRecipe.getIngredients()
	
	let amount : number | string =''
	let name=''
	let units=''
	let amountField:HTMLInputElement;
	let price : number

	const handleDelete = (i:number) => {
		theRecipe.deleteIngredient(theIngredients[i].name)
		theIngredients = theRecipe.getIngredients()
	}

	const addItem = () => {
		if (typeof amount === "number") {
			theRecipe.addIngredient(name, amount, units, price)
			theIngredients = theRecipe.getIngredients()
		}
		amount = ''
		name = ''
		units = ''
		amountField.focus()
	}
export let json
	onMount(async ()=>{
		let result = await fetch('/api')
		json = await result.json()
	})

</script>

<h1>Lab 6: SvelteKit</h1>
<section>
	<div class="prose">
		<p>
			A Svelte App with a server side interaction
		</p>
	</div>
</section>

<div class="recipeForm">
	<form on:submit|preventDefault={() => addItem()}>
		<label for="amount">Amount:</label><br>
		<input type="number" id="amount" name="amount" bind:value={amount} bind:this={amountField}><br>
		<label for="units"> Units:</label><br>
		<input type="text" id="units" name="units" bind:value={units}><br>
		<label for="name"> Name:</label><br>
		<input type="text" id="name" name="name" bind:value={name}><br> 
		<label for="price">Price:</label><br>
		<input type="number" id="price" name="price" bind:value={price}><br><br>
		<input type="submit" value="add item">
	</form>		
</div>
<p/>

<div class="recipeDisplay">
	{#each theIngredients as item,i}
		{#if item}
			<RecipeItemDisplay {...item} on:delete={()=>handleDelete(i)}/>
		{/if}
	{/each}
</div>
<div class="ingredientCount">
	<RecipeCountDisplay aRecipe={theRecipe}/>
</div>
<div class="ingredientCost">
	<RecipeTotalCostDisplay bRecipe={theRecipe}/>
</div>

<style>
	.recipeDisplay {
		width:50%;
		border: 1px solid blue;
		padding: 10px;
	}

	.ingredientCount {
		font-size: 1.5rem;
		padding: 3px;
		margin: 2px;
	}
	
</style>