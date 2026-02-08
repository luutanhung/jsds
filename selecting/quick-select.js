import { swap } from "../helpers";

export const quickSelect = (arr, k, left, right = arr.length - 1) => {
	if (left === right) return arr[left];

	const pivot = arr[right];
	let ptr = left;
	for (let i = left; i < right; i += 1) {
		if (arr[i] <= pivot) {
			swap(arr, i, ptr);
			ptr += 1;
		}
	}

	swap(arr, ptr, right);

	if (ptr === k) {
		return arr[ptr];
	} else if (ptr < k) {
		return quickSelect(arr, k, ptr + 1, right);
	} else {
		return quickSelect(arr, k, left, ptr - 1);
	}
};
