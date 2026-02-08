import { describe, expect, it } from "vitest";
import { bitmapSelect } from "../bitmap-selection";

describe("bitmapSelect", () => {
	// Test basic functionality with simple cases
	it("should return the k-th smallest element in a simple array", () => {
		const arr = [3, 1, 4, 2];

		expect(bitmapSelect(arr, 0)).toBe(1); // smallest
		expect(bitmapSelect(arr, 1)).toBe(2); // second smallest
		expect(bitmapSelect(arr, 2)).toBe(3); // third smallest
		expect(bitmapSelect(arr, 3)).toBe(4); // largest
	});

	it("should work with negative numbers", () => {
		const arr = [-3, -1, -4, -2];

		expect(bitmapSelect(arr, 0)).toBe(-4); // smallest
		expect(bitmapSelect(arr, 1)).toBe(-3); // second smallest
		expect(bitmapSelect(arr, 2)).toBe(-2); // third smallest
		expect(bitmapSelect(arr, 3)).toBe(-1); // largest
	});

	it("should work with mixed positive and negative numbers", () => {
		const arr = [3, -1, 4, -2, 0];

		expect(bitmapSelect(arr, 0)).toBe(-2); // smallest
		expect(bitmapSelect(arr, 1)).toBe(-1); // second smallest
		expect(bitmapSelect(arr, 2)).toBe(0); // third smallest
		expect(bitmapSelect(arr, 3)).toBe(3); // fourth smallest
		expect(bitmapSelect(arr, 4)).toBe(4); // largest
	});

	it("should handle single element arrays", () => {
		const arr = [42];

		expect(bitmapSelect(arr, 0)).toBe(42);
		expect(bitmapSelect(arr, 1)).toBeUndefined(); // out of bounds
	});

	it("should return undefined when k is out of bounds", () => {
		const arr = [1, 2, 3];

		expect(bitmapSelect(arr, 3)).toBeUndefined(); // k too large
		expect(bitmapSelect(arr, -1)).toBeUndefined(); // k too small
	});

	it("should throw an error when duplicate values are present", () => {
		const arr = [1, 2, 2, 3];

		expect(() => bitmapSelect(arr, 1)).toThrow("Cannot set duplicate values.");
	});

	it("should work with subarrays defined by from and to indices", () => {
		const arr = [5, 1, 3, 9, 2, 7];

		// Subarray [1, 3, 9] (indices 1-3)
		expect(bitmapSelect(arr, 0, 1, 3)).toBe(1);
		expect(bitmapSelect(arr, 1, 1, 3)).toBe(3);
		expect(bitmapSelect(arr, 2, 1, 3)).toBe(9);

		// Subarray [3, 9, 2] (indices 2-4)
		expect(bitmapSelect(arr, 0, 2, 4)).toBe(2);
		expect(bitmapSelect(arr, 1, 2, 4)).toBe(3);
		expect(bitmapSelect(arr, 2, 2, 4)).toBe(9);
	});

	it("should handle edge case where from equals to", () => {
		const arr = [10, 20, 30];

		expect(bitmapSelect(arr, 0, 1, 1)).toBe(20); // Just element at index 1
		expect(bitmapSelect(arr, 1, 1, 1)).toBeUndefined(); // k out of bounds for single element
	});

	it("should work with consecutive numbers", () => {
		const arr = [1, 2, 3, 4, 5];

		expect(bitmapSelect(arr, 0)).toBe(1);
		expect(bitmapSelect(arr, 1)).toBe(2);
		expect(bitmapSelect(arr, 2)).toBe(3);
		expect(bitmapSelect(arr, 3)).toBe(4);
		expect(bitmapSelect(arr, 4)).toBe(5);
	});

	it("should work with reverse sorted array", () => {
		const arr = [5, 4, 3, 2, 1];

		expect(bitmapSelect(arr, 0)).toBe(1);
		expect(bitmapSelect(arr, 1)).toBe(2);
		expect(bitmapSelect(arr, 2)).toBe(3);
		expect(bitmapSelect(arr, 3)).toBe(4);
		expect(bitmapSelect(arr, 4)).toBe(5);
	});

	it("should handle large gaps between numbers", () => {
		const arr = [1, 100, 200, 500];

		expect(bitmapSelect(arr, 0)).toBe(1);
		expect(bitmapSelect(arr, 1)).toBe(100);
		expect(bitmapSelect(arr, 2)).toBe(200);
		expect(bitmapSelect(arr, 3)).toBe(500);
	});

	it("should handle empty array", () => {
		const arr = [];

		expect(bitmapSelect(arr, 0)).toBeUndefined();
	});

	it("should handle default parameters correctly", () => {
		const arr = [3, 1, 4, 2];

		// Using default from=0 and to=arr.length-1
		expect(bitmapSelect(arr, 0)).toBe(1);
		expect(bitmapSelect(arr, 1)).toBe(2);
		expect(bitmapSelect(arr, 2)).toBe(3);
		expect(bitmapSelect(arr, 3)).toBe(4);
	});

	it("should handle array with zeros", () => {
		const arr = [0, -5, 5, 0]; // This should throw an error due to duplicates

		expect(() => bitmapSelect(arr, 1)).toThrow("Cannot set duplicate values.");

		// Test with unique values including zero
		const uniqueArr = [0, -5, 5, 3];
		expect(bitmapSelect(uniqueArr, 0)).toBe(-5);
		expect(bitmapSelect(uniqueArr, 1)).toBe(0);
		expect(bitmapSelect(uniqueArr, 2)).toBe(3);
		expect(bitmapSelect(uniqueArr, 3)).toBe(5);
	});
});
