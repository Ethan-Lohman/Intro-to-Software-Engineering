/*
 ** A slightly more complex observer
 */

export interface IDb<D,T> {
  subscribe(o: IObserver<D,T>): void
  unsubscribe(o: IObserver<D,T>): void
  allItems(): T[]
}

export interface IObserver<D,T> {
  notify(ob:IDb<D,T>): void
}

export class DBObserver<D,T> implements IObserver<D,T> {
  public count: number
  private cb: (cnt:number)=>void | null

  constructor(cb:(cnt:number)=>void | null) {
    this.count = 0
    this.cb = cb
  }

  subscribeObservable(ob: IDb<D,T>) {
    ob.subscribe(this)
  }

  unsubscribeObservable(ob: IDb<D,T>) {
    ob.unsubscribe(this)
  }

  notify(ob:IDb<D,T>) {
    this.count = ob.allItems().length
    if (this.cb){
      this.cb(this.count)
    }
  }
}
