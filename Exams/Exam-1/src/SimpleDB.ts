export class SimpleDB<T> {
  private db: Map<string, T>

  constructor() {
    this.db = new Map() // Map is essentially a dictionary like object for key-value pairs
  }

  public get(key: string): T | undefined {
    return this.db.get(key)
  }

  public set(key: string, value: T): string {
    if (key.length > 0) {
      this.db.set(key, value)
    } else {
      key = this.generateKey()
      this.db.set(key, value)
    }
    return key
  }

  public generateKey(): string {
    // generate a new random key
    let key: string
    do {
      key = Math.random().toString(36).slice(2)
    } while (this.db.has(key))
    return key
  }

  public delete(key: string): void {
    this.db.delete(key)
  }

  public has(key: string): boolean {
    return this.db.has(key)
  }

  public clear(): void {
    this.db.clear()
  }

  public size(): number {
    return this.db.size
  }

  public keys(): string[] {
    return Array.from(this.db.keys())
  }

  public values(): T[] {
    return Array.from(this.db.values())
  }
}
