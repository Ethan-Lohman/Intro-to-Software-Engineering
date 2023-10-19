import { SimpleDB } from '.'

interface DumbItem {
    id: string
    name: string
    tag?: number
}

const dummyData: DumbItem[] = [
    { id: '1', name: 'one', tag: 31 },
    { id: '2', name: 'two', tag: 32 },
    { id: '3', name: 'three', tag: 33 },
    { id: '4', name: 'four', tag: 34 },
    { id: '5', name: 'five', tag: 35 },
]

const loadSampleData = (
    db: SimpleDB<DumbItem>,
    theData: DumbItem[] = dummyData
): void => {
    theData.forEach((item) => db.setItem(item.id, item))
}

describe('test simple db', () => {
    let db: SimpleDB<DumbItem>

    beforeEach(() => {
        db = new SimpleDB<DumbItem>()
    })

    it('should be created', () => {
        expect(db).toBeDefined()
    })

    it('should begin empty', () => {
        expect(db.length).toBe(0)
    })

    it('should accept a new item', () => {
        const item: DumbItem = { id: '1', name: 'foo' }
        db.setItem(item.id, item)
        expect(db.length).toBe(1)
    })

    it('should have the get the correct length after multiple adds', () => {
        loadSampleData(db)
        expect(db.length).toBe(5)
    })

    it('should be able to remove an item', () => {
        loadSampleData(db)
        expect(db.length).toBe(5)
        db.removeItem('1')
        expect(db.length).toBe(4)
    })

    it('should get an item', () => {
        loadSampleData(db)
        const item = db.getItem('2')
        expect(item!.name).toBe('two')
        const nothing = db.getItem('foo') // no key 'foo'
        expect(nothing).toBe(null)
    })

    it('should get the keys', () => {
        loadSampleData(db)
        const result = db.keys()
        expect(result.map((i) => i)).toEqual(['1', '2', '3', '4', '5'])
    })

    it('should clear items', () => {
        loadSampleData(db)
        expect(db.length).toBe(5)
        db.clear()
        expect(db.length).toBe(0)
    })

    it('should return all items in a list', () => {
        loadSampleData(db)
        const result = db.allItems()

        expect(result.map((i) => i.tag)).toEqual([31, 32, 33, 34, 35])
        expect(result.map((i) => i.name)).toEqual([
            'one',
            'two',
            'three',
            'four',
            'five',
        ])
    })

    it('should sort correctly', () => {
        loadSampleData(db)
        const result = db.sort((a: DumbItem, b: DumbItem) => {
            if (a.tag && b.tag) {
                return b.tag - a.tag // descending
            } else {
                return 0
            }
        })
        expect(result.map((i) => i.tag)).toEqual([35, 34, 33, 32, 31])
    })

    it('should sort correctly with limits', () => {
        loadSampleData(db)
        const result = db.sort(
            (a: DumbItem, b: DumbItem) => {
                if (a.tag && b.tag) {
                    return b.tag - a.tag // descending
                } else {
                    return 0
                }
            },
            [1, 3] // slice indices from 1->3
        )
        expect(result.map((i) => i.tag)).toEqual([34, 33])
    })

    it('should filter correctly', () => {
        loadSampleData(db)
        const result = db.filter((a: DumbItem) => {
            if (a.tag) {
                return a.tag % 2 === 0 // get only even tags
            } else {
                return false
            }
        })
        expect(result.map((i) => i.tag)).toEqual([32, 34])
    })

    it('should filter correctly with limits', () => {
        loadSampleData(db)
        const result = db.filter(
            (a: DumbItem) => {
                if (a.tag) {
                    return a.tag % 2 !== 0 // get only odd tags
                } else {
                    return false
                }
            },
            [1, 2]
        )
        expect(result.map((i) => i.tag)).toEqual([33])
    })
})
