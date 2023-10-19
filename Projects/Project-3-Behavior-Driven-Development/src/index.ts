import { RecipeItem, Recipe, RecipeErrors } from "./recipe"

const theRecipe = new Recipe()

theRecipe.addIngredient("milk", 1, "cup")
theRecipe.addIngredient("sugar", 3, "tbsp")

export function validateRecipeItem(item: RecipeItem): RecipeErrors {
  const errors: RecipeErrors = {}
  if (!item.name) {
    errors.name = "Name is required"
  }
  if (!item.amount) {
    errors.amount = "Amount is required"
  }
  if (!item.units) {
    errors.units = "Units are required"
  }
  return errors
}

export function createRecipeItem(
  el: HTMLElement = document.body,
  recipe: Recipe = theRecipe
): void {
  let rItem: RecipeItem = getDataFromForm(el)
  const errors = validateRecipeItem(rItem)
  if (Object.keys(errors).length === 0) {
    recipe.addIngredient(rItem.name, rItem.amount, rItem.units)
    rItem = {} as RecipeItem
  }
  redrawPage(el, { errors, formVals: rItem, recipe })
}

export function getDataFromForm(el: HTMLElement): RecipeItem {
  const name = el.querySelector("#name") as HTMLInputElement
  const amount = el.querySelector("#amount") as HTMLInputElement
  const units = el.querySelector("#units") as HTMLInputElement
  return {
    name: name.value,
    amount: parseFloat(amount.value),
    units: units.value,
  }
}

export function countRenderedTableRows(el: HTMLElement) {
  // how many rows are present?
  const table = el.querySelector("#recipe-items") as HTMLTableElement
  return table.rows.length
}

interface redrawPageParams {
  errors?: RecipeErrors
  recipe?: Recipe
  formVals?: Partial<RecipeItem>
}

export function redrawPage(
  el: HTMLElement,
  { errors = {}, recipe = theRecipe, formVals = {} }: redrawPageParams = {}
) {
  // redraw and re-attach listeners.
  let div = el.querySelector("#app") as HTMLElement
  if (!div) {
    div = el // if it doesn't contain #app, then it is the element itself.
  }
  div.innerHTML = renderPageHTML(recipe, errors, formVals)
  const submitButton = div.querySelector(
    "#add-item-button"
  ) as HTMLButtonElement
  submitButton.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault()
    createRecipeItem(div, recipe)
  })
  for (let i in recipe.getIngredients()) {
    const name = recipe.getIngredients()[i].name
    const delButton = div.querySelector(`#del-button-${i}`) as HTMLButtonElement
    delButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault()
      deleteRecipeItem(div, recipe, name)
    })
  }
}

export function deleteRecipeItem(
  el: HTMLElement = document.body,
  recipe: Recipe = theRecipe,
  name: string
) {
  recipe.deleteIngredient(name)
  redrawPage(el)
}

export function renderPageHTML(
  recipe: Recipe = theRecipe,
  errors: RecipeErrors = {},
  formVals: Partial<RecipeItem> = {}
) {
  //
  // Renders the HTML for the page
  //

  const rows = [] as string[]

  const numItems = recipe.numberOfIngredients()
  const name = formVals.name || ""
  const amount = formVals.amount || ""
  const units = formVals.units || ""

  const html1 = `
  <h1>Recipe (${numItems} items)</h1>
  <div class="container">
  <div class="inside">
    <table class="recipe-table" id="recipe-items">
    <tr><th>Name</th><th>Amount</th><th>Units</th><th>delete</th></tr>
    `

  const html2 = `
    </table></div></div>
    `

  const ingredients = recipe.getIngredients()

  for (let i in ingredients) {
    let rItem = ingredients[i]
    rows.push(`<tr>
    <td>${rItem.name}</td>
    <td>${rItem.amount}</td>
    <td>${rItem.units}</td>
    <td><button id="del-button-${i}"/>del</button>
    </tr>`)
  }

  const html3 = `
  <br/>
  <div />
  <div class="form">
  <div class="form-group">
  <form name="ItemInput" id="input-form">
  <div><label for="name">Name:</label>
  <span id='name-required-error' class="errorHint" style="display:${
    errors.name ? "inline" : "none"
  };">Name Required</span>
  </div>
  <div><input type="text" id="name" value="${name}"/></div>
  <div><label for="amount">Amount:</label>
  <span id='amount-required-error' class="errorHint" style="display:${
    errors.amount ? "inline" : "none"
  };">Valid Amount Required</span></div>
  <div><input type="text" id="amount" value="${amount}"/></div>
  <div><label for="unit">Unit:</label>
  <span id='units-required-error' class="errorHint" style="display:${
    errors.units ? "inline" : "none"
  };">Units Required</span>
  </div>
  <div><input type="text" id="units" value="${units}"/></div>
  <div><input type="submit" id="add-item-button" value="Submit"/></div>
  </form></div>
  </div>
  `
  return html1 + rows.join("\n") + html2 + html3
}

redrawPage(document.body)
