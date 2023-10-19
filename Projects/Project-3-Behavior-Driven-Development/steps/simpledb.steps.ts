import { defineFeature, loadFeature } from "jest-cucumber"
import { SimpleDB } from "../src/simpledb"

const feature = loadFeature("./features/simpleDB.feature")
interface Player {
  name: string
  height: number
}

defineFeature(feature, (test) => {
  test("Adding a single item to the DB", ({ given, when, then }) => {
    let aDB: SimpleDB<Player> // define in test scope
    let count = 0

    given("I have previously created a database", () => {
      aDB = new SimpleDB()
      count = aDB.length
    })

    when("I add a single item to the DB", () => {
      aDB.setItem("a", { name: "joe", height: 72 })
    })

    then("I should see its size increase", () => {
      expect(aDB.length).toBe(count + 1)
    })
  })

  test("Find an item in the DB", ({ given, when, then }) => {
    let aDB: SimpleDB<Player>
    let found: Player | null = null

    given("my DB has the following items:", (table) => {
      aDB = new SimpleDB<Player>()
      ;(table as any[]).forEach((row) => {
        aDB.setItem(row.name, { name: row.name, height: row.height })
      })
    })

    when(/^I search for someone over (\d+) inches$/, (minHeight) => {
      let foundList = aDB.filter((item) => item.height > minHeight)
      if (foundList.length === 0) {
        throw new Error("Search failed")
      } else {
        found = foundList[0]
      }
    })

    then("I should see the following result:", (table) => {
      if (found) {
        expect(found.name).toBe(table[0].name)
      }
    })
  })

  // New tests
  // Coverage is 100% for recipe.ts, simledb.ts, 
  // and for the life of me I cannot figure out lines 79-80.
  // But I was able to get 90-91 done.
  test("Clearing DB", ({ given, when, then }) => {
    let aDB: SimpleDB<Player>

    given("I have previously created a database:", (table) => {
      aDB = new SimpleDB<Player>()
      ;(table as any[]).forEach((row) => {
        aDB.setItem(row.name, { name: row.name, height: row.height })
      })
    })

    when("I want to clear it", () => {
      aDB.clear()
    })

    then("It should be empty", () => {
      expect(aDB.length).toBe(0)
    })
  })

  test("Updating DB", ({ given, when, then }) => {
    let aDB: SimpleDB<Player>

    given("I have previously created a database:", (table) => {
      aDB = new SimpleDB<Player>()
      ;(table as any[]).forEach((row) => {
        aDB.setItem(row.name, { name: row.name, height: row.height })
      })
    })

    when(/^I want update Joe's height to (\d+)$/, (heightString) => {
      const toUpdate = {
        height: heightString
      }
      aDB.updateItem("Joe", toUpdate)
    })

    then(/^Joe's height should be (\d+)$/, (heightString) => {
      expect(aDB.getItem("Joe")?.height).toBe(heightString)
    })
  })

  test("Sorting DB", ({ given, when, then }) => {
    let aDB: SimpleDB<Player>
    let sorted: any

    given("I have previously created a database:", (table) => {
      aDB = new SimpleDB<Player>()
      ;(table as any[]).forEach((row) => {
        const height = parseFloat(row.height)
        aDB.setItem(row.name, { name: row.name, height })
      })
    })

    when("I want the database to be descending", () => {
      sorted = aDB.sort((a, b)=> b.height-a.height)
    })

    then("The database off height should be largest to smallest", () => {
      for (let i = 0; i < aDB.length-1; i++) {
        expect(sorted[i].height).toBeGreaterThanOrEqual(sorted[i+1].height)
      }
    })
  })

  test("Sorting DB with Limits", ({ given, when, then }) => {
    let aDB: SimpleDB<Player>
    let sorted: any

    given("I have previously created a database:", (table) => {
      aDB = new SimpleDB<Player>()
      ;(table as any[]).forEach((row) => {
        const height = parseFloat(row.height)
        aDB.setItem(row.name, { name: row.name, height })
      })
    })

    when("I want the database to be descending but only two values", () => {
      sorted = aDB.sort((a, b)=> b.height-a.height, [0,2])
    })

    then("The database off height should be largest to smallest with only two values", () => {
      for (let i = 0; i < aDB.length-2; i++) {
        //expect(sorted).toBe(null)
        expect(sorted[i].height).toBeGreaterThanOrEqual(sorted[i+1].height)
      }
    })
  })

  test("Find an item in the DB with limits", ({ given, when, then }) => {
    let aDB: SimpleDB<Player>
    let found: Player | null = null

    given("my DB has the following items:", (table) => {
      aDB = new SimpleDB<Player>()
      ;(table as any[]).forEach((row) => {
        aDB.setItem(row.name, { name: row.name, height: row.height })
      })
    })

    when(/^I search for someone over (\d+) inches$/, (minHeight) => {
      let foundList = aDB.filter((item) => item.height > minHeight, [0, 2])
      if (foundList.length === 0) {
        throw new Error("Search failed")
      } else {
        found = foundList[0]
      }
    })

    then("I should see the following result:", (table) => {
      if (found) {
        expect(found.name).toBe(table[0].name)
      }
    })
  })
})
