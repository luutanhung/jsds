export class BinaryHeap {
	constructor(iterable, comparator = (a, b) => a - b) {
		this.tree = [];
		this.comparator = comparator;

		for (const val of iterable || []) {
			this.insert(val);
		}
	}

	parent(idx) {
		return Math.floor((idx - 1) / 2);
	}

	left(idx) {
		return 2 * idx + 1;
	}

	right(idx) {
		return 2 * idx + 2;
	}

	peak() {
		if (this.tree.length) {
			return this.tree[0];
		}
		return null;
	}

	size() {
		return this.tree.length;
	}

	isEmpty() {
		return this.tree.length === 0;
	}

	findTop() {
		return this.peak();
	}

	heapifyUp(idx) {
		if (idx === 0) {
			return;
		}

		const parentIdx = this.parent(idx);
		const parentVal = this.tree[parentIdx];
		const childVal = this.tree[idx];

		if (this.comparator(parentVal, childVal) > 0) {
			// Swap parent and child
			[this.tree[parentIdx], this.tree[idx]] = [
				this.tree[idx],
				this.tree[parentIdx],
			];
			this.heapifyUp(parentIdx);
		}
	}

	heapifyDown(idx) {
		const leftIdx = this.left(idx);
		const rightIdx = this.right(idx);

		let smallestIdx = idx;

		// Check if left child exists and is smaller than current
		if (
			leftIdx < this.tree.length &&
			this.comparator(this.tree[leftIdx], this.tree[smallestIdx]) < 0
		) {
			smallestIdx = leftIdx;
		}

		// Check if right child exists and is smaller than current smallest
		if (
			rightIdx < this.tree.length &&
			this.comparator(this.tree[rightIdx], this.tree[smallestIdx]) < 0
		) {
			smallestIdx = rightIdx;
		}

		// If smallest is not the current node, swap and continue heapifying
		if (smallestIdx !== idx) {
			[this.tree[idx], this.tree[smallestIdx]] = [
				this.tree[smallestIdx],
				this.tree[idx],
			];
			this.heapifyDown(smallestIdx);
		}
	}

	insert(val) {
		this.tree.push(val);
		this.heapifyUp(this.tree.length - 1);
	}

	delete() {
		if (this.tree.length === 0) return undefined;

		const topVal = this.tree[0];

		if (this.tree.length === 1) {
			this.tree = [];
			return topVal;
		}

		// Move last element to root and remove last element
		this.tree[0] = this.tree[this.tree.length - 1];
		this.tree.pop();

		// Restore heap property
		if (this.tree.length > 0) {
			this.heapifyDown(0);
		}

		return topVal;
	}

	extract() {
		return this.delete();
	}
}
