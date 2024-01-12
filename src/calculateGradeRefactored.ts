import { GRADE_NAMES, MESSAGES, SCORE_LIMITS } from "./constants"
import { isMissing, isNumeric, throwError } from "./utilities"

export function calculateGrade(score: number): string {
	validateInput(score)
	return assignGrade(score)
}

function validateInput(score: number): void {
	validateMissing(score)
	validateExisting(score)
}

function validateMissing(score: number): void {
	if (isMissing(score)) handleInvalid("MISSING_INPUT")
}

function validateExisting(score: number): void {
	if (!isNumeric(score)) handleInvalid("NOT_A_NUMBER")
	if (!isNumericValid(score)) handleInvalid("INVALID_NUMBER")
}

function assignGrade(score: number): string {
	if (isFailed(score)) return GRADE_NAMES["FAILED"]
	if (isPassed(score)) return GRADE_NAMES["PASSED"]
	return isVeryGood(score) ? GRADE_NAMES["VERY_GOOD"] : GRADE_NAMES["EXCELLENT"]
}

function isNumericValid(score: number): boolean {
	return SCORE_LIMITS["MIN"] <= score && score <= SCORE_LIMITS["MAX"]
}

function isFailed(score: number): boolean {
	return score < SCORE_LIMITS["PASSED_MIN"]
}

function isPassed(score: number): boolean {
	return SCORE_LIMITS["PASSED_MIN"] <= score && score < SCORE_LIMITS["VERY_GOOD_MIN"]
}

function isVeryGood(score: number): boolean {
	return SCORE_LIMITS["VERY_GOOD_MIN"] <= score && score < SCORE_LIMITS["EXCELLENT_MIN"]
}

function handleInvalid(messageType: keyof typeof MESSAGES) {
	throwError(MESSAGES[messageType])
}
