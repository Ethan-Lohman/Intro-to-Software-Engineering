import type { ICountry } from 'src/lib/ICountry.ts'

export const doGetAll = async (): Promise<[number, ICountry[]]> => {
	const response = await fetch('/api/')
	const data: [string, ICountry][] = await response.json()
	const result: ICountry[] = []
	data.forEach((pair) => {
		result.push(pair[1])
	})
	return [getNextOID(result), result]
}

export const getNextOID = (items: ICountry[]) => {
	// find the max oid, and then generate the next oid available.
	const numberOid = items
	.filter(items => typeof items.oid === "number")
	.map(items => items.oid as number)
	return Math.max(0, ...numberOid) + 1
}

export const doPostItem = async (item: ICountry) => {
	const proxyItem: { [key: string]: ICountry } = {}
	proxyItem[`${item.oid}` || ''] = item // if there is no oid, use ''
	const response = await fetch('/api/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(proxyItem)
	})
	const data = await response.json()
	console.log('POST GOT:', data)
	return data
}

export const doPutItem = async (item: ICountry) => {
	const response = await fetch(`/api/${item.oid}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(item)
	})
	const data = await response.json()
	console.log('PUT GOT:', data)
	return data
}

export const doDeleteItem = async (oid: string) => {
	const response = await fetch(`/api/${oid}`, {
		method: 'DELETE'
	})
	const data = await response.json()
	console.log('DELETE GOT:', data)
	return data
}