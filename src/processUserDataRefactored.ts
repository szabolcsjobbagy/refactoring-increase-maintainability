import { MESSAGES } from "./constants"
import { isEmptyText, isMissing, throwError } from "./utilities"

export class User {
	constructor(public userId: string, public isActive: boolean, public isLoggedIn: boolean) {}
}

export function processUserData(userIds: string[], user: User, waitLength: number): string {
	const userIndex = validateUser(user.userId, userIds)
	return user.isLoggedIn && user.isActive
		? getSuccessResponse(user.userId, userIndex)
		: getElseResponse(user.isLoggedIn, user.isActive, waitLength)
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
	const isUserIndexLessThanZero = userIds.indexOf(userId) < 0
	if (isUserIndexLessThanZero) handleInvalid("INVALID_USER_ID")
	return userIds.indexOf(userId)
}

function handleInvalid(messageType: keyof typeof MESSAGES) {
	throwError(MESSAGES[messageType])
}

function getSuccessResponse(userId: string, userIndex: number): string {
	return `User found: ${userId} at index ${userIndex}`
}

function getElseResponse(isLoggedIn: boolean, isActive: boolean, waitLength: number): string {
	return !isLoggedIn && isActive ? "Processing... ".repeat(waitLength) : "No action taken."
}
