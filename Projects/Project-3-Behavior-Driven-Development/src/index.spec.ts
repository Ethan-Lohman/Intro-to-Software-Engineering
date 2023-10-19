import "@testing-library/jest-dom"

import {
  getByRole,
  findByText,
  getByPlaceholderText,
} from "@testing-library/dom"

import {
  createRecipeItem,
  getDataFromForm,
  countRenderedTableRows,
  redrawPage,
  deleteRecipeItem,
  renderPageHTML,
} from "."

import { RecipeItem, Recipe } from "./recipe"

describe("check basic UI functions", () => {
  let recipe: Recipe
  let newDiv: HTMLDivElement

  beforeEach(() => {
    recipe = new Recipe()
  })

  beforeAll(() => {
    newDiv = document.createElement("div")
    newDiv.innerHTML = "<div id='app'></div>"
    document.body.appendChild(newDiv)
  })

  it("should render in page", () => {
    redrawPage(newDiv, { recipe })
    expect(countRenderedTableRows(newDiv)).toBe(1)
  })

  it("should render multiple items in page", () => {
    recipe.addIngredient("milk", 1, "cup")
    redrawPage(newDiv, { recipe })
    expect(countRenderedTableRows(newDiv)).toBe(2)
  })

  // New Tests
  it("should render an item being deleted", () => {
    recipe.addIngredient("milk", 1, "cup")
    deleteRecipeItem(newDiv, recipe, "milk")
    redrawPage(newDiv, {recipe})
    expect(countRenderedTableRows(newDiv)).toBe(1)
  })
})

describe("Check recipe class methods", () => {
  let recipe: Recipe

  beforeEach(() => {
    recipe = new Recipe()
  })

  it("should accept new ingredients", () => {
    let oldNumber = recipe.numberOfIngredients()
    recipe.addIngredient("milk", 1, "cup")
    expect(recipe.numberOfIngredients()).toBe(oldNumber + 1)
  })

  it("should throw if you try to add an existing ingredient again", () => {
    recipe.addIngredient("milk", 1, "cup")
    expect(() => {
      recipe.addIngredient("milk", 1, "cup")
    }).toThrow()
  })

  it("should throw if you try to delete a missing ingredient", () => {
    expect(() => {
      recipe.deleteIngredient("milk")
    }).toThrow()
  })
})
