import { describe, expect, it } from "vitest";
import { MPromise } from "../mpromise.js";

describe("MPromise", () => {
	describe("constructor", () => {
		it("should create a pending promise when executor is provided", () => {
			const promise = new MPromise(() => {});
			expect(promise.state).toBe("PENDING");
			expect(promise.value).toBeUndefined();
		});

		it("should call executor function immediately", () => {
			let called = false;
			new MPromise(() => {
				called = true;
			});
			expect(called).toBe(true);
		});

		it("should handle synchronous resolution", async () => {
			const promise = new MPromise((resolve) => {
				resolve("success");
			});

			// Wait for microtasks to complete
			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(promise.state).toBe("Fulfilled");
			expect(promise.value).toBe("success");
		});

		it("should handle synchronous rejection", async () => {
			const error = new Error("test error");
			const promise = new MPromise((_, reject) => {
				reject(error);
			});

			// Wait for microtasks to complete
			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(promise.state).toBe("Rejected");
			expect(promise.value).toBe(error);
		});

		it("should reject if executor throws an error", async () => {
			const error = new Error("executor error");
			const promise = new MPromise(() => {
				throw error;
			});

			// Wait for microtasks to complete
			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(promise.state).toBe("Rejected");
			expect(promise.value).toBe(error);
		});

		it("should not change state once settled", async () => {
			const promise = new MPromise((resolve, reject) => {
				resolve("first");
				reject("second");
				resolve("third");
			});

			// Wait for microtasks to complete
			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(promise.state).toBe("Fulfilled");
			expect(promise.value).toBe("first");
		});
	});

	describe("then", () => {
		it("should register fulfillment handler for pending promise", async () => {
			const promise = new MPromise((resolve) => {
				setTimeout(() => resolve("data"), 10);
			});

			// Wait for the promise to resolve
			const result = await promise;
			expect(result).toBe("data");
		});

		it("should register fulfillment handler for already fulfilled promise", async () => {
			const promise = new MPromise((resolve) => resolve("data"));

			// Wait for microtasks to complete
			await new Promise((resolve) => setTimeout(resolve, 10));

			const result = await promise;
			expect(result).toBe("data");
		});

		it("should register rejection handler for already rejected promise", async () => {
			const error = new Error("test error");
			const promise = new MPromise((_, reject) => reject(error));

			// Wait for microtasks to complete
			await new Promise((resolve) => setTimeout(resolve, 10));

			await expect(promise).rejects.toEqual(error);
		});

		it("should return a new promise", () => {
			const promise = new MPromise((resolve) => resolve("data"));
			const chainedPromise = promise.then();
			expect(chainedPromise).toBeInstanceOf(MPromise);
			expect(chainedPromise).not.toBe(promise);
		});

		it("should chain values through then", async () => {
			const result = await new MPromise((resolve) => resolve("initial")).then(
				(value) => value + "-modified",
			);

			expect(result).toBe("initial-modified");
		});

		it("should propagate errors through then", async () => {
			const error = new Error("test error");
			const result = new MPromise((_, reject) => reject(error)).then(
				() => "should not reach here",
			);

			await expect(result).rejects.toEqual(error);
		});

		it("should handle throwing in fulfillment handler", async () => {
			const error = new Error("handler error");
			const result = new MPromise((resolve) => resolve("data")).then(() => {
				throw error;
			});

			await expect(result).rejects.toEqual(error);
		});

		it("should handle returning promises in handlers", async () => {
			const innerPromise = new MPromise((resolve) => resolve("inner"));
			const result = await new MPromise((resolve) => resolve("outer")).then(
				() => innerPromise,
			);

			expect(result).toBe("inner");
		});

		it("should handle promise that resolves to itself (cycle detection)", (done) => {
			const promise = new MPromise((resolve) => resolve("original"));
			const cyclicPromise = promise.then(() => {
				// Return the same promise to create a cycle
				return cyclicPromise;
			});

			cyclicPromise.catch((error) => {
				expect(error).toBeInstanceOf(TypeError);
				expect(error.message).toContain("Chaining cycle detected");
				done();
			});
		});
	});

	describe("catch", () => {
		it("should register rejection handler", async () => {
			const error = new Error("test error");
			const result = await new MPromise((_, reject) => reject(error)).catch(
				(err) => err,
			);
			expect(result).toBe(error);
		});

		it("should be equivalent to then(undefined, onRejected)", async () => {
			const error = new Error("test error");
			const promise1 = new MPromise((_, reject) => reject(error));
			const promise2 = new MPromise((_, reject) => reject(error));

			const result1 = await promise1.catch((err) => err);
			const result2 = await promise2.then(undefined, (err) => err);

			expect(result1).toBe(error);
			expect(result2).toBe(error);
		});

		it("should not catch fulfilled promises", async () => {
			const result = await new MPromise((resolve) => resolve("success")).catch(
				() => "caught",
			);

			expect(result).toBe("success");
		});
	});

	describe("finally", () => {
		it("should call finally callback on fulfillment", async () => {
			let finallyCalled = false;
			const result = await new MPromise((resolve) => resolve("data")).finally(
				() => {
					finallyCalled = true;
				},
			);

			expect(finallyCalled).toBe(true);
			expect(result).toBe("data");
		});

		it("should call finally callback on rejection", async () => {
			let finallyCalled = false;
			const error = new Error("test error");
			const result = await new MPromise((_, reject) => reject(error))
				.finally(() => {
					finallyCalled = true;
				})
				.catch((err) => err);

			expect(finallyCalled).toBe(true);
			expect(result).toBe(error);
		});

		it("should preserve original value/reason even if finally throws", async () => {
			const error = new Error("original error");
			const result = await new MPromise((_, reject) => reject(error))
				.finally(() => {
					throw new Error("finally error");
				})
				.catch((err) => err);

			// The original error should still be propagated
			expect(result).toBe(error);
		});

		it("should wait for finally callback to resolve if it returns a promise", async () => {
			const result = await new MPromise((resolve) => resolve("data")).finally(
				() => new MPromise((res) => setTimeout(() => res("finally-done"), 10)),
			);

			expect(result).toBe("data");
		});
	});

	describe("static methods", () => {
		describe("resolve", () => {
			it("should return the same promise if MPromise is passed", () => {
				const original = new MPromise(() => {});
				const resolved = MPromise.resolve(original);
				expect(resolved).toBe(original);
			});

			it("should wrap non-MPromise value in MPromise", async () => {
				const resolved = MPromise.resolve("test value");
				const result = await resolved;
				expect(result).toBe("test value");
			});

			it("should handle promise-like objects", async () => {
				const promiseLike = {
					then: (onFulfilled) => onFulfilled("promise-like value"),
				};
				const resolved = MPromise.resolve(promiseLike);
				const result = await resolved;
				expect(result).toBe("promise-like value");
			});
		});

		describe("reject", () => {
			it("should create a rejected promise", async () => {
				const error = new Error("rejection test");
				const rejected = MPromise.reject(error);
				await expect(rejected).rejects.toEqual(error);
			});
		});

		describe("all", () => {
			it("should resolve with array of all resolved values", async () => {
				const promises = [
					MPromise.resolve(1),
					MPromise.resolve(2),
					new MPromise((resolve) => setTimeout(() => resolve(3), 10)),
				];

				const results = await MPromise.all(promises);
				expect(results).toEqual([1, 2, 3]);
			});

			it("should maintain order of results regardless of resolution timing", async () => {
				const promises = [
					new MPromise((resolve) => setTimeout(() => resolve(1), 20)),
					new MPromise((resolve) => setTimeout(() => resolve(2), 10)),
					MPromise.resolve(3),
				];

				const results = await MPromise.all(promises);
				expect(results).toEqual([1, 2, 3]); // Order matches input order, not resolution order
			});

			it("should reject if any promise rejects", async () => {
				const error = new Error("all test error");
				const promises = [
					MPromise.resolve(1),
					MPromise.reject(error),
					MPromise.resolve(3),
				];

				await expect(MPromise.all(promises)).rejects.toEqual(error);
			});

			it("should resolve immediately with empty array if iterable is empty", async () => {
				const results = await MPromise.all([]);
				expect(results).toEqual([]);
			});

			it("should handle mixed values and promises", async () => {
				const promises = [1, MPromise.resolve(2), 3];

				const results = await MPromise.all(promises);
				expect(results).toEqual([1, 2, 3]);
			});
		});
	});

	describe("async behavior", () => {
		it("should use queueMicrotask for handler execution", async () => {
			let thenCalled = false;
			const promise = new MPromise((resolve) => resolve("immediate"));

			const resultPromise = promise.then(() => {
				thenCalled = true;
			});

			// Then handlers should not be called synchronously
			expect(thenCalled).toBe(false);

			await resultPromise;
			expect(thenCalled).toBe(true);
		});

		it("should handle multiple chained thens", async () => {
			let step = 0;

			const result = await new MPromise((resolve) => resolve(1))
				.then((val) => {
					expect(step++).toBe(0);
					expect(val).toBe(1);
					return val + 1;
				})
				.then((val) => {
					expect(step++).toBe(1);
					expect(val).toBe(2);
					return val + 1;
				})
				.then((val) => {
					expect(step++).toBe(2);
					expect(val).toBe(3);
					return val;
				});

			expect(result).toBe(3);
		});
	});
});
