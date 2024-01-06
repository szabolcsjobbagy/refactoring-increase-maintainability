import { INPUT_LENGTH_LIMITS, MESSAGES } from "./constants"
import { isEmptyText, isMissing, isNumberBetween, throwError } from "./utilities"

export function validateUserInput(input: string): boolean {
	try {
		validateMissing(input)
		validateEmpty(input)
		validateExisting(input)
		return true
	} catch (error) {
		return false
	}
}

function validateMissing(input: string): void {
	if (isMissing(input)) handleInvalid("MISSING_INPUT")
}

function validateEmpty(input: string): void {
	if (isEmptyText(input)) handleInvalid("EMPTY_TEXT")
}

function validateExisting(input: string): void {
	validateLength(input)
	validatePattern(input)
}

function validateLength(input: string): void {
	if (!isLengthValid(input.length)) handleInvalid("INVALID_TEXT_LENGTH")
}

function validatePattern(input: string): void {
	if (!isTextPatternValid(input)) handleInvalid("INVALID_TEXT_PATTERN")
}

function isLengthValid(length: number): boolean {
	return isNumberBetween(length, getInputLengthLimit("MIN"), getInputLengthLimit("MAX"))
}

function isTextPatternValid(input: string): boolean {
	return /^[a-zA-Z0-9]+$/.test(input)
}

function getInputLengthLimit(limitType: keyof typeof INPUT_LENGTH_LIMITS) {
	return INPUT_LENGTH_LIMITS[limitType]
}

function handleInvalid(messageType: keyof typeof MESSAGES) {
	throwError(MESSAGES[messageType])
}
