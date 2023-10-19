<script lang="ts">
	import type {ICountry} from 'src/lib/ICountry'
    import { doPutItem } from '$lib/apiHelpers'
    import { goto } from '$app/navigation'
    import CountryForm from '$lib/countryForm.svelte'
    import { countryList } from '$lib/countryStore'

	/** @type {import('./$types').PageData} */
	export let data
	const oid = data.oid

	const foundList = $countryList.filter((item) => item.oid == parseInt(oid))
    let foundItem: ICountry | null = null

	if (foundList.length === 1) {
		foundItem = foundList[0]
	} else {
		foundItem = null
	}

	const onSubmit = (e: CustomEvent<ICountry>) => {
		const newItem = e.detail
		const foundIndex = $countryList.findIndex((item) => item.oid === newItem.oid)
		
		if (foundIndex) {
			const currCart = $countryList
			currCart[foundIndex] = newItem
			countryList.set(currCart)
			doPutItem(newItem).then((result) => {
				goto('/')
			})
		}
	}
</script>

<h1>OID: {oid}</h1>

{#if foundItem}
	<CountryForm {...foundItem} buttonText="Edit" on:submit={(e) => onSubmit(e)} />
{:else}
	<h2>Sorry, I don't see that here...</h2>
{/if}
