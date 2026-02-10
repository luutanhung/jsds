import { linearSearchWithSentinel } from "../linear-search";
import { describe, it, expect } from "vitest";

describe("linearSearchWithSentinel", () => {
	it("should return -1 for an empty array", () => {
		expect(linearSearchWithSentinel([], 5)).toBe(-1);
		expect(linearSearchWithSentinel([], "hello")).toBe(-1);
		expect(linearSearchWithSentinel()).toBe(-1);
	});

	it("should find the element at the beginning of the array", () => {
		expect(linearSearchWithSentinel([1, 2, 3, 4, 5], 1)).toBe(0);
		expect(linearSearchWithSentinel(["a", "b", "c"], "a")).toBe(0);
		expect(linearSearchWithSentinel([true, false], true)).toBe(0);
	});

	it("should find the element at the end of the array", () => {
		expect(linearSearchWithSentinel([1, 2, 3, 4, 5], 5)).toBe(4);
		expect(linearSearchWithSentinel(["a", "b", "c"], "c")).toBe(2);
		expect(linearSearchWithSentinel([true, false], false)).toBe(1);
	});

	it("should find the element in the middle of the array", () => {
		expect(linearSearchWithSentinel([1, 2, 3, 4, 5], 3)).toBe(2);
		expect(linearSearchWithSentinel(["a", "b", "c", "d"], "c")).toBe(2);
	});

	it("should return -1 when the element is not in the array", () => {
		expect(linearSearchWithSentinel([1, 2, 3, 4, 5], 6)).toBe(-1);
		expect(linearSearchWithSentinel(["a", "b", "c"], "d")).toBe(-1);
		expect(linearSearchWithSentinel([true, false], null)).toBe(-1);
	});

	it("should find the first occurrence when there are duplicates", () => {
		expect(linearSearchWithSentinel([1, 2, 3, 2, 5], 2)).toBe(1);
		expect(linearSearchWithSentinel(["a", "b", "c", "b", "d"], "b")).toBe(1);
	});

	it("should work with different data types", () => {
		// Numbers
		expect(linearSearchWithSentinel([10, 20, 30], 20)).toBe(1);

		// Strings
		expect(
			linearSearchWithSentinel(["hello", "world", "javascript"], "world"),
		).toBe(1);

		// Booleans
		expect(linearSearchWithSentinel([true, false, true], false)).toBe(1);

		// Objects (by reference)
		const obj1 = { id: 1 };
		const obj2 = { id: 2 };
		const obj3 = { id: 3 };
		expect(linearSearchWithSentinel([obj1, obj2, obj3], obj2)).toBe(1);

		// Mixed types
		expect(linearSearchWithSentinel([1, "two", true, null], null)).toBe(3);
	});

	it("should handle special values correctly", () => {
		// null
		expect(linearSearchWithSentinel([null, undefined, 0], null)).toBe(0);

		// undefined
		expect(linearSearchWithSentinel([null, undefined, 0], undefined)).toBe(1);

		// NaN
		expect(linearSearchWithSentinel([NaN, 0, 1], NaN)).toBe(-1); // NaN !== NaN

		// 0 and -0
		expect(linearSearchWithSentinel([0, -0, 1], 0)).toBe(0);
		expect(linearSearchWithSentinel([-0, 0, 1], -0)).toBe(0);
	});

	it("should work with arrays as elements", () => {
		const arr1 = [1, 2];
		const arr2 = [3, 4];
		const arr3 = [5, 6];
		expect(linearSearchWithSentinel([arr1, arr2, arr3], arr2)).toBe(1);
	});

	it("should handle default parameter correctly", () => {
		// When no array is provided, it defaults to []
		expect(linearSearchWithSentinel(undefined, 5)).toBe(-1);
	});

	it("should distinguish between similar values of different types", () => {
		expect(linearSearchWithSentinel([1, "1", true], "1")).toBe(1);
		expect(linearSearchWithSentinel([1, "1", true], 1)).toBe(0);
		expect(linearSearchWithSentinel([0, false, ""], false)).toBe(1);
		expect(linearSearchWithSentinel([0, false, ""], 0)).toBe(0);
	});

	it("should not modify the original array", () => {
		const originalArray = [1, 2, 3, 4, 5];
		const originalLength = originalArray.length;
		const result = linearSearchWithSentinel(originalArray, 10); // Element not in array

		// The original array should remain unchanged
		expect(originalArray.length).toBe(originalLength);
		expect(originalArray).toEqual([1, 2, 3, 4, 5]);
		expect(result).toBe(-1);
	});

	it("should not modify the original array when element is found", () => {
		const originalArray = [1, 2, 3, 4, 5];
		const originalLength = originalArray.length;
		const result = linearSearchWithSentinel(originalArray, 3); // Element in array

		// The original array should remain unchanged
		expect(originalArray.length).toBe(originalLength);
		expect(originalArray).toEqual([1, 2, 3, 4, 5]);
		expect(result).toBe(2);
	});

	it("should work with complex nested objects", () => {
		const complexObj1 = { id: 1, nested: { value: "a" } };
		const complexObj2 = { id: 2, nested: { value: "b" } };
		const complexArray = [complexObj1, complexObj2];

		expect(linearSearchWithSentinel(complexArray, complexObj2)).toBe(1);

		// Original array should remain unchanged
		expect(complexArray).toEqual([complexObj1, complexObj2]);
	});
});
