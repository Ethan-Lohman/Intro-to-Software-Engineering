/*
 ** A singleton DB that can be observed
 */

import { SimpleDB } from "./simpledb"
import { IDb, IObserver } from "./dbObserver"

export class SingleDB<T> extends SimpleDB<T> implements IDb {
  private static _singleton: SingleDB<any>
  private observers: IObserver[]

  constructor() {
    super()
    this.observers = []
  }

  static getInstance<T>(): SingleDB<T> {
    if (!this._singleton) {
      this._singleton = new SingleDB<T>()
      return this._singleton
    } else {
      return this._singleton
    }
  }

  subscribe(observer: IObserver) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      throw new Error("This observer already exists");
    }

    this.observers.push(observer);
  }
  unsubscribe(observer: IObserver) {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      throw new Error("This observer doesn't exist.");
    }

    this.observers.splice(observerIndex, 1);
  }

  setItem(key: string, item: T): void {
    super.setItem(key, item)
    this.notify()
  }

  removeItem(key: string): void {
    super.removeItem(key)
    this.notify()
  }

  updateItem(key: string, update: Partial<T>) {
    super.updateItem(key, update)
    this.notify()
  }

  clear(): void {
    super.clear()
    this.notify()
  }

  notify() {
    for (const observer of this.observers) {
      observer.notify();
    }
  }
}
