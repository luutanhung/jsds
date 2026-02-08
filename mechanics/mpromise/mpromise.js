import { MPromiseState } from "./mpromise-status.js";

export class MPromise {
	constructor(executorFunc) {
		this.state = MPromiseState.Pending;
		this.value = undefined;
		this.handlers = [];

		const resolve = (val) => {
			if (this.state !== MPromiseState.Pending) return;
			this.state = MPromiseState.Fulfilled;
			this.value = val;
			this._executeHandlers();
		};

		const reject = (err) => {
			if (this.state !== MPromiseState.Pending) return;
			this.state = MPromiseState.Rejected;
			this.value = err;
			this._executeHandlers();
		};

		try {
			if (typeof executorFunc === "function") {
				executorFunc(resolve, reject);
			}
		} catch (err) {
			reject(err);
		}
	}

	_executeHandlers() {
		queueMicrotask(() => {
			while (this.handlers.length) {
				const { onFulfilled, onRejected, nextFulfill, nextReject } =
					this.handlers.shift();

				try {
					if (this.state === MPromiseState.Fulfilled) {
						if (typeof onFulfilled === "function") {
							const result = onFulfilled(this.value);
							this._resolvePromise(nextFulfill, nextReject, result);
						} else {
							nextFulfill(this.value);
						}
					} else if (this.state === MPromiseState.Rejected) {
						if (typeof onRejected === "function") {
							const result = onRejected(this.value);
							this._resolvePromise(nextFulfill, nextReject, result);
						} else {
							nextReject(this.value);
						}
					}
				} catch (err) {
					nextReject(err);
				}
			}
		});
	}

	_resolvePromise(nextFulfill, nextReject, result) {
		if (result === this) {
			nextReject(new TypeError("Chaining cycle detected"));
			return;
		}

		if (
			result &&
			(typeof result === "object" || typeof result === "function")
		) {
			let called = false;
			try {
				const then = result.then;
				if (typeof then === "function") {
					then.call(
						result,
						(val) => {
							if (called) return;
							called = true;
							this._resolvePromise(nextFulfill, nextReject, val);
						},
						(err) => {
							if (called) return;
							called = true;
							nextReject(err);
						},
					);
				} else {
					nextFulfill(result);
				}
			} catch (err) {
				if (called) return;
				nextReject(err);
				called = true;
			}
		} else {
			nextFulfill(result);
		}
	}

	then(onFulfilled, onRejected) {
		return new MPromise((nextFulfill, nextReject) => {
			const handler = { onFulfilled, onRejected, nextFulfill, nextReject };

			if (this.state === MPromiseState.Fulfilled) {
				queueMicrotask(() => {
					try {
						if (typeof onFulfilled === "function") {
							const result = onFulfilled(this.value);
							this._resolvePromise(nextFulfill, nextReject, result);
						} else {
							nextFulfill(this.value);
						}
					} catch (err) {
						nextReject(err);
					}
				});
			} else if (this.state === MPromiseState.Rejected) {
				queueMicrotask(() => {
					try {
						if (typeof onRejected === "function") {
							const result = onRejected(this.value);
							this._resolvePromise(nextFulfill, nextReject, result);
						} else {
							nextReject(this.value);
						}
					} catch (err) {
						nextReject(err);
					}
				});
			} else {
				this.handlers.push(handler);
			}
		});
	}

	catch(onRejected) {
		return this.then(undefined, onRejected);
	}

	finally(onFinally) {
		if (typeof onFinally !== "function") {
			return this.then();
		}

		return this.then(
			(value) =>
				MPromise.resolve()
					.then(() => onFinally())
					.then(
						() => value,
						() => value,
					),
			(err) =>
				MPromise.resolve()
					.then(() => onFinally())
					.then(
						() => {
							throw err;
						},
						() => {
							throw err;
						},
					),
		);
	}

	static resolve(val) {
		if (val instanceof MPromise) return val;
		return new MPromise((fulfill) => fulfill(val));
	}

	static reject(err) {
		return new MPromise((_, rejectPromise) => rejectPromise(err));
	}

	static all(iterable) {
		return new MPromise((fulfill, rejectPromise) => {
			const results = [];
			let completed = 0;
			const items = Array.from(iterable);

			if (items.length === 0) {
				fulfill([]);
				return;
			}

			items.forEach((item, idx) => {
				MPromise.resolve(item).then((val) => {
					results[idx] = val;
					completed += 1;
					if (completed === items.length) fulfill(results);
				}, rejectPromise);
			});
		});
	}
}
