
<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    export let name=''
    export let units=''
    export let value=0
  </script>
  
  <div class="shopping-item">
    <button on:click={() => dispatch('delete')}>X</button>
    <span> {name} {value} {units} </span>
</div>


