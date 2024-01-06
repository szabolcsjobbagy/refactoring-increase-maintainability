import { MESSAGES } from "./constants";
import { isEmptyText, isMissing, throwError } from "./utilities";
export function processUserData(userIds, userId, isActive, isLoggedIn, waitLength) {
    const userIndex = validateUser(userId, userIds);
    return isLoggedIn && isActive
        ? getSuccessResponse(userId, userIndex)
        : getElseResponse(isLoggedIn, isActive, waitLength);
}
function validateUser(userId, userIds) {
    validateMissing(userId);
    validateEmpty(userId);
    return getUserIndex(userId, userIds);
}
function validateMissing(userId) {
    if (isMissing(userId))
        handleInvalid("MISSING_USER_ID");
}
function validateEmpty(userId) {
    if (isEmptyText(userId))
        handleInvalid("EMPTY_USER_ID");
}
function getUserIndex(userId, userIds) {
    if (userIndexInUsers(userId, userIds) < 0)
        handleInvalid("INVALID_USER_ID");
    return userIndexInUsers(userId, userIds);
}
function handleInvalid(messageType) {
    throwError(MESSAGES[messageType]);
}
function userIndexInUsers(userId, userIds) {
    return userIds.indexOf(userId);
}
function getSuccessResponse(userId, userIndex) {
    return `User found: ${userId} at index ${userIndex}`;
}
function getElseResponse(isLoggedIn, isActive, waitLength) {
    return !isLoggedIn && isActive ? "Processing... ".repeat(waitLength) : "No action taken.";
}
