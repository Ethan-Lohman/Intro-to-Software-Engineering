<script lang="ts">
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    export let name:string = ''
    export let units = ''
    export let amount = 0.0
    export let price = 0.0

</script>

<section class="menuRow">
<div class="cell">
    {name}
</div>
<div class="cell">
    {amount}
</div>
<div class="cell">
    {units}
</div>
<div class="cell">
    {price}
</div>
<div class="cell">
<button on:click={() => dispatch('delete')}>x</button>
</div>
</section>

<style>
    section {
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .cell {
        padding: 5px;
        font-size: 1.5rem;
    }
</style>
