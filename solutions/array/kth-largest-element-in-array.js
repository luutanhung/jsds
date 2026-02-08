import { BinaryHeap } from "../../data-structures/heap";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
export const findKthLargest = function (nums = [], k) {
	const minHeap = new BinaryHeap();
	for (let i = 0; i < nums.length; i += 1) {
		minHeap.insert(nums[i]);
		if (minHeap.size() > k) {
			minHeap.delete();
		}
	}
	return minHeap.peak();
};
