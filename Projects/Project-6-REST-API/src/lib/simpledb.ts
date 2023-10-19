import fs from 'fs'

export class SimpleDB<T> {
  private items: { [key: string]: T } = {}

  load(fname: string): void {
    try {
      this.items = JSON.parse(fs.readFileSync(fname).toString())
    } catch(err) {
      this.items = {}  // maybe there's no file here?
    }
  }

  store(fname:string): void {
    fs.writeFileSync(fname, JSON.stringify(this.items))
  }

  setItem(key: string, item: T): string {
    
    // modified setItem to generate a key if none provided.

    const keyValue = key.length > 0 ? key : this.generateKey()
    this.items[keyValue] = item
    return keyValue
  }

  public generateKey(): string {
    // generate a new random key
    let key: string
    do {
      key = Math.random().toString(36).slice(2)
    } while (Object.keys(this.items).indexOf(key) !== -1)
    return key
  }

  getItem(key: string): T | null {
    const val = this.items[key] // value could be undefined
    return val ? val : null // contract says return null if not found
  }

  removeItem(key: string): void {
    delete this.items[key]
  }

  updateItem(key: string, update: Partial<T>) {
    this.items[key] = { ...this.items[key], ...update }
  }

  clear(): void {
    this.items = {}
  }

  keys(): string[] {
    return Object.keys(this.items)
  }

  get length(): number {
    return this.keys().length
  }

  allItems(): T[] {
    return Object.values(this.items)
  }

  sort(
    predicate: (a: T, b: T) => number,
    limits: [number, number] | null = null
  ): T[] {
    const result = this.allItems().sort(predicate)
    if (limits) {
      return result.slice(limits[0], limits[1])
    }
    return result
  }

  filter(
    predicate: (item: T) => boolean,
    limits: [number, number] | null = null
  ): T[] {
    const result = this.allItems().filter(predicate)
    if (limits) {
      return result.slice(limits[0], limits[1])
    }
    return result
  }
}
