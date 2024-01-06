import { processUserData } from "../src/processUserDataRefactored"

describe("processUserData", () => {
	describe("Happy paths", () => {
		it.each`
			userIds            | userId | isActive | isLoggedIn | waitCounter | expectedResult
			${["1", "2", "3"]} | ${"1"} | ${true}  | ${true}    | ${"2"}      | ${"User found: 1 at index 0"}
			${["1", "2", "3"]} | ${"1"} | ${true}  | ${false}   | ${"2"}      | ${"Processing... Processing... "}
			${["1", "2", "3"]} | ${"1"} | ${false} | ${true}    | ${"2"}      | ${"No action taken."}
			${["1", "2", "3"]} | ${"1"} | ${false} | ${false}   | ${"2"}      | ${"No action taken."}
		`(
			"should process user correctly if user exists and Active: $isActive, Logged in: $isLoggedIn",
			(testCases) => {
				// Arrange
				const { userIds, userId, isActive, isLoggedIn, waitCounter, expectedResult } =
					testCases
				// Act
				const result = processUserData(userIds, userId, isActive, isLoggedIn, waitCounter)
				// Assert
				expect(result).toEqual(expectedResult)
				expect(() =>
					processUserData(userIds, userId, isActive, isLoggedIn, waitCounter)
				).not.toThrow()
			}
		)
	})

	describe("Error paths", () => {
		it.each`
			userIds            | userId | isActive | isLoggedIn | waitCounter | expectedErrorMessage
			${["1", "2", "3"]} | ${"4"} | ${true}  | ${true}    | ${"1"}      | ${"Invalid user ID."}
		`("should throw an ERROR if user does not exist", (testCases) => {
			const { userIds, userId, isActive, isLoggedIn, waitCounter, expectedErrorMessage } =
				testCases
			// Arrange
			const expectedError = new Error(expectedErrorMessage)

			// Act & Assert
			expect(() =>
				processUserData(userIds, userId, isActive, isLoggedIn, waitCounter)
			).toThrow(expectedError)
		})
	})
})
