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

    if (limits !== null) {
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
    return []
  }
}
