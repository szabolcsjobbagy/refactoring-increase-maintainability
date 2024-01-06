import { MESSAGES } from "./constants"
import { isEmptyText, isMissing, throwError } from "./utilities"

export function processUserData(
	userIds: string[],
	userId: string,
	isActive: boolean,
	isLoggedIn: boolean,
	waitLength: number
): string {
	const userIndex = validateUser(userId, userIds)
	return isLoggedIn && isActive
		? getSuccessResponse(userId, userIndex)
		: getElseResponse(isLoggedIn, isActive, waitLength)
}

function validateUser(userId: string, userIds: string[]): number {
	validateMissing(userId)
	validateEmpty(userId)
	return getUserIndex(userId, userIds)
}

function validateMissing(userId: string): void {
	if (isMissing(userId)) handleInvalid("MISSING_USER_ID")
}

function validateEmpty(userId: string): void {
	if (isEmptyText(userId)) handleInvalid("EMPTY_USER_ID")
}

function getUserIndex(userId: string, userIds: string[]): number {
	if (userIndexInUsers(userId, userIds) < 0) handleInvalid("INVALID_USER_ID")
	return userIndexInUsers(userId, userIds)
}

function handleInvalid(messageType: keyof typeof MESSAGES) {
	throwError(MESSAGES[messageType])
}

function userIndexInUsers(userId: string, userIds: string[]): number {
	return userIds.indexOf(userId)
}

function getSuccessResponse(userId: string, userIndex: number): string {
	return `User found: ${userId} at index ${userIndex}`
}

function getElseResponse(isLoggedIn: boolean, isActive: boolean, waitLength: number): string {
	return !isLoggedIn && isActive ? "Processing... ".repeat(waitLength) : "No action taken."
}
