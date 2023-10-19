<h1>HW 7: SvelteKit</h1>

<script lang="ts">
	import type {ICountry} from 'src/lib/ICountry'
	import CountryItem from '$lib/+country.svelte'
	import CountryForm from '$lib/countryForm.svelte'
	import { countryList } from '$lib/countryStore'
	import {onMount} from "svelte"
	import { doGetAll, doPostItem, getNextOID, doDeleteItem } from '$lib/apiHelpers'

	let currOID
	onMount(async () => {
		const [oid, data] = await doGetAll()
		currOID = oid
		countryList.set(data)
	})

	// Adds an object to the countries list
	async function addCountry(name: string, year: number, population: number, gdp: number) {

    const nextOID = await getNextOID($countryList)
    
    // Creating a new country object with the calculated OID
    const newItem = { name, year, population, gdp, oid: nextOID}

    // Updating the country list
    countryList.update(list => {
        const newCountry = [...list, newItem] as ICountry[]
        countryList.set(newCountry)
        doPostItem(newItem)
        return newCountry
    })
}

	// Deletes an object in the countries list, according by the index it is at.
	async function deleteCountry(index: number) {
		const oid = $countryList[index].oid
		const newCountry = $countryList.filter((_, i) => index != i)
		countryList.set(newCountry)
		await doDeleteItem(oid.toString())
	}
</script>

<!-- Displays the form using a dispatcher, along with adding it into the database. -->
<CountryForm on:submit={(country)=>addCountry(country.detail.name, country.detail.year, country.detail.population, country.detail.gdp)}/>

<!-- Displays each country object that was added. -->
{#if $countryList.length > 0}
	We have countries!
	{#each $countryList as cItem, i}
		<CountryItem {...cItem} on:delete={()=>deleteCountry(i)}/>
	{/each}
{:else}
	No countries.
{/if}
