import { writable } from 'svelte/store'
import type { ICountry } from 'src/lib/ICountry.ts'
    
// Makes the a store variable along with other variables needed.
export const countryList = writable<ICountry[]>([])