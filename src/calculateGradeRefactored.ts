import { GRADE_NAMES, MESSAGES, SCORE_LIMITS } from "./constants"
import { isNumberBetween, isNumberLessThan, throwError } from "./utilities"

export function calculateGrade(score: number): string {
	validateScore(score)
	return assignGradeToScore(score)
}

function validateScore(score: number): void {
	if (isScoreMissing(score)) handleInvalidScore("MISSING_SCORE")
	if (!isScoreNumeric(score)) handleInvalidScore("INVALID_TEXT_SCORE")
	if (!isScoreNumericValid(score)) handleInvalidScore("INVALID_NUMBER_SCORE")
}

function assignGradeToScore(score: number) {
	if (isScoreFailed(score)) return GRADE_NAMES.FAILED
	if (isScorePassed(score)) return GRADE_NAMES.PASSED
	return isScoreVeryGood(score) ? GRADE_NAMES.VERY_GOOD : GRADE_NAMES.EXCELLENT
}

function handleInvalidScore(messageType: keyof typeof MESSAGES) {
	throwError(MESSAGES[messageType])
}

function isScoreMissing(score: any): boolean {
	return score == null || score == undefined || Number.isNaN(score)
}

function isScoreNumeric(score: any): boolean {
	return typeof score == "number"
}

function isScoreNumericValid(score: number): boolean {
	return isNumberBetween(score, SCORE_LIMITS.MIN, SCORE_LIMITS.MAX)
}

function isScoreFailed(score: number): boolean {
	return isNumberLessThan(score, SCORE_LIMITS.PASSED_MIN)
}

function isScorePassed(score: number): boolean {
	return isNumberLessThan(score, SCORE_LIMITS.VERY_GOOD_MIN)
}

function isScoreVeryGood(score: number): boolean {
	return isNumberLessThan(score, SCORE_LIMITS.EXCELLENT_MIN)
}
