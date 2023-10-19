import type { ICountry } from './ICountry'
import {SimpleDB} from './simpledb'

const mockFName = "mockdata.json"

class MockClient<T> {
    private db
    private loaded = false
    constructor() {
        this.db = new SimpleDB<T>()
    }

    get( key:string): T | null {
        if (!this.loaded) {
            this.load()
            this.loaded = true
        }
        return this.db.getItem(key)
    }

    del(key: string) {
		this.db.removeItem(key)
		this.store()
	}

    set( key:string, value: T) {
        this.db.setItem(key, value)
        this.store()
    }

    keys() : string[] {
        if (!this.loaded) {
            this.load()
            this.loaded = true
        }
        return this.db.keys()
    }

    load() {
        this.db.load(mockFName)
    }

    store() {
        this.db.store(mockFName)
    }
}

const myDB = new MockClient<ICountry>()

export const client = myDB

