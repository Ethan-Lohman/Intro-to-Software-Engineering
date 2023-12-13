import { TrainingEvent, addEvent, deleteEvent, subStringFind, descriptionFind } from "./impl"

const extensiveDescription = "a description"
const mockEvents: TrainingEvent[] = [
  { name: "Airplane Show", description: extensiveDescription, start: new Date(), end: new Date() },
  { name: "an Event", description: "b", start: new Date(), end: new Date() },
]

describe("mock TrainingEvents", () => {
  it("should be defined", () => {
    expect(mockEvents).toBeDefined()
  })

  it("should be able to add new events - SubString Find", () => {
    for (const m of mockEvents) {
      addEvent(m)
    }
    const e: TrainingEvent | undefined = subStringFind("Eve")
    if (e) {
      expect(e.name).toBe("an Event")
      expect(e.description).toBe("b")
    } else {
      fail("Event not found")
    }
  })

  it("should be able to add new events - Description Find", () => {
    for (const m of mockEvents) {
      addEvent(m)
    }
    const e: TrainingEvent | undefined = descriptionFind(extensiveDescription)
    if (e) {
      expect(e.name).toBe("Airplane Show")
      expect(e.description).toBe(extensiveDescription)
    } else {
      fail("Event not found")
    }
  })
})
