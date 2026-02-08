import { MPromiseState } from "./mpromise-status";

export class MPromiseV1 {
	constructor(executorFunc) {
		this.state = MPromiseState.Pending;
		this.handlers = [];

		const resolve = (val) => {
			if (this.state !== "pending") return;
			this.state = MPromiseState.Fulfilled;
			this.value = val;
			this.handlers.forEach((h) => h?.onFulfilled?.(val));
		};

		const reject = (err) => {
			if (this.state !== MPromise.Pending) return;
			this.state = MPromiseState.Rejected;
			this.value = err;
			this.handlers.forEach((h) => h?.onRejected?.(err));
		};

		if (typeof executorFunc === "function") {
			executorFunc(resolve, reject);
		}
	}

	then(onFulfilled, onRejected) {
		if (this.state === MPromiseState.Fulfilled) {
			onFulfilled?.(this.value);
		} else if (this.state === MPromiseState.Rejected) {
			onRejected?.(this.value);
		} else {
			this.handlers.push({
				onFulfilled,
				onRejected,
			});
		}

		return this;
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	static resolve(val) {
		const p = new MPromise();
		p.state = MPromiseState.Fulfilled;
		p.value = val;
		return p;
	}

	static reject(err) {
		const p = new MPromise();
		p.state = MPromiseState.Rejected;
		p.value = err;
		return p;
	}
}

function test() {
	return new MPromise((resolve) => {
		setTimeout(() => {
			resolve("Done.");
		}, 1000);
	});
}
