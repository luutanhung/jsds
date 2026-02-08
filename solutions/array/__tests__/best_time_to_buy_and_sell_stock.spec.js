import { describe, it, expect } from "vitest";
import { maxProfit } from "../best_time_to_buy_and_sell_stock";

describe("maxProfit - test cases", () => {
	const testCases = [
		{ input: [], expected: 0, description: "empty array" },
		{ input: [5], expected: 0, description: "single price" },
		{ input: [5, 4, 3, 2, 1], expected: 0, description: "decreasing prices" },
		{ input: [1, 2, 3, 4, 5], expected: 4, description: "increasing prices" },
		{ input: [7, 1, 5, 3, 6, 4], expected: 5, description: "general case" },
		{ input: [3, 2, 6, 5, 0, 3], expected: 4, description: "best day not min" },
		{ input: [1, 100, 1, 100], expected: 99, description: "large differences" },
		{ input: [5, 5, 5, 5, 5], expected: 0, description: "repeated prices" },
		{ input: [10, 7, 5, 8, 11, 9], expected: 6, description: "min after max" },
		{ input: [1, 100], expected: 99, description: "two prices profitable" },
		{ input: [100, 1], expected: 0, description: "two prices not profitable" },
		{
			input: [2, 1, 2, 1, 0, 1, 2],
			expected: 2,
			description: "complex scenario",
		},
	];

	testCases.forEach(({ input, expected, description }) => {
		it(`should handle ${description}`, () => {
			expect(maxProfit(input)).toBe(expected);
		});
	});
});
