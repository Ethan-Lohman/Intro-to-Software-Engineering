import { loadFeature, defineFeature } from "jest-cucumber"
import { SingleDB } from "../src/singledb"
import { DBObserver, IDb, IObserver } from "../src/dbObserver"

const feature = loadFeature("./features/singleDBObserver.feature")

defineFeature(feature, (test) => {
    let singleDB: SingleDB<any>
    let dbObserver: DBObserver 
    test("An observer subscribes to changes", ({given, when, then}) => {
        given("An observer subscribes to changes", () => {
            singleDB = SingleDB.getInstance()
            dbObserver = new DBObserver()
            singleDB.subscribe(dbObserver)
        })
  
        when("An object is added to the db", () => {
            singleDB.setItem("Joe", 69.1)
        })
        
        then("the observer should be notified.", () => {
            expect(dbObserver.count).toBe(1)
        })
    })

    test('An observer unsubscribes from changes', ({ given, and, when, then }) => {
        given('An observer subscribes to changes', () => {
            singleDB = SingleDB.getInstance()
            dbObserver = new DBObserver()
            singleDB.subscribe(dbObserver)
        })

        and('the observer unsubscribes from changes', () => {
            singleDB.unsubscribe(dbObserver)
        })

        when('An object is added to the db', () => {
            singleDB.setItem("Joe", 69.1)
        })

        then('the observer should not be notified.', () => {
            expect(dbObserver.count).toBe(0)
        })
    })

    test('An observer subscribes and something is removed', ({ given, and, when, then }) => {
        given('An observer subscribes to changes', () => {
            singleDB = SingleDB.getInstance()
            dbObserver = new DBObserver()
            singleDB.subscribe(dbObserver)
        })

        and('some data is added to the db', () => {
            singleDB.setItem("Joe", 69.1)
        })

        when('An object is removed from the db', () => {
            singleDB.removeItem("Joe")
        })

        then('the observer should be notified.', () => {
            expect(dbObserver.count).toBe(2)
        })
    })

    test('An observer subscribes and the DB is cleared', ({ given, and, when, then }) => {
        given('An observer subscribes to changes', () => {
            singleDB = SingleDB.getInstance()
            dbObserver = new DBObserver()
            singleDB.subscribe(dbObserver)
        })

        and('some data is added to the db', () => {
            singleDB.setItem("Joe", 69.1)
        })

        when('The DB is cleared', () => {
            singleDB.clear()
        })

        then('the observer should be notified.', () => {
            expect(dbObserver.count).toBe(2)
        })
    })

    test('An observer subscribes and the DB is updated', ({ given, and, when, then }) => {
        given('An observer subscribes to changes', () => {
            singleDB = SingleDB.getInstance()
            dbObserver = new DBObserver()
            singleDB.subscribe(dbObserver)
        })

        and('some data is added to the db', () => {
            singleDB.setItem("Joe", 69.1)
        })

        when('The DB is updated', () => {
            const toUpdate = {height: 29}
            singleDB.updateItem("Joe", toUpdate)
        })

        then('the observer should be notified.', () => {
            expect(dbObserver.count).toBe(2)
        })
    })
})
