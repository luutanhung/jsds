import { linearSearch } from "../linear-search";
import { describe, it, expect } from "vitest";

describe("linearSearch", () => {
	it("should return -1 for an empty array", () => {
		expect(linearSearch([], 5)).toBe(-1);
		expect(linearSearch([], "hello")).toBe(-1);
		expect(linearSearch([])).toBe(-1);
	});

	it("should find the element at the beginning of the array", () => {
		expect(linearSearch([1, 2, 3, 4, 5], 1)).toBe(0);
		expect(linearSearch(["a", "b", "c"], "a")).toBe(0);
		expect(linearSearch([true, false], true)).toBe(0);
	});

	it("should find the element at the end of the array", () => {
		expect(linearSearch([1, 2, 3, 4, 5], 5)).toBe(4);
		expect(linearSearch(["a", "b", "c"], "c")).toBe(2);
		expect(linearSearch([true, false], false)).toBe(1);
	});

	it("should find the element in the middle of the array", () => {
		expect(linearSearch([1, 2, 3, 4, 5], 3)).toBe(2);
		expect(linearSearch(["a", "b", "c", "d"], "c")).toBe(2);
	});

	it("should return -1 when the element is not in the array", () => {
		expect(linearSearch([1, 2, 3, 4, 5], 6)).toBe(-1);
		expect(linearSearch(["a", "b", "c"], "d")).toBe(-1);
		expect(linearSearch([true, false], null)).toBe(-1);
	});

	it("should find the first occurrence when there are duplicates", () => {
		expect(linearSearch([1, 2, 3, 2, 5], 2)).toBe(1);
		expect(linearSearch(["a", "b", "c", "b", "d"], "b")).toBe(1);
	});

	it("should work with different data types", () => {
		// Numbers
		expect(linearSearch([10, 20, 30], 20)).toBe(1);

		// Strings
		expect(linearSearch(["hello", "world", "javascript"], "world")).toBe(1);

		// Booleans
		expect(linearSearch([true, false, true], false)).toBe(1);

		// Objects (by reference)
		const obj1 = { id: 1 };
		const obj2 = { id: 2 };
		const obj3 = { id: 3 };
		expect(linearSearch([obj1, obj2, obj3], obj2)).toBe(1);

		// Mixed types
		expect(linearSearch([1, "two", true, null], null)).toBe(3);
	});

	it("should handle special values correctly", () => {
		// null
		expect(linearSearch([null, undefined, 0], null)).toBe(0);

		// undefined
		expect(linearSearch([null, undefined, 0], undefined)).toBe(1);

		// NaN
		expect(linearSearch([NaN, 0, 1], NaN)).toBe(-1); // NaN !== NaN

		// 0 and -0
		expect(linearSearch([0, -0, 1], 0)).toBe(0);
		expect(linearSearch([-0, 0, 1], -0)).toBe(0);
	});

	it("should work with arrays as elements", () => {
		const arr1 = [1, 2];
		const arr2 = [3, 4];
		const arr3 = [5, 6];
		expect(linearSearch([arr1, arr2, arr3], arr2)).toBe(1);
	});

	it("should handle default parameter correctly", () => {
		// When no array is provided, it defaults to []
		expect(linearSearch(undefined, 5)).toBe(-1);
	});

	it("should distinguish between similar values of different types", () => {
		expect(linearSearch([1, "1", true], "1")).toBe(1);
		expect(linearSearch([1, "1", true], 1)).toBe(0);
		expect(linearSearch([0, false, ""], false)).toBe(1);
		expect(linearSearch([0, false, ""], 0)).toBe(0);
	});
});
