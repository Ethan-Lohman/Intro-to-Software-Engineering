export class SimpleDB<T> {
  private items: { [key: string]: T } = {}
  
  // assign an item to a key
  setItem(key: string, item: T): void {
    this.items[key] = item
  }

  // get the item for a key
  getItem(key: string): T | null {
    if (this.items[key] != null) {
    let itemFound: T
    itemFound = this.items[key]
    return itemFound
    } else {
      return null
    }
  }

  // delete an item associated with a key
  removeItem(key: string): void {
    delete this.items[key]
  }

  // clear all items
  clear(): void {
    this.items = {}
  }

  // return all the keys
  keys(): string[] {
    return Object.keys(this.items)
  }

  // get the number of items
  get length(): number {
    return Object.keys(this.items).length
  }

  // return all the items in a list
  allItems(): T[] {
    return Object.values(this.items)
  }

  // return a sorted list of items based on a comparison function
  // if limits is not null, start and end indices are provided
  sort(
    compare: (a: T, b: T) => number,
    limits: [number, number] | null = null
  ): T[] {
    let sortItems = this.allItems()
    sortItems.sort(compare)

    if (limits != null) {
      const [start, end] = limits
      sortItems = sortItems.slice(start, end)
    }
    return sortItems
  }

  // return a filtered list based on a predicate function
  // if limits is not null, start and end indices are provided
  filter(
    predicate: (item: T) => boolean,
    limits: [number, number] | null = null
  ): T[] {
    let unfilteredItems = this.allItems()
    let filteredItems: any = []

    if (limits != null) {
      const [start, end] = limits
      unfilteredItems = unfilteredItems.slice(start, end+1)
    }

    for (let i = 0; i < unfilteredItems.length; i++) {
    if (predicate(unfilteredItems[i]) == true) {
      filteredItems.push(unfilteredItems[i])
    }
  }
    return filteredItems
  }
  
  // Takes a predicate function and deletes the id's that comes back true.
  deleteItems(predicate: (item: T) => boolean): void {
    const toDelete: string[] = []; // Creates an empty array of strings

    // If the predicate is true meaning it should be delete, it pushes the 'row' to the array.
    for (const key in this.items) {
      if (predicate(this.items[key])) {
        toDelete.push(key)
      }
    }

    // Then it will delete each 'row' that is in the array.
    toDelete.forEach((key) => {
      delete this.items[key]
    })
  }

  // Allows the use of updating certain keys in the database.
  updateItems( predicate: (item: T) => boolean, fromObject: Partial<T> ): void {
    let db = this.allItems()

    // Loops through the database, sees if the attribute it is on should be updated,
    // If it should be updated it will loop through each key in the fromObject.
    // To which it will update the part of the object that needs updated.
    for (let i = 0; i < db.length; i++) {
      if (predicate(db[i])) {
        for (const key in fromObject) {
          db[i][key as keyof T] = fromObject[key] as T[keyof T]
        }
      }
    }
  }

  // Turns the database into a text file for readability.
  getStringRep(): string {
    return JSON.stringify(this.items)
  }

  // Gets an input of a text file, and clears the previous database.
  // Then parses it in the newly created object parsedData, which matches the format of items.
  // Finally it will set the database to the new one.
  setStringRep(input: string): void {
    this.clear()
    const parsedData: {[key: string]: T} = JSON.parse(input)
    this.items = parsedData
  }
}
