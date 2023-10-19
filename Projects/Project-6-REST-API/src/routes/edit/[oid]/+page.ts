export function load({ params }: { params: { oid: string } }): { oid: string } {
	return {
		oid: params.oid
	}
}