import { GRADE_NAMES, MESSAGES, SCORE_LIMITS } from "./constants"
import { isMissing, isNumeric, isNumberBetween, isNumberLessThan, throwError } from "./utilities"

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
	return isFailed(score) ? getGrade("FAILED") : assignNotFailedGrade(score)
}

function assignNotFailedGrade(score: number) {
	if (isPassed(score)) return getGrade("PASSED")
	return isVeryGood(score) ? getGrade("VERY_GOOD") : getGrade("EXCELLENT")
}

function getGrade(gradeType: keyof typeof GRADE_NAMES) {
	return GRADE_NAMES[gradeType]
}

function getScoreLimit(limitType: keyof typeof SCORE_LIMITS) {
	return SCORE_LIMITS[limitType]
}

function isNumericValid(score: number): boolean {
	return isNumberBetween(score, getScoreLimit("MIN"), getScoreLimit("MAX"))
}

function isFailed(score: number): boolean {
	return isNumberLessThan(score, getScoreLimit("PASSED_MIN"))
}

function isPassed(score: number): boolean {
	return isNumberLessThan(score, getScoreLimit("VERY_GOOD_MIN"))
}

function isVeryGood(score: number): boolean {
	return isNumberLessThan(score, getScoreLimit("EXCELLENT_MIN"))
}

function handleInvalid(messageType: keyof typeof MESSAGES) {
	throwError(MESSAGES[messageType])
}
