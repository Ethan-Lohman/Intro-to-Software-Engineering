<script>
	// Creates the variables and dispatcher.
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    export let name = "", year = 0, population = 0, gdp = 0
</script>

<!-- A form to get the input for adding countries. -->
<h1>Country List</h1>
<section>
	<form on:submit|preventDefault={() => dispatch('add', {name, year, population, gdp})}>
		<p>
			Name: <input name="name" placeholder="Name" bind:value={name}/>
			Year Founded: <input name="year" placeholder="Year Founded" bind:value={year}/>
			Population: <input name="population" type="number" placeholder="Population" bind:value={population}/>
			GDP: $<input name="gdp" type="number" placeholder="GDP" bind:value={gdp}/>
			<button type="submit">✏️</button>
		</p>
	</form>
</section>