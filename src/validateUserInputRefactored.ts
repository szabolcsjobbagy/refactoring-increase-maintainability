import { INPUT_LENGTH_LIMITS, MESSAGES } from "./constants"
import { isEmptyText, isMissing } from "./utilities"

export function validateUserInput(input: string): boolean {
	if (!validateMissing(input)) return false
	if (!validateEmpty(input)) return false
	if (!validateLength(input)) return false
	if (!validatePattern(input)) return false
	return true
}

function validateMissing(input: string): boolean {
	if (isMissing(input)) return handleInvalid("MISSING_INPUT")
	return true
}

function validateEmpty(input: string): boolean {
	if (isEmptyText(input)) return handleInvalid("EMPTY_TEXT")
	return true
}

function validateLength(input: string): boolean {
	if (!isLengthValid(input.length)) return handleInvalid("INVALID_TEXT_LENGTH")
	return true
}

function validatePattern(input: string): boolean {
	if (!isTextPatternValid(input)) return handleInvalid("INVALID_TEXT_PATTERN")
	return true
}

function isLengthValid(length: number): boolean {
	return INPUT_LENGTH_LIMITS["MIN"] <= length && length <= INPUT_LENGTH_LIMITS["MAX"]
}

function isTextPatternValid(input: string): boolean {
	const patternAlphaNumeric = /^[a-zA-Z0-9]+$/
	return patternAlphaNumeric.test(input)
}

function handleInvalid(messageType: keyof typeof MESSAGES): boolean {
	console.log(MESSAGES[messageType])
	return false
}
