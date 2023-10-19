import { SingleDB } from "./singledb"
import { DBObserver } from "./dbObserver"

function areWeTestingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined
}

interface SimpleItem {
  a: number
  b: string
}

const myDB = SingleDB.getInstance<SimpleItem>()
const anObserver = new DBObserver()

console.log("Before setting an item: count=" + anObserver.count)

anObserver.subscribeObservable(myDB)
myDB.setItem("hello", { a: 3, b: "there sonny!" })

console.log("After setting an item: count=" + anObserver.count)

anObserver.unsubscribeObservable(myDB)

myDB.setItem("goodbye", { a: 9, b: "sweetheart, it's time to go." })

console.log("Check count after unsubscribing: count=" + anObserver.count)
