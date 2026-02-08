import { describe, expect, test } from "vitest";

import { BinaryHeap } from "../binary-heap";

describe("BinaryHeap", () => {
	// Min Heap Tests
	test("constructs a min heap correctly", () => {
		const arr = [12, 3, 5, 7, 19];
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap(arr, comparatorFunc);

		// The minimum element should be at the root
		expect(minHeap.peak()).toBe(3);
		expect(minHeap.size()).toBe(5);
	});

	test("inserts elements into min heap maintaining heap property", () => {
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap([], comparatorFunc);

		minHeap.insert(5);
		expect(minHeap.peak()).toBe(5);

		minHeap.insert(3);
		expect(minHeap.peak()).toBe(3);

		minHeap.insert(7);
		expect(minHeap.peak()).toBe(3);

		minHeap.insert(1);
		expect(minHeap.peak()).toBe(1);
	});

	test("deletes minimum element from min heap maintaining heap property", () => {
		const arr = [12, 3, 5, 7, 19];
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap(arr, comparatorFunc);

		const deleted = minHeap.delete();
		expect(deleted).toBe(3); // minimum element
		expect(minHeap.peak()).toBe(5); // next minimum

		const deleted2 = minHeap.delete();
		expect(deleted2).toBe(5);
		expect(minHeap.peak()).toBe(7);
	});

	test("extract method works the same as delete in min heap", () => {
		const arr = [10, 5, 8, 3];
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap(arr, comparatorFunc);

		const extracted = minHeap.extract();
		expect(extracted).toBe(3);
		expect(minHeap.peak()).toBe(5);
	});

	test("returns correct size and emptiness status", () => {
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap([], comparatorFunc);

		expect(minHeap.isEmpty()).toBe(true);
		expect(minHeap.size()).toBe(0);

		minHeap.insert(10);
		expect(minHeap.isEmpty()).toBe(false);
		expect(minHeap.size()).toBe(1);

		minHeap.insert(5);
		expect(minHeap.size()).toBe(2);

		minHeap.delete();
		expect(minHeap.size()).toBe(1);

		minHeap.delete();
		expect(minHeap.size()).toBe(0);
		expect(minHeap.isEmpty()).toBe(true);
	});

	test("handles empty heap operations gracefully", () => {
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap([], comparatorFunc);

		expect(minHeap.peak()).toBeNull();
		expect(minHeap.delete()).toBeUndefined();
		expect(minHeap.extract()).toBeUndefined();
		expect(minHeap.isEmpty()).toBe(true);
		expect(minHeap.size()).toBe(0);
	});

	test("handles single element heap", () => {
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap([42], comparatorFunc);

		expect(minHeap.peak()).toBe(42);
		expect(minHeap.size()).toBe(1);

		const deleted = minHeap.delete();
		expect(deleted).toBe(42);
		expect(minHeap.peak()).toBeNull();
		expect(minHeap.size()).toBe(0);
		expect(minHeap.isEmpty()).toBe(true);
	});

	test("handles duplicate values in min heap", () => {
		const arr = [5, 3, 5, 3, 1, 1];
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap(arr, comparatorFunc);

		expect(minHeap.peak()).toBe(1);

		const deleted1 = minHeap.delete();
		expect(deleted1).toBe(1);

		const deleted2 = minHeap.delete();
		expect(deleted2).toBe(1);

		expect(minHeap.peak()).toBe(3);
	});

	// Max Heap Tests
	test("constructs a max heap correctly", () => {
		const arr = [12, 3, 5, 7, 19];
		const comparatorFunc = (a, b) => b - a;
		const maxHeap = new BinaryHeap(arr, comparatorFunc);

		// The maximum element should be at the root
		expect(maxHeap.peak()).toBe(19);
		expect(maxHeap.size()).toBe(5);
	});

	test("inserts elements into max heap maintaining heap property", () => {
		const comparatorFunc = (a, b) => b - a;
		const maxHeap = new BinaryHeap([], comparatorFunc);

		maxHeap.insert(5);
		expect(maxHeap.peak()).toBe(5);

		maxHeap.insert(3);
		expect(maxHeap.peak()).toBe(5);

		maxHeap.insert(7);
		expect(maxHeap.peak()).toBe(7);

		maxHeap.insert(1);
		expect(maxHeap.peak()).toBe(7);
	});

	test("deletes maximum element from max heap maintaining heap property", () => {
		const arr = [12, 3, 5, 7, 19];
		const comparatorFunc = (a, b) => b - a;
		const maxHeap = new BinaryHeap(arr, comparatorFunc);

		const deleted = maxHeap.delete();
		expect(deleted).toBe(19); // maximum element
		expect(maxHeap.peak()).toBe(12); // next maximum

		const deleted2 = maxHeap.delete();
		expect(deleted2).toBe(12);
		expect(maxHeap.peak()).toBe(7);
	});

	test("handles duplicate values in max heap", () => {
		const arr = [5, 8, 5, 8, 1, 1];
		const comparatorFunc = (a, b) => b - a;
		const maxHeap = new BinaryHeap(arr, comparatorFunc);

		expect(maxHeap.peak()).toBe(8);

		const deleted1 = maxHeap.delete();
		expect(deleted1).toBe(8);

		const deleted2 = maxHeap.delete();
		expect(deleted2).toBe(8);

		expect(maxHeap.peak()).toBe(5);
	});

	test("maintains heap property after multiple operations", () => {
		const comparatorFunc = (a, b) => a - b;
		const minHeap = new BinaryHeap([], comparatorFunc);

		// Insert multiple elements
		[10, 5, 20, 1, 15, 30, 2].forEach((val) => minHeap.insert(val));

		// Extract elements and verify they come out in sorted order
		const extracted = [];
		while (!minHeap.isEmpty()) {
			extracted.push(minHeap.delete());
		}

		expect(extracted).toEqual([1, 2, 5, 10, 15, 20, 30]);
	});

	test("works correctly with string values using custom comparator", () => {
		const arr = ["banana", "apple", "cherry", "date"];
		// Sort alphabetically (min heap for strings)
		const comparatorFunc = (a, b) => a.localeCompare(b);
		const stringHeap = new BinaryHeap(arr, comparatorFunc);

		expect(stringHeap.peak()).toBe("apple");

		const extracted = [];
		while (!stringHeap.isEmpty()) {
			extracted.push(stringHeap.delete());
		}

		expect(extracted).toEqual(["apple", "banana", "cherry", "date"]);
	});
});
