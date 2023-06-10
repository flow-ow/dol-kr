Object.defineProperty(Array.prototype, "pluckWith", {
	configurable: true,
	writable: true,

	value(predicate) {
		if (this == null) {
			throw new TypeError("Array.prototype.pluckWith called on null or undefined");
		}
		if (typeof predicate !== "function") {
			throw new Error("Array.prototype.pluckWith predicate parameter must be a function");
		}
		const indices = [];
		this.forEach((e, i) => {
			if (predicate.call(this, e, i, this)) {
				indices.push(i);
			}
		});
		if (indices.length === 0) return;
		const index = indices.random();
		return this.splice(index, 1)[0];
	},
});

Object.defineProperty(Array.prototype, "select", {
	configurable: true,
	writable: true,

	value(index) {
		if (this == null) {
			throw new TypeError("Array.prototype.select called on null or undefined");
		}
		if (typeof index !== "number") {
			throw new Error("Array.prototype.select index parameter must be a number");
		}
		const start = 0;
		const end = this.length - 1;
		const safeIndex = start > index ? start : end < index ? end : index;
		return this[safeIndex];
	},
});

/* Returns copy of array minus the values in arguments. */
Object.defineProperty(Array.prototype, 'except', {
	configurable : true,
	writable     : true,

	value() {
		if (this == null) {
			throw new TypeError('Array.prototype.except called on null or undefined');
		}
		if (arguments.length === 0) {
			return this;
		}

		const needles = Array.prototype.concat.apply([], arguments);

		return this.filter(obj => {
			for(n of needles) {
				if(obj === n)
					return false;
			}
			return true;
		});
	}
});

Object.defineProperty(Array.prototype, 'formatList', {
	configurable: true,
	writable: true,
	value(options) {
		let { conjunction, useOxfordComma, separator } = Object.assign(
			{
				conjunction: "그리고",
				useOxfordComma: false,
				separator: ", ",
			},
			options
		);
		if (this == null) {
			throw new TypeError("Array.prototype.formatList called on null or undefined.");
		}
		if (this.length === 0) {
			return "";
		}
		try {if (!useOxfordComma && this.length > 1)  conjunction = (conjunction === "그리고"?["과", "와", "과"]:["이나", "나", "이나"])[getPostNum(this[this.length-2])]; conjunction += " "; getPostNum(this[this.length-1]);	/* useOxfordComma가 false일 때는 조사처리, 아니면 conjunction 사용. 끝으로 출력후의 조사처리를 위해 마지막 글자의 _postNum을 계산해둔다 */} catch(e) { return `<span class='red'>에러: formatList: ${e}: typeof(this)=${typeof(this)}${Array.isArray(this)?"= "+this.toString():""}</span>`}
		if (this.length <= 2) return this.join((useOxfordComma ? " " : "")+ conjunction);
		const oxConj = (useOxfordComma ? separator + conjunction : conjunction + " ");
		return this.slice(0, -1).join(separator) + oxConj + this.last();
	},
});
