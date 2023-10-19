/*
 ** A very simple observer
 */

export interface IDb {
  subscribe(o: IObserver): void
  unsubscribe(o: IObserver): void
}

export interface IObserver {
  notify(): void
}

export class DBObserver implements IObserver {
  public count: number

  constructor() {
    this.count = 0
  }

  subscribeObservable(ob: IDb) {
    ob.subscribe(this)
  }

  unsubscribeObservable(ob: IDb) {
    ob.unsubscribe(this)
  }

  notify() {
    this.count++
  }
}
