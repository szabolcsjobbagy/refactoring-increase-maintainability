import { GRADE_NAMES, MESSAGES, SCORE_LIMITS } from "./constants";
import { isMissing, isNumeric, isNumberBetween, isNumberLessThan, throwError } from "./utilities";
export function calculateGrade(score) {
    validateInput(score);
    return assignGrade(score);
}
function validateInput(score) {
    validateMissing(score);
    validateExisting(score);
}
function validateMissing(score) {
    if (isMissing(score))
        handleInvalid("MISSING_INPUT");
}
function validateExisting(score) {
    if (!isNumeric(score))
        handleInvalid("NOT_A_NUMBER");
    if (!isNumericValid(score))
        handleInvalid("INVALID_NUMBER");
}
function assignGrade(score) {
    return isFailed(score) ? getGrade("FAILED") : assignNotFailedGrade(score);
}
function assignNotFailedGrade(score) {
    if (isPassed(score))
        return getGrade("PASSED");
    return isVeryGood(score) ? getGrade("VERY_GOOD") : getGrade("EXCELLENT");
}
function getGrade(gradeType) {
    return GRADE_NAMES[gradeType];
}
function getScoreLimit(limitType) {
    return SCORE_LIMITS[limitType];
}
function isNumericValid(score) {
    return isNumberBetween(score, getScoreLimit("MIN"), getScoreLimit("MAX"));
}
function isFailed(score) {
    return isNumberLessThan(score, getScoreLimit("PASSED_MIN"));
}
function isPassed(score) {
    return isNumberLessThan(score, getScoreLimit("VERY_GOOD_MIN"));
}
function isVeryGood(score) {
    return isNumberLessThan(score, getScoreLimit("EXCELLENT_MIN"));
}
function handleInvalid(messageType) {
    throwError(MESSAGES[messageType]);
}
