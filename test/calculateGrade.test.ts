import { calculateGrade } from "../src/calculateGradeRefactored"

describe("calculateGrade", () => {
	describe("Happy paths", () => {
		it.each`
			inputValue | expectedResult
			${100}     | ${"A"}
			${90}      | ${"A"}
			${89}      | ${"B"}
			${80}      | ${"B"}
			${79}      | ${"C"}
			${70}      | ${"C"}
			${69}      | ${"D"}
			${0}       | ${"D"}
		`(
			"should calculate grades correctly in case of valid NUMERIC score: $inputValue",
			(testCases) => {
				// Arrange
				const { inputValue, expectedResult } = testCases
				// Act
				const result = calculateGrade(inputValue)
				// Assert
				expect(result).toEqual(expectedResult)
				expect(() => calculateGrade(inputValue)).not.toThrow()
			}
		)

		it("should calculate grades correctly in case of STRING score which can be converted to number", () => {
			// Arrange
			const inputValue = Number("10")
			const expectedResult = "D"
			// Act
			const result = calculateGrade(inputValue)
			// Assert
			expect(result).toEqual(expectedResult)
			expect(() => calculateGrade(inputValue)).not.toThrow()
		})
	})

	describe("Error paths", () => {
		it.each`
			inputValue | expectedErrorMessage
			${NaN}     | ${"Missing input"}
			${-1}      | ${"Invalid number input"}
			${101}     | ${"Invalid number input"}
			${"text"}  | ${"Input is not a number"}
		`("should throw an ERROR in case of invalid score: $inputValue", (testCases) => {
			const { inputValue, expectedErrorMessage } = testCases
			// Arrange
			const expectedError = new Error(expectedErrorMessage)

			// Act & Assert
			expect(() => calculateGrade(inputValue)).toThrow(expectedError)
		})
	})
})
