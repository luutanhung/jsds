import { describe, expect, test } from "vitest";

import { merge } from "../merge-sorted-array";

describe("merge sorted array", () => {
  describe("basic cases", () => {
    test("merges two non-empty arrays with overlapping elements", () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      const m = nums1.indexOf(0);
      const nums2 = [2, 5, 6];
      const n = nums2.length;
      const expected = [1, 2, 2, 3, 5, 6];

      const result = merge(nums1, m, nums2, n);

      expect(result).toEqual(expected);
    });

    test("merges when nums1 is empty", () => {
      const nums1 = [0];
      const m = 0;
      const nums2 = [1];
      const n = 1;
      const expected = [1];

      const result = merge(nums1, m, nums2, n);
      expect(result).toEqual(expected);
    });

    test("merges when nums2 is empty", () => {
      const nums1 = [1, 2, 3];
      const m = 3;
      const nums2 = [];
      const n = 0;
      const expected = [1, 2, 3];

      const result = merge(nums1, m, nums2, n);
      expect(result).toEqual(expected);
    });
  });

  describe("edge cases", () => {
    test("empty nums1", () => {
      const nums1 = [0];
      expect(merge(nums1, 0, [1], 1)).toEqual([1]);
    });

    test("empty nums2", () => {
      const nums1 = [1, 2, 3];
      expect(merge(nums1, 3, [], 0)).toEqual([1, 2, 3]);
    });
  });

  describe("in-place modification", () => {
    test("modifies nums1 in place", () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      const result = merge(nums1, 3, [2, 5, 6], 3);
      expect(result).toBe(nums1); // Same reference
    });

    test("does not modify nums2", () => {
      const nums1 = [1, 2, 3, 0, 0, 0];
      const nums2 = [2, 5, 6];
      const nums2Copy = [...nums2];
      merge(nums1, 3, nums2, 3);
      expect(nums2).toEqual(nums2Copy);
    });
  });
});
