import { defineFeature, loadFeature } from "jest-cucumber"

import {
  StoreManager,
  ShelfManager,
  InventoryManager,
  IStore,
  IShelf,
  IInventoriedItems,
} from "../src/InventoryClasses"

import { storeData, shelfData, inventoryData } from "../src/testData"

const feature = loadFeature("features/inventory.feature")

defineFeature(feature, (test) => {
  let storeDB: StoreManager
  let shelfDB: ShelfManager
  let itemDB: InventoryManager

  beforeEach(() => {
    storeDB = new StoreManager()
    shelfDB = new ShelfManager(storeDB)
    itemDB = new InventoryManager(shelfDB)
  })

  test("Adding items to a shelf", ({ given, and, when, then }) => {
    let aStore: IStore = { ...storeData[0] }
    let aShelf: IShelf = { ...shelfData[0] }
    let theTitle = ""

    given("I have a store", () => {
      storeDB.add(aStore)
    })

    and("given I have a shelf in that store", () => {
      shelfDB.addShelf(aShelf, aStore)
    })

    when(
      /^I add an item to that shelf with data (.*) (.*) (.*) (.*)$/,
      (title, quantity, description, price) => {
        theTitle = title // save the title to check
        itemDB.addItem(
          {
            id: "",
            shelfId: "",
            title: title,
            quantity: parseInt(quantity),
            description: description,
            price: parseFloat(price),
          },
          aShelf
        )
      }
    )

    then("I should have added that item to the shelf", () => {
      const found = itemDB.filter((item) => item.title === theTitle)
      expect(found.length).toBe(1)
    })
  })

  test("Total cost should be calculated correctly", ({ given, when, then }) => {
    let aStore: IStore = { ...storeData[0] }
    let aShelf: IShelf = { ...shelfData[0] }
    let totalCost: number = 0
    let compareCost: number = 0

    given(
      "I have previously created an inventory with these contents:",
      (table) => {
        storeDB.add(aStore)
        shelfDB.addShelf(aShelf, aStore)

        compareCost = 0

        table.forEach((item: any) => {
          const theItem = {
            id: "",
            shelfId: "",
            title: item.title,
            quantity: parseInt(item.quantity),
            description: item.description,
            price: parseFloat(item.price)
          }
          itemDB.addItem(theItem, aShelf)
          compareCost += parseFloat(item.price) * parseInt(item.quantity)
        })
      }
    )

    when("I compute the total cost", () => {
      totalCost = itemDB.totalValueOfItemsOnShelf(aShelf)
    })

    then("it should be calculated correctly", () => {
      expect(totalCost).toBeCloseTo(compareCost)
    })
  })

  // Questions 2's test
  test("Inventory should be sorted descending by price", ({ given, when, then }) => {
    let aStore: IStore = { ...storeData[0] }
    let aShelf: IShelf = { ...shelfData[0] }
    let sorted: any

    given(
      "I have previously created an inventory with these contents:",
      (table) => {
        storeDB.add(aStore)
        shelfDB.addShelf(aShelf, aStore)

        table.forEach((item: any) => {
          const theItem = {
            id: "",
            shelfId: "",
            title: item.title,
            quantity: parseInt(item.quantity),
            description: item.description,
            price: parseFloat(item.price)
          }
          itemDB.addItem(theItem, aShelf)
        })
      }
    )

    when("I sort the items by price", () => {
      sorted = itemDB.sort((a, b) => {return b.price - a.price})
    })

    then("it should been sorted by price descending, [3.4, 2.5]", () => {
      expect(sorted.map((a: IInventoriedItems)=>{return a.price})).toStrictEqual([3.4, 2.5])
    })
  })

  // Questions 2's test
  test("Inventory should be give the right count.", ({ given, when, then }) => {
    let aStore: IStore = { ...storeData[0] }
    let aShelf: IShelf = { ...shelfData[0] }
    let count: number = 0

    given(
      "I have previously created an inventory with these contents:",
      (table) => {
        storeDB.add(aStore)
        shelfDB.addShelf(aShelf, aStore)

        table.forEach((item: any) => {
          const theItem = {
            id: "",
            shelfId: "",
            title: item.title,
            quantity: parseInt(item.quantity),
            description: item.description,
            price: parseFloat(item.price)
          }
          itemDB.addItem(theItem, aShelf)
        })
      }
    )

    when("I count the amount in the inventory.", () => {
      count = itemDB.count()
    })

    then("it should be the right size.", () => {
      expect(count).toBe(2)
    })
  })

})
