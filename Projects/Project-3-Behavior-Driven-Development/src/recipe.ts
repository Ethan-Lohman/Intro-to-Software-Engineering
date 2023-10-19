import { SimpleDB } from "./simpledb"

export interface RecipeItem {
  name: string
  amount: number
  units: string
}

export interface RecipeErrors {
  [key: string]: string
}

export class Recipe {
  private ingredients: SimpleDB<RecipeItem>

  constructor() {
    this.ingredients = new SimpleDB<RecipeItem>()
  }

  addIngredient(name: string, amount: number, units: string) {
    const existIngredient = this.ingredients.getItem(name)
    if (existIngredient !== null) {
    throw new Error("The ingredient you are adding already exists.")
    }
    
    const newItem: RecipeItem = {name, amount, units}
    this.ingredients.setItem(name, newItem)
  }

  // Make a test for this.
  updateIngredient(name: string, newValue: Partial<RecipeItem>): void {
    const currIngred = this.ingredients.getItem(name)
    if (currIngred === null) {
      throw new Error("The ingredient you are updating doesn't exist.")
    }

    // Makes a copy of the ingredient that is being updated, along with the values replacing it.
    const newValues: RecipeItem = {...currIngred, ...newValue}
    this.ingredients.setItem(name, newValues)
  }

  deleteIngredient(name: string): void {
    const existingIngredient = this.ingredients.getItem(name)
    if (existingIngredient === null) {
    throw new Error("The ingredient you are deleting doesn't exist.")
    }
    this.ingredients.removeItem(name)
  }

  getIngredients(): RecipeItem[] {
    return this.ingredients.allItems()
  }

  numberOfIngredients(): number {
    return this.ingredients.length
  }
}