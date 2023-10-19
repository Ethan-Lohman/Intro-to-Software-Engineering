import { defineFeature, loadFeature } from "jest-cucumber"
import { Recipe } from "../src/recipe"
import { redrawPage } from "../src/."
import userEvent from "@testing-library/user-event"

const feature = loadFeature("features/recipe.feature")

function TypeAndClick(
  el: HTMLElement,
  nameString: string,
  amountString: string,
  unitsString: string
): void {
  // utility method that accepts three input strings, fills in the corresponding
  // input fields from the HTML Input Elements, and then clicks the "Submit" button.

  const nameField = el.querySelector("#name") as HTMLInputElement
  const amountField = el.querySelector("#amount") as HTMLInputElement
  const unitsField = el.querySelector("#units") as HTMLInputElement
  const addButton = el.querySelector("#add-item-button") as HTMLButtonElement

  nameString && userEvent.type(nameField, nameString)
  amountString && userEvent.type(amountField, amountString)
  unitsString && userEvent.type(unitsField, unitsString)

  userEvent.click(addButton)
}

defineFeature(feature, (test) => {
  let recipe: Recipe
  let newDiv: HTMLDivElement

  beforeEach(() => {
    recipe = new Recipe()
    redrawPage(newDiv, { recipe })
  })

  beforeAll(() => {
    newDiv = document.createElement("div")
    newDiv.innerHTML = "<div id='app'></div>"
    document.body.appendChild(newDiv)
  })

  test("Adding valid data", ({ given, when, then }) => {
    given("I hope to be able to add items to the recipie", () => {})

    when(
      /^I enter valid data (.*), (.*), (.*)$/,
      (nameString, amountString, unitsString) => {
        TypeAndClick(newDiv, nameString, amountString, unitsString)
      }
    )

    then("I should have added an item to the recipe", () => {
      expect(recipe.numberOfIngredients()).toBe(1)
    })
  })

  test("Invalid/missing data", ({ given, when, then }) => {
    given("I need to reject invalid data", () => {})

    when(
      /^I enter invalid data (.*), (.*), (.*)$/,

      (nameString, amountString, unitsString) => {
        TypeAndClick(newDiv, nameString, amountString, unitsString)
      }
    )

    then("I should have added no items to the recipe", () => {
      expect(recipe.numberOfIngredients()).toBe(0)
    })
  })

  test("Adding an item with no name", ({ given, when, then }) => {
    given("I don't want to retype everything", () => {})

    when("I enter an invalid name", () => {
      TypeAndClick(newDiv, "", "1", "g")
    })

    then("The form should be refreshed, keeping my good data", () => {
      const amountField = newDiv.querySelector("#amount") as HTMLInputElement
      expect(amountField.value).toBe("1")

      const unitsField = newDiv.querySelector("#units") as HTMLInputElement
      expect(unitsField.value).toBe("g")
    })
  })

  test("Adding an item with no amount", ({ given, when, then }) => {
    given("I don't want to retype everything", () => {})

    when("I enter an invalid amount", () => {
      TypeAndClick(newDiv, "eggs", "", "g")
    })

    then("The form should be refreshed, keeping my good data", () => {
      const nameField = newDiv.querySelector("#name") as HTMLInputElement
      expect(nameField.value).toBe("eggs")

      const unitsField = newDiv.querySelector("#units") as HTMLInputElement
      expect(unitsField.value).toBe("g")
    })
  })

  test("Adding an item with no units", ({ given, when, then }) => {
    given("I don't want to retype everything", () => {})

    when("I enter an invalid units", () => {
      TypeAndClick(newDiv, "eggs", "1", "")
    })

    then("The form should be refreshed, keeping my good data", () => {
      const nameField = newDiv.querySelector("#name") as HTMLInputElement
      expect(nameField.value).toBe("eggs")

      const amountField = newDiv.querySelector("#amount") as HTMLInputElement
      expect(amountField.value).toBe("1")
    })
  })

  test("Should show error notification on bad data", ({
    given,
    when,
    then,
  }) => {
    given("I need hints about invalid data", () => {})

    when("I enter a bad amount", () => {
      TypeAndClick(newDiv, "eggs", "x", "ea")
    })

    then("I should see an error message", () => {
      const errorSpan = newDiv.querySelector(
        "#amount-required-error"
      ) as HTMLElement
      expect(errorSpan).toBeVisible()
    })
  })

  test("Should throw if item isn't in recipe", ({ given, when, then }) => {
    let func: () => void
    given("I need to remove an item", () => {})

    when("I remove an item that isn't in the recipe", () => {
      func = () => recipe.deleteIngredient("foo")
    })

    then("It should throw", () => {
      expect(func).toThrow()
    })
  })

  // New Tests
  test("Should update sugar", ({ given, when, then }) => {
    given("I need to update the amount of sugar", () => {})
      // recipe.addIngredient("Zugar", 1, "tsp") --> I am confused on how the ingredient is added even when I don't type this in?
    when(
      /^I update sugar's (\d+) to (\d+)$/,
      (amountString, updateString) => {
        const toUpdate = {amount: parseInt(updateString)}
        TypeAndClick(newDiv, "Zugar", amountString, "tsp") // I believe it is this but, I don't understand.
        recipe.updateIngredient("Zugar", toUpdate)
      }
    )

    then(/^It should change the amount from (\d+) to (\d+)$/, (arg0, arg1) => {
      expect(recipe.getIngredients()).toStrictEqual([{"amount": parseInt(arg1), "name": "Zugar", "units": "tsp"}])
    })
  })

  // A test for throwing when updating an item.
  test("Should throw when updating an item that doesn't exist", ({ given, when, then }) => {
    let func: () => void
    given("I need to update an item", () => {})
      
    when("That item doesn't exist", () => {
        const toUpdate = {amount: 10}
        func = () => recipe.updateIngredient("Zugar", toUpdate)
      }
    )

    then("It should throw", () => {
      expect(func).toThrow()
    })
  })

  // A test of deleting
  test("Should delete an item", ({ given, when, then }) => {
    given(/^I need to delete (.*)$/, (nameString) => {
      recipe.addIngredient(nameString, 1, "tsp")
    })
    when(/^I delete (.*)$/,
      (nameString) => {
        recipe.deleteIngredient(nameString)
      }
    )
    then("sugar is gone", () => {
      expect(recipe.numberOfIngredients()).toBe(0)
    })
  })
})
