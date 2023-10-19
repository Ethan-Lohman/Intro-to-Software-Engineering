import { loadFeature, defineFeature } from "jest-cucumber"
import { SingleDB } from "../src/singledb"

const feature = loadFeature("./features/singleDB.feature")

defineFeature(feature, (test) => {
  let singleDB: SingleDB<any>
    test("Adding a single item to a singleDB", ({given, when, then}) => {
      given("I have previously created a singleDB", () => {
        singleDB = SingleDB.getInstance()
      })

      when("I add a single item to the database", () => {
        singleDB.setItem("Joe", 69.1)
      })

      then("I should see the number of items increase by 1", () => {
        expect(singleDB.length).toBe(1)
      })
    })

    test("Constructing a new DB should give the original", ({given, when, then}) => {
      given("I have previously created a singleDB", () => {
        singleDB = SingleDB.getInstance()
        singleDB.setItem("Joe", 69.1)
      })

      when("I create a new one", () => {
        singleDB = SingleDB.getInstance()
      })

      then("It should actually be the old one.", () => {
        expect(singleDB.length).toBe(1)
      })
    })

    test('A newly created "second" database should have old content', ({given, when, then}) => {
      given("I have previously created a singleDB with these contents:", () => {
        singleDB = SingleDB.getInstance()
        singleDB.setItem("Joe", 69.1)
      })

      when("I create a new one", () => {
        singleDB = SingleDB.getInstance()
      })

      then("I should see the same contents as the original", () => {
        expect(singleDB.length).toBe(1)
      })
    })
})