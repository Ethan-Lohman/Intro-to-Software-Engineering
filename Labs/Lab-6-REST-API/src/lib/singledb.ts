/*
 ** A singleton DB that can be observed
 */

import { SimpleDB } from "./simpledb"
import type { IDb, IObserver } from "./dbObserver"

export class SingleDB<T> extends SimpleDB<T> implements IDb<SimpleDB<T>, T> {
  private static _singleton: unknown
  private observers: IObserver<SimpleDB<T>,T>[]

  constructor() {
    super()
    this.observers = []
  }

  setItem(key: string, item: T): void {
      super.setItem(key, item)
      this.notify()
  }

  removeItem(key: string): void {
      super.removeItem(key)
      this.notify()
  }

  static getInstance<T>(): SingleDB<T> {
    if (!this._singleton) {
      this._singleton = new SingleDB<T>()
      return this._singleton as SingleDB<T>
    } else {
      return this._singleton as SingleDB<T>
    }
  }

  subscribe(observer: IObserver<SimpleDB<T>,T>) {
    this.observers.push(observer)
    observer.notify(this)
  }

  unsubscribe(observer: IObserver<SimpleDB<T>,T>) {
    this.observers = this.observers.filter(o => o !== observer)
  }

  notify() {
    console.log("notify called")
    this.observers.forEach(o => o.notify(this))
  }
  
}
