/*
 ** Class to represent a recipe
 */

 import type { DBObserver } from "./dbObserver"
import { SingleDB } from "./singledb"

 export interface RecipeItem {
   name: string
   amount: number
   units: string
   price: number
 }
 
 export interface RecipeErrors {
   [key: string]: string
 }
 
 export class Recipe {
   private ingredients: SingleDB<RecipeItem>
 
   constructor() {
     this.ingredients = SingleDB.getInstance<RecipeItem>()
   }

   subscribeObserver(ob:DBObserver<SingleDB<RecipeItem>, RecipeItem>) {
    this.ingredients.subscribe(ob)
   }
 
   addIngredient(name: string, amount: number, units: string, price:number) {
    this.ingredients.setItem(name, {name, amount, units, price});
 }
 
 
   updateIngredient(name: string, newValue: Partial<RecipeItem>): void {
     /*
      ** Update an ingredient with a new information.
      */
     const oldItem = this.ingredients.getItem(name)
     if (oldItem) {
        this.ingredients.setItem(name, {...oldItem, ...newValue})
     }
   }
 
   deleteIngredient(name: string): void {
     /*
      ** Pretty obvious. Delete the ingredient
      ** with the given name.
      **
      ** if the name doesn't exist, throw.
      */
      this.ingredients.removeItem(name)
   }
 
   getIngredients(): RecipeItem[] {
     /*
      ** return an Array of ingredients which
      ** should be simple objects.
      */
     return this.ingredients.allItems()
   }
 
   numberOfIngredients(): number {
     /*
      ** Return the number of ingredients in the Recipe.
      */
     return this.ingredients.length
   }
 }