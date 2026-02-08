/**
 * Selects the k-th smallest element from a subarray using bitmap selection algorithm.
 * Creates a bitmap representation of the elements in the range [from, to] and finds the k-th smallest element.
 *
 * @param {Array<number>} arr - The input array of numbers
 * @param {number} k - The index (relative to the subarray) of the element to select (0-indexed)
 * @param {number} from - The starting index of the subarray (inclusive)
 * @param {number} to - The ending index of the subarray (inclusive)
 * @returns {number|undefined} - The k-th smallest element in the subarray, or undefined if k is out of bounds
 * @throws {Error} - If duplicate values are found in the subarray
 */
export const bitmapSelect = (arr = [], k, from = 0, to = arr.length - 1) => {
	const copy = arr.slice(from, to + 1);

	// Handle empty subarray case
	if (copy.length === 0) {
		return undefined;
	}

	const minVal = Math.min(...copy);
	const maxVal = Math.max(...copy);
	const bitmap = new Array(maxVal - minVal + 1).fill(false);

	for (let i = 0; i < copy.length; i += 1) {
		if (bitmap[copy[i] - minVal]) {
			throw new Error("Cannot set duplicate values.");
		} else {
			bitmap[copy[i] - minVal] = true;
		}
	}

	for (let i = minVal, j = 0; i <= maxVal; i += 1) {
		if (bitmap[i - minVal]) {
			if (j === k) {
				return i;
			}
			j += 1;
		}
	}

	// Return undefined if k is out of bounds
	return undefined;
};
