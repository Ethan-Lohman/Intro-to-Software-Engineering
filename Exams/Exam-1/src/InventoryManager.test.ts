import {
  StoreManager,
  ShelfManager,
  InventoryManager,
  IStore,
  IShelf,
  IInventoriedItems
} from "./InventoryClasses"

import {storeData, shelfData, inventoryData} from './testData'

describe("Basic Inventory Manager Testing", () => {
  it("should create a store manager", () => {

    const aStoreDB = new StoreManager()

    expect(aStoreDB).not.toBeNull()
  })

  it ("should be able to create multiple stores", () => {
    const aStoreDB = new StoreManager()
    const storeIds:string[] = []

    storeData.forEach((item:IStore) => {
      const theId = aStoreDB.add(item)
      if (theId) {
        storeIds.push(theId)
      }
    })
    expect(storeIds.length).toEqual(storeData.length)
  })

  it ("should be able to find the store where an item is located", () => {
    const aStoreDB = new StoreManager()
    const aShelfDB = new ShelfManager(aStoreDB)
    const anItemDB = new InventoryManager(aShelfDB)

    const aStore = {...storeData[0]}
    const aShelf = {...shelfData[0]}
    const anItem = {...inventoryData[0]}

    aStoreDB.add(aStore)
    aShelfDB.addShelf(aShelf, aStore)
    anItemDB.addItem(anItem, aShelf)

    const myStore = anItemDB.getStoreForItem(anItem.id)
    expect(myStore?.address).toEqual(aStore.address)
  })

  // Questions 2's test
  it ("should throw when trying to add an item, and shelf.", () => {
    const aStoreDB = new StoreManager()
    const aShelfDB = new ShelfManager(aStoreDB)
    const anItemDB = new InventoryManager(aShelfDB)

    const aStore = {...storeData[0]}
    const aShelf = {...shelfData[0]}
    const anItem = {...inventoryData[0]}

    aStoreDB.add(aStore)

    let funcToThrow: () => void
    funcToThrow = () => anItemDB.add(anItem)
    expect(funcToThrow).toThrow()

    let funcToThrow2: () => void
    funcToThrow2 = () => aShelfDB.add(aShelf)
    expect(funcToThrow2).toThrow()
  })

  // Question 1's test
  it ("should be able remove an item from a shelf", () => {
    const aStoreDB = new StoreManager()
    const aShelfDB = new ShelfManager(aStoreDB)
    const anItemDB1 = new InventoryManager(aShelfDB)
    const anItemDB2 = new InventoryManager(aShelfDB)
    const anItemDB3 = new InventoryManager(aShelfDB)

    const aStore = {...storeData[0]}
    const aShelf = {...shelfData[0]}
    const anItem = {...inventoryData[0]}

    aStoreDB.add(aStore)
    aShelfDB.addShelf(aShelf, aStore)
    anItemDB1.addItem(anItem, aShelf)
    anItemDB2.addItem(anItem, aShelf)
    anItemDB3.addItem(anItem, aShelf)
    anItemDB2.removeItemFromShelf(anItem.id)

    expect(anItemDB1.count()+anItemDB2.count()+anItemDB3.count()).toEqual(2)
  })
})
