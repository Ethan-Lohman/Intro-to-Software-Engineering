<script lang="ts">
	// Creates the variables and dispatcher.
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    export let name = "", year = 0, population = 0, gdp = 0, oid: number = 0, buttonText: string = '✏️'
</script>

<!-- A form to get the input for adding countries. -->
<h1>Country List</h1>
<section>
	<form on:submit|preventDefault={() => {dispatch('submit', {name, year, population, gdp, oid}) 
	oid = oid + 1}}>
		<p>
			ID: <input name="oid" type="number" readonly placeholder="oid" bind:value={oid}/>
			Name: <input name="name" placeholder="Name" bind:value={name}/>
			Year Founded: <input name="year" placeholder="Year Founded" bind:value={year}/>
			Population: <input name="population" type="number" placeholder="Population" bind:value={population}/>
			GDP: $<input name="gdp" type="number" placeholder="GDP" bind:value={gdp}/>
			<input value={buttonText} type="submit"/>
		</p>
	</form>
</section>