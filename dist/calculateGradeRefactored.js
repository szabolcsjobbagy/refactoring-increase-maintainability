import { GRADE_NAMES, MESSAGES, SCORE_LIMITS } from "./constants";
import { isNumberBetween, isNumberLessThan, throwError } from "./utilities";
export function calculateGrade(score) {
    validateScore(score);
    return assignGradeToScore(score);
}
function validateScore(score) {
    if (isScoreMissing(score))
        handleInvalidScore("MISSING_SCORE");
    if (!isScoreNumeric(score))
        handleInvalidScore("INVALID_TEXT_SCORE");
    if (!isScoreNumericValid(score))
        handleInvalidScore("INVALID_NUMBER_SCORE");
}
function assignGradeToScore(score) {
    if (isScoreFailed(score))
        return GRADE_NAMES.FAILED;
    if (isScorePassed(score))
        return GRADE_NAMES.PASSED;
    return isScoreVeryGood(score) ? GRADE_NAMES.VERY_GOOD : GRADE_NAMES.EXCELLENT;
}
function handleInvalidScore(messageType) {
    throwError(MESSAGES[messageType]);
}
function isScoreMissing(score) {
    return score == null || score == undefined || Number.isNaN(score);
}
function isScoreNumeric(score) {
    return typeof score == "number";
}
function isScoreNumericValid(score) {
    return isNumberBetween(score, SCORE_LIMITS.MIN, SCORE_LIMITS.MAX);
}
function isScoreFailed(score) {
    return isNumberLessThan(score, SCORE_LIMITS.PASSED_MIN);
}
function isScorePassed(score) {
    return isNumberLessThan(score, SCORE_LIMITS.VERY_GOOD_MIN);
}
function isScoreVeryGood(score) {
    return isNumberLessThan(score, SCORE_LIMITS.EXCELLENT_MIN);
}
