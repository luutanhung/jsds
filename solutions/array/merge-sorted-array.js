/**
 * 88. Merge Sorted Array
 *
 * Problem:
 * Give two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
 *
 * Example:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 *
 * Output:
 * [1,2,2,3,5,6]
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

export const merge = function (nums1, m, nums2, n) {
  const temp = nums1.slice(0, m);

  let i = 0,
    j = 0,
    k = 0;

  while (i < m && j < n) {
    if (temp[i] <= nums2[j]) {
      nums1[k] = temp[i];
      i += 1;
    } else {
      nums1[k] = nums2[j];
      j += 1;
    }
    k += 1;
  }

  while (i < m) {
    nums1[k] = temp[i];
    i += 1;
    k += 1;
  }

  while (j < n) {
    nums1[k] = nums2[j];
    j += 1;
    k += 1;
  }

  return nums1;
};
