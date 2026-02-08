/**
 * We want to find the maximum profit between buying and selling price.
 * The best profit is the largest difference between two prices where:
 * - the smaller price comes first (buying price).
 * - the larger price comes after (selling price).
 *
 * In other words, we are looking for the maximum result of:
 *  prices[r] - prices[l] where l < r
 *
 * Key insight
 * When the price at r becomes smaller than price at l, the best possible profit involving the old l must be in the range [l, r - 1]
 * Because future profits using old l will always be worse than using the new lower price at r.
 * Therefore we safely move l to r.
 */

/**
 * @param {number[]} prices
 * @param {number}
 */
export const maxProfit = function (prices) {
	const n = prices.length;
	let l = 0,
		r = 1,
		profit = 0;
	while (r < n) {
		if (prices[l] >= prices[r]) {
			l = r;
			r += 1;
		} else {
			profit = Math.max(prices[r] - prices[l], profit);
			r += 1;
		}
	}

	return profit;
};
