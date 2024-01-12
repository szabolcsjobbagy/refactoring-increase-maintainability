import { INPUT_LENGTH_LIMITS, MESSAGES } from "./constants"
import { isEmptyText, isMissing } from "./utilities"

export function validateUserInput(input: string): boolean {
	if (!isNotMissingOrEmpty(input)) return false
	if (!isLengthValid(input)) return false
	if (!isTextPatternValid(input)) return false
	return true
}

function isNotMissingOrEmpty(input: string): boolean {
	if (isMissing(input)) return handleInvalid("MISSING_INPUT")
	if (isEmptyText(input)) return handleInvalid("EMPTY_TEXT")
	return true
}

function isLengthValid(input: string): boolean {
	const isLengthInValidRange =
		INPUT_LENGTH_LIMITS["MIN"] <= input.length && input.length <= INPUT_LENGTH_LIMITS["MAX"]

	if (!isLengthInValidRange) return handleInvalid("INVALID_TEXT_LENGTH")
	return true
}

function isTextPatternValid(input: string): boolean {
	const isPatternAlphaNumeric = /^[a-zA-Z0-9]+$/.test(input)

	if (!isPatternAlphaNumeric) return handleInvalid("INVALID_TEXT_PATTERN")
	return true
}

function handleInvalid(messageType: keyof typeof MESSAGES): boolean {
	console.log(MESSAGES[messageType])
	return false
}
