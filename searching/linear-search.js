/**
 * Performs a linear search to find the first occurence of a key in an array.
 *
 * Linear search iterates through each element of the array sequentially until
 * the target element is found or the end of the array is reached.
 *
 * @param {Array} arr - The array to search through. Can contains elements of any type.
 * @param {any} key - The element to search for in the array. Can be of any type.
 *
 * @returns {number} The zero-based index of the first occurrence of the key in the array.
 *                  Return -1 if the key is not found or if the array is empty.
 *
 * @example
 * // Basic example with numbers
 * linearSearch([1, 3, 5, 7, 9], 5); // returns 2
 *
 * @example
 * // Searching for strings
 * linearSearch(['apple', 'banana', 'cherry'], 'banana'); // returns 1
 *
 * @complexity
 * - Time complexity: O(n) - In the worst case, every element must be checked.
 * - Space complexity: O(1) - Uses only a constant amount of extra spaces.
 */
export const linearSearch = (arr = [], key) => {
	const n = arr.length;
	if (n === 0) return -1;

	for (let i = 0; i < arr.length; i += 1) {
		if (arr[i] === key) {
			return i;
		}
	}

	return -1;
};

/**
 * Performs a linear search with a sentinel to find the first occurrence of a key in an array.
 *
 * This variant of linear search adds the key as a sentinel value at the end of the array,
 * eliminating the need to check array bounds in the loop. This reduces the number of
 * comparisons per iteration from 2 (element comparison and bounds check) to 1 (element comparison),
 * which can slightly improve performance in practice.
 *
 * Note: This implementation the array by adding the sentinel value,
 * but returns the correct result by checking if the found index equals the original length.
 *
 * @param {Array} arr - The array to search through. Can contain elements of any type.
 * @param {any} key - The element to search for in the array. Can be of any type.
 *
 * @returns {number} The zero-based index of the first occurrence of the key in the array.
 *                  Returns -1 if the key is not found or if the array is empty.
 *
 * @example
 * // Basic example with numbers
 * linearSearchWithSentinel([1, 3, 5, 7, 9], 5); // returns 2
 *
 * @example
 * // Searching for strings
 * linearSearchWithSentinel(['apple', 'banana', 'cherry'], 'banana'); // returns 1
 *
 * @example
 * // Element not found
 * linearSearchWithSentinel([1, 3, 5, 7, 9], 4); // returns -1
 *
 * @complexity
 * - Time complexity: O(n) - In the worst case, every element must be checked.
 * - Space complexity: O(1) - Uses only a constant amount of extra space.
 */
export const linearSearchWithSentinel = (arr = [], key) => {
	const n = arr.length;
	if (n === 0) return -1;

	if (Number.isNaN(key)) return -1;

	const last = arr[n - 1];
	arr[n - 1] = key;

	let i = 0;

	while (arr[i] !== key) i += 1;

	arr[n - 1] = last;
	if (i < n - 1 || last === key) {
		return i;
	}

	return -1;
};
