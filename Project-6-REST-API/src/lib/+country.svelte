<script>
    // Creates variables, along with the dispatcher for the delete button.
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    export let name = "", year = 0, population = 0, gdp = 0, oid = 0
</script>

<!-- Creates and Displays each of the country objects. -->
<div class="country-item">
    <button on:click={() => dispatch('delete')}>🗑️</button>
    <span> {oid}: {name} was founded in {year}. Now it has a population of {population}, with a GDP of ${gdp}. <a href={`/edit/${oid}`}>Edit</a> </span>
</div>