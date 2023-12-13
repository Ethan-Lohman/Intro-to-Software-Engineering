export interface TrainingEvent {
  name: string
  description: string
  start: Date
  end: Date
}

let events: TrainingEvent[] = []

export function addEvent(event: TrainingEvent) {
  events.push(event)
}

export function deleteEvent(event: TrainingEvent) {
  events = events.filter((e) => e !== event)
}

export function descriptionFind(text: string): TrainingEvent | undefined {
  // try name
  let result = events.find((event) => event.name === text)
  return result || events.find((event) => event.description === text)
}

export function subStringFind(text: string): TrainingEvent | undefined {
  // try name
  return events.find((event) => event.name.includes(text))
}

