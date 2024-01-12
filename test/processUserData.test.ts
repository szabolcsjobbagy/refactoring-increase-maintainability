import { processUserData } from "../src/processUserDataRefactored"
import { User } from "../src/processUserDataRefactored"

describe("processUserData", () => {
	describe("Happy paths", () => {
		it.each`
			userIds            | userData               | waitLength | expectedResult
			${["1", "2", "3"]} | ${["1", true, true]}   | ${"2"}     | ${"User found: 1 at index 0"}
			${["1", "2", "3"]} | ${["1", true, false]}  | ${"2"}     | ${"Processing... Processing... "}
			${["1", "2", "3"]} | ${["1", false, true]}  | ${"2"}     | ${"No action taken."}
			${["1", "2", "3"]} | ${["1", false, false]} | ${"2"}     | ${"No action taken."}
		`(
			"should process user correctly if user exists and Active: $isActive, Logged in: $isLoggedIn",
			(testCases) => {
				// Arrange
				const { userIds, userData, waitLength, expectedResult } = testCases
				const user = new User(userData[0], userData[1], userData[2])

				// Act
				const result = processUserData(userIds, user, waitLength)

				// Assert
				expect(result).toEqual(expectedResult)
				expect(() => processUserData(userIds, user, waitLength)).not.toThrow()
			}
		)
	})

	describe("Error paths", () => {
		it.each`
			userIds            | userData                   | waitLength | expectedErrorMessage
			${["1", "2", "3"]} | ${[undefined, true, true]} | ${"1"}     | ${"Missing user ID"}
			${["1", "2", "3"]} | ${[null, true, true]}      | ${"1"}     | ${"Missing user ID"}
			${["1", "2", "3"]} | ${[NaN, true, true]}       | ${"1"}     | ${"Missing user ID"}
			${["1", "2", "3"]} | ${["", true, true]}        | ${"1"}     | ${"Empty user ID"}
			${["1", "2", "3"]} | ${["4", true, true]}       | ${"1"}     | ${"Invalid user ID"}
		`("should throw an ERROR if user does not exist", (testCases) => {
			// Arrange
			const { userIds, userData, waitLength, expectedErrorMessage } = testCases
			const user = new User(userData[0], userData[1], userData[2])
			const expectedError = new Error(expectedErrorMessage)

			// Act & Assert
			expect(() => processUserData(userIds, user, waitLength)).toThrow(expectedError)
		})
	})
})
