export function isNumberBetween(value: number, min: number, max: number): boolean {
	return value >= min && value <= max
}

export function isNumberLessThan(value: number, limit: number): boolean {
	return value < limit
}

export function throwError(errorMessage: string) {
	throw new Error(errorMessage)
}
