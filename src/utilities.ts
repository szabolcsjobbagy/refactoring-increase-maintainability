export function isEmptyText(value: string): boolean {
	return value.trim() == ""
}

export function isMissing(value: any): boolean {
	return value == null || value == undefined || Number.isNaN(value)
}

export function isNumeric(value: any): boolean {
	return typeof value == "number"
}

export function isNumberBetween(value: number, min: number, max: number): boolean {
	return value >= min && value <= max
}

export function isNumberLessThan(value: number, limit: number): boolean {
	return value < limit
}

export function throwError(errorMessage: string) {
	throw new Error(errorMessage)
}
