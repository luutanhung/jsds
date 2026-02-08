import { describe, expect, test } from "vitest";

import { findKthLargest } from "../kth-largest-element-in-array.js";

describe("Kth largest element in an array", () => {
	test("returns the kth largest element in an array", () => {
		const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
		const k = 4;
		const expected = 4;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles array with unique elements", () => {
		const nums = [3, 2, 1, 5, 6, 4];
		const k = 2;
		const expected = 5;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles array with duplicate elements", () => {
		const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
		const k = 1;
		const expected = 6;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles k equals 1 (largest element)", () => {
		const nums = [1, 2, 3, 4, 5];
		const k = 1;
		const expected = 5;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles k equals array length (smallest element)", () => {
		const nums = [1, 2, 3, 4, 5];
		const k = 5;
		const expected = 1;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles array with single element", () => {
		const nums = [42];
		const k = 1;
		const expected = 42;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles array with two elements", () => {
		const nums = [1, 2];
		const k1 = 1;
		const k2 = 2;
		const expected1 = 2;
		const expected2 = 1;

		const result1 = findKthLargest(nums, k1);
		const result2 = findKthLargest(nums, k2);
		expect(result1).toBe(expected1);
		expect(result2).toBe(expected2);
	});

	test("handles array with all identical elements", () => {
		const nums = [7, 7, 7, 7, 7];
		const k = 3;
		const expected = 7;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles reverse sorted array", () => {
		const nums = [9, 7, 5, 3, 1];
		const k = 3;
		const expected = 5;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles sorted array", () => {
		const nums = [1, 3, 5, 7, 9];
		const k = 3;
		const expected = 5;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles negative numbers", () => {
		const nums = [-1, -3, -2, -5, -4];
		const k = 2;
		const expected = -2;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles mixed positive and negative numbers", () => {
		const nums = [-1, 3, -2, 5, -4];
		const k = 3;
		const expected = -1;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles large array", () => {
		const nums = Array.from({ length: 1000 }, (_, i) => i + 1); // [1, 2, 3, ..., 1000]
		const k = 100;
		const expected = 901; // 100th largest in [1,2,...,1000] is 901

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles array with zeros", () => {
		const nums = [0, 1, 0, -1, 2];
		const k = 3;
		const expected = 0;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});

	test("handles k equals array length with duplicates", () => {
		const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
		const k = 9;
		const expected = 1;

		const result = findKthLargest(nums, k);
		expect(result).toBe(expected);
	});
});
