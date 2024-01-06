import { validateUserInput } from "../src/validateUserInputRefactored"

describe("validateUserInput", () => {
	describe("Happy paths", () => {
		it.each`
			inputValue                | expectedResult
			${"i2345"}                | ${true}
			${"123h5f"}               | ${true}
			${"i23h56r"}              | ${true}
			${"i23456789oi23456789o"} | ${true}
		`("should return true in case of valid inputs: $inputValue", (testCases) => {
			// Arrange
			const { inputValue, expectedResult } = testCases
			// Act
			const result = validateUserInput(inputValue)
			// Assert
			expect(result).toEqual(expectedResult)
			expect(() => validateUserInput(inputValue)).not.toThrow()
		})
	})

	describe("Invalid paths", () => {
		it.each`
			inputValue                 | expectedResult
			${NaN}                     | ${false}
			${null}                    | ${false}
			${undefined}               | ${false}
			${""}                      | ${false}
			${"!ere238"}               | ${false}
			${"-3gere55"}              | ${false}
			${"3.p6546"}               | ${false}
			${"i234"}                  | ${false}
			${"i23456789oi23456789oi"} | ${false}
		`("should return false in case of invalid inputs: $inputValue", (testCases) => {
			// Arrange
			const { inputValue, expectedResult } = testCases
			// Act
			const result = validateUserInput(inputValue)
			// Assert
			expect(result).toEqual(expectedResult)
			expect(() => validateUserInput(inputValue)).not.toThrow()
		})
	})
})
