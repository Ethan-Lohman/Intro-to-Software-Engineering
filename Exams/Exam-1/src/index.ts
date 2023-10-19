import {
  StoreManager,
  IStore,
  ShelfManager,
  IShelf,
  InventoryManager,
  IInventoriedItems
} from "./InventoryClasses"

import {storeData, shelfData, inventoryData} from './testData'

let storeIds: string[] = []
let storeDB = new StoreManager()
let shelfDB = new ShelfManager(storeDB)
let itemDB = new InventoryManager(shelfDB)

storeData.forEach((item:IStore) => {
  const theId = storeDB.add(item)
  if (theId) {
    storeIds.push(theId)
  }
})

console.log(`we have ${storeDB.count()} stores.`)

const addresses: string[] = storeDB.map((a:IStore)=> a.address)
console.log(`Store Addresses: ${addresses}.`)

const aStore = storeDB.get(storeIds[0])

if (aStore) {
  shelfData.forEach((item:IShelf) => {
    const theId = shelfDB.addShelf(item, aStore)
  })
}

console.log(`We have ${shelfDB.count()} shelves in store ${aStore?.address}.`)

const shelfIds = shelfDB.map(shelf => shelf.id)
const locations = shelfDB.map(shelf => shelf.location)

console.log(`At locations: ${locations}.`)

const aShelf = shelfDB.get(shelfIds[0])
if (aShelf) {
  inventoryData.forEach((item:IInventoriedItems) => {
    const theId = itemDB.addItem(item, aShelf)
  })
}

console.log(`We have ${itemDB.count()} items on shelf at location ${aShelf?.location}.`)


