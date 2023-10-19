//
import { SimpleDB } from "./SimpleDB"

export interface GenericTObj {
  id:string
}

export interface IInventoriedItems extends GenericTObj{
  shelfId: string
  title: string
  quantity: number
  description: string
  price: number
}

export interface IShelf extends GenericTObj{
  storeId: string
  location: string
  tag: string
}
export interface IStore extends GenericTObj {
  address: string
  phone: string
}

abstract class AbstractTObjManager<T> {
  protected tdb: SimpleDB<T>

  constructor() {
    this.tdb = new SimpleDB<T>()
  }

  abstract add(aT: T): string | void
  abstract get(tid: string): T | undefined
  abstract rm(tid: string): void
  abstract count(): number
  abstract sort(
    fn: (aT: T, bT: T) => number
  ): T[]
  abstract filter(fn: (aT: T) => boolean): T[]
  abstract map(fn: (aT:T) => any): any[]
}

export class TObjManager<T extends GenericTObj> extends AbstractTObjManager<T>{
  constructor() {
    super()
  }

  add(aT: T): string | void{
    // add a simple object with no references/relations
    aT.id = this.tdb.set(aT.id, aT)
    return aT.id
  }

  get(tid: string): T | undefined {
    return this.tdb.get(tid)
  }

  rm(tid: string): void{
    this.tdb.delete(tid)
  }

  count(): number {
    return this.tdb.size()
  }

  sort(fn: (aT: T, bT: T) => number): T[] {
      return Array.from(this.tdb.values()).sort(fn)
  }

  filter(fn: (aT: T) => boolean): T[] {
      return Array.from(this.tdb.values()).filter(fn)
  }

  map(fn: (aT:T) => any): any[] {
    return this.tdb.values().map(fn)
  }
}

export class StoreManager extends TObjManager<IStore> {
  static ShelfManager: any
}

export class ShelfManager extends TObjManager<IShelf>{
  constructor( public storeManager:StoreManager) {
    super()
  }

  add(aT: IShelf) {
    throw new Error('You need to call addShelf with a storeID to add a shelf')
  }

  addShelf(aShelf: IShelf, aStore: IStore) {
    aShelf.storeId = aStore.id
    super.add(aShelf)
  }

  getStoreForShelf(shelfId:string): IStore | undefined {
    const theShelf = this.get(shelfId)
    if (theShelf) {
      return this.storeManager.get(theShelf.storeId)
    }
  }
}

export class InventoryManager extends TObjManager<IInventoriedItems> {
  constructor( public shelfManager:ShelfManager) {
    super()
  }

  add(aT: IInventoriedItems) {
    throw new Error('You need to call addShelf with a storeID to add a shelf')
  }

  addItem(aT: IInventoriedItems, aShelf: IShelf) {
    aT.shelfId = aShelf.id
    super.add(aT)
  }

  getShelfForItem(itemId:string) : IShelf | undefined {
    const theItem = this.get(itemId)
    if (theItem) {
      return this.shelfManager.get(theItem.shelfId)
    }
  }

  getStoreForItem(itemId:string): IStore | undefined {
    const theItem = this.get(itemId)
    if (theItem) {
      const theShelf = this.getShelfForItem(theItem.id)
      if (theShelf) {
        return this.shelfManager.getStoreForShelf(theShelf.id)
      }
    }
  }

  totalValueOfItemsOnShelf(aShelf: IShelf) {
    return this.filter((item) => item.shelfId===aShelf.id)
        .reduce((p,c) => p + c.quantity*c.price,0)
  }

  // Question 1's function
  removeItemFromShelf(itemID: string) {
    super.rm(itemID)
  }
}
