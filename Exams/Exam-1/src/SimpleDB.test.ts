import { SimpleDB } from "./SimpleDB"

describe("SimpleDB testing", () => {
  it("Should handle literal keys", () => {
    const db = new SimpleDB<string>()
    db.set("foo", "bar")
    expect(db.keys().length).toEqual(1)
  })

  it("Should handle deleting keys", () => {
    const db = new SimpleDB<string>()
    db.set("foo", "bar")
    db.delete("foo")
    expect(db.keys().length).toEqual(0)
  })

  it("Should check for keys", () => {
    const db = new SimpleDB<string>()
    db.set("foo", "bar")
    expect(db.has("foo")).toBe(true)
  })

  it("Should clear keys", () => {
    const db = new SimpleDB<string>()
    db.set("foo", "bar")
    db.clear()
    expect(db.keys().length).toBe(0)
  })

  it("Should return values", () => {
    const db = new SimpleDB<string>()
    db.set("foo", "bar")
    expect(db.values()).toEqual(["bar"])
  })
})
