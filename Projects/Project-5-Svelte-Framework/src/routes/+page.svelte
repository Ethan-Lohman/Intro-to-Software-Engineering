<script lang="ts">
	// Imports a writeable store, along with the country interface, form, and the display item.
	import {writable} from 'svelte/store'
	import type {ICountry} from 'src/lib/ICountry.ts'
	import CountryItem from '$lib/+country.svelte'
	import CountryForm from '$lib/countryForm.svelte'
	
	// Makes the a store variable along with other variables needed.
	export const countryList = writable<ICountry[]>([])

	// Adds an object to the countries list
	function addCountry(name:string, year: number, population: number, gdp: number) {
		countryList.update(list => {
			list.push({name, year, population, gdp})
			return [...list]
		})
	}

	// Deletes an object in the countries list, according by the index it is at.
	function deleteCountry(index: number) {
		countryList.update(list => {
			const newItems = [...list]
			newItems.splice(index, 1)
			return newItems
		})
	}
</script>

<!-- Displays the form using a dispatcher, along with adding it into the database. -->
<CountryForm on:add={(country)=>addCountry(country.detail.name, country.detail.year, country.detail.population, country.detail.gdp)}/>

<!-- Displays each country object that was added. -->
{#if $countryList.length > 0}
	We have countries!
	{#each $countryList as cItem, i}
		<CountryItem {...cItem} on:delete={()=>deleteCountry(i)}/>
	{/each}
{:else}
	No countries.
{/if}
