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

    // Homework two tests below

    // Tests the deleteItems() function.
    it('Should delete the item with ID 3', () => {
        loadSampleData(db)

        // Sends in the predicate of checking for ID 3.
        db.deleteItems(
            (a: DumbItem) => {
                if (a.id == '3') {
                    return true
                } else {
                    return false
                }
            })
        
        // Checks to see if the ID three is deleted
        const itemDeleted1 = db.getItem('3')
        expect(itemDeleted1).toBe(null)

        // Checks to see if the rest of the data is deleted along with the ID
        const itemDeleted2 = db.getItem('three')
        expect(itemDeleted2).toBe(null)   
    })

    // Tests the deleteItems() function.
    it('Should delete the item with ID 2 & 3', () => {
        loadSampleData(db)

        // Sends in the predicate to see if ID is 3 or 2.
        db.deleteItems(
            (a: DumbItem) => {
                if (a.id == '3' || a.id == '2') {
                    return true
                } else {
                    return false
                }
            })
        
        // Checks to see if the ID three is deleted
        const itemDeleted1 = db.getItem('3')
        expect(itemDeleted1).toBe(null)

        const itemDeleted2 = db.getItem('2')
        expect(itemDeleted2).toBe(null)
 
    })

    // Tests the updateItems() function.
    it('Should update ID 4\'s name to Ethan', () => {
        loadSampleData(db)

        // Gives a list of properties to change.
        const updateProperties = {
            name: 'Ethan'
        }

        // Updates ID 4 to make the name Ethan.
        db.updateItems((a: DumbItem) => {return a.id == '4'}, updateProperties)
        
        // Checks if ID 4's name is Ethan
        const itemUpdated = db.getItem('4')
        if (itemUpdated != null) {
            expect((itemUpdated.name)).toEqual('Ethan')
        }

        // Also checks if it displays with the list.
        const result = db.allItems()
        expect(result.map((i) => i.tag)).toEqual([31, 32, 33, 34, 35])
        expect(result.map((i) => i.name)).toEqual([
            'one',
            'two',
            'three',
            'Ethan',
            'five',
        ])
    })

    // Tests the updateItems() function.
    it('Should update ID 3 and 4\'s names to Ethan', () => {
        loadSampleData(db)

        // Gives a list of properties to change.
        const updateProperties = {
            name: 'Ethan'
        }

        // Updates id 3 and 4 to make the name Ethan.
        db.updateItems(
            (a: DumbItem) => {
                return a.id == '4' || a.id == '3'
            }, updateProperties)
        
        // Checks if ID 3's name is Ethan
        const itemUpdated1 = db.getItem('3')
        if (itemUpdated1 != null) {
            expect((itemUpdated1.name)).toEqual('Ethan')
        }

        // Checks if ID 4's name is Ethan
        const itemUpdated2 = db.getItem('4')
        if (itemUpdated2 != null) {
            expect((itemUpdated2.name)).toEqual('Ethan')
            expect((itemUpdated2.id)).toEqual('4')
        }
    })

    // Tests the updateItems() function.
    it('Should update ID 3\'s id, name, and tag.', () => {
        loadSampleData(db)

        // Gives a list of properties to change.
        const updateProperties = {
            name: 'Ethan',
            id: '99',
            tag: 75
        }

        // Updates ID 3 to the new properties above.
        db.updateItems(
            (a: DumbItem) => {
                return a.id == '3'
            }, updateProperties)
        
        // Checks if it ID 3's properties were changed.
        const itemUpdated = db.getItem('99')
        if (itemUpdated != null) {
            expect((itemUpdated.name)).toEqual('Ethan')
            expect((itemUpdated.id)).toEqual('99')
            expect((itemUpdated.tag)).toEqual(75)
        }
    })

    // Tests the getStringRep() function.
    it('Should return a string representation of the database', () => {
        loadSampleData(db)

        // Tests the getStringRep() function and parses it.
        const resultData = JSON.parse(db.getStringRep())

        // What the getStringRep() data should look like.
        const expectedResult = {
            "1": {"id": "1", "name": "one", "tag": 31},
            "2": {"id": "2", "name": "two", "tag": 32},
            "99": {"id": "99", "name": "Ethan", "tag": 75},
            "4": {"id": "4", "name": "Ethan", "tag": 34},
            "5": {"id": "5", "name": "five", "tag": 35},
        }

        // Checks if the result and expected result is the same.
        expect(resultData).toEqual(expectedResult)
    })

    // Tests the setStringRep() function for setting a database off a string text file.
    it('Should clear the database and replace it with a new data', () => {
        loadSampleData(db)

        // Gives the database new data, which is being reused from dummyData.
        const input = JSON.stringify(dummyData)
        db.setStringRep(input)

        // This is what the database should look like after being cleared and filled up again.
        const expectedResult = {
            items: [
                {"id": "1", "name": "one", "tag": 31},
                {"id": "2", "name": "two", "tag": 32},
                {"id": "99", "name": "Ethan", "tag": 75},
                {"id": "4", "name": "Ethan", "tag": 34},
                {"id": "5", "name": "five", "tag": 35},
            ]
        }
        
        // Checks if the database that was just made off the text file is correct.
        expect(db).toEqual(expectedResult)
    })

    // Tests the setStringRep() function for setting a database off a brand new text file.
    it('Should clear the database and replace it with a new dataset', () => {
        loadSampleData(db)

        // Makes a new dataset to ensure this works.
        const newData: DumbItem[] = [
            { id: '9', name: 'ofe', tag: 31 },
            { id: '8', name: 'fsao', tag: 32 },
            { id: '7', name: 'fsaee', tag: 33 },
            { id: '6', name: 'adsr', tag: 34 },
            { id: '5', name: 'five', tag: 35 },
        ]

        // Gives the database new data, which is being reused from dummyData.
        const input = JSON.stringify(newData)
        db.setStringRep(input)

        // This is what the database should look like after being cleared and filled up again.
        const expectedResult = {
            items: [
                {"id": "9", "name": "ofe", "tag": 31},
                {"id": "8", "name": "fsao", "tag": 32},
                {"id": "7", "name": "fsaee", "tag": 33},
                {"id": "6", "name": "adsr", "tag": 34},
                {"id": "5", "name": "five", "tag": 35},
            ]
        }
        
        // Checks if the database that was just made off the text file is correct.
        expect(db).toEqual(expectedResult)
    })
})
