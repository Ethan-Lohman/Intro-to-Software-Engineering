<script lang="ts">
   	import {DBObserver} from "../lib/dbObserver"
	import type {SingleDB} from "../lib/singledb"
    import type {RecipeItem, Recipe} from "../lib/recipe"
    import {onMount} from "svelte"

    export let aRecipe:Recipe | null = null

    let count=0

    const updateCount = (cnt:number) => {
		count = cnt
	}

    let observer = new DBObserver<SingleDB<RecipeItem>, RecipeItem>((cnt) => updateCount(cnt))
    
    onMount(() => {
        if (aRecipe) {
            aRecipe.subscribeObserver(observer)
        }
    })

</script>


<div>Number of items: {count}</div>
