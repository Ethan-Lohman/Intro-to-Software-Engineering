<script lang="ts">
    import {DBObserver} from "../lib/dbObserver"
 import type {SingleDB} from "../lib/singledb"
 import type {RecipeItem, Recipe} from "../lib/recipe"
 import {onMount} from "svelte"
 //import {GET} from "src/routes/api/[price]/+server"
 export let bRecipe: Recipe
 let price = 0.0
 let tax = 0.0

const fetchTax = async (price: number) => {
        try {
            const response = await fetch(`/api/${price}`);
            if (response.ok) {
                const data = await response.json();
                tax = data.tax;
            }
        } catch (error) {
            console.error("Failed to fetch tax:", error);
        }
    };


 const updatePrice = (prc:number) => {
    price = 0
    let ingredients = bRecipe.getIngredients()
    ingredients.forEach(n => {
        if (n.price) {
            price += n.price * n.amount
        }
    });
    fetchTax(price);
}

 let observer = new DBObserver<SingleDB<RecipeItem>, RecipeItem>((prc) => updatePrice(prc))
 
 onMount(() => {
     if (bRecipe) {
         bRecipe.subscribeObserver(observer)
     }
 })

</script>

<div>Subtotal Price : ${new Intl.NumberFormat().format(price)}</div>
<div>Total Tax : ${new Intl.NumberFormat().format(tax)}</div>
<div>Total Cost (including tax) : ${new Intl.NumberFormat().format(price + tax)}</div>
