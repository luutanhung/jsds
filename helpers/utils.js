/**
 * Swaps two elements in an array in-place using destructuring assignment.
 *
 * @param {Array} arr - The array containing elements to swap.
 * @param {number} i - The index of the first element.
 * @param {number} j - The index of the second element.
 */
export const swap = (arr, i, j) => {
	[arr[i], arr[j]] = [arr[j], arr[i]];
};
