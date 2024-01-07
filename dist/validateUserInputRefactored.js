import { INPUT_LENGTH_LIMITS, MESSAGES } from "./constants";
import { isEmptyText, isMissing, isNumberBetween, throwError } from "./utilities";
export function validateUserInput(input) {
    try {
        validateMissing(input);
        validateEmpty(input);
        validateExisting(input);
        return true;
    }
    catch (error) {
        return false;
    }
}
function validateMissing(input) {
    if (isMissing(input))
        handleInvalid("MISSING_INPUT");
}
function validateEmpty(input) {
    if (isEmptyText(input))
        handleInvalid("EMPTY_TEXT");
}
function validateExisting(input) {
    validateLength(input);
    validatePattern(input);
}
function validateLength(input) {
    if (!isLengthValid(input.length))
        handleInvalid("INVALID_TEXT_LENGTH");
}
function validatePattern(input) {
    if (!isTextPatternValid(input))
        handleInvalid("INVALID_TEXT_PATTERN");
}
function isLengthValid(length) {
    return isNumberBetween(length, getInputLengthLimit("MIN"), getInputLengthLimit("MAX"));
}
function isTextPatternValid(input) {
    const patternAlphaNumeric = /^[a-zA-Z0-9]+$/;
    return patternAlphaNumeric.test(input);
}
function getInputLengthLimit(limitType) {
    return INPUT_LENGTH_LIMITS[limitType];
}
function handleInvalid(messageType) {
    throwError(MESSAGES[messageType]);
}
