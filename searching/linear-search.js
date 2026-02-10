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
 * linearSearch([1, 3, 5, 7, 9]); // returns 2
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
	if (arr.length === 0) {
		return -1;
	}

	for (let i = 0; i < arr.length; i += 1) {
		if (arr[i] === key) {
			return i;
		}
	}

	return -1;
};
