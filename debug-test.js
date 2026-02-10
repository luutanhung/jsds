import { linearSearchWithSentinel } from "./searching/linear-search.js";

// Simple test to debug the function
console.log("Testing linearSearchWithSentinel...");

try {
	const result = linearSearchWithSentinel([1, 2, 3], 2);
	console.log("Result:", result);
} catch (error) {
	console.error("Error:", error.message);
}
