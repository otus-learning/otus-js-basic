import { functions } from "./const.js";

export let hw9_f1 = (a, b, c) => {
	a = isNaN(Number(a)) ? -1 : Number(a);
	b = isNaN(Number(b)) ? -1 : Number(b);
	c = isNaN(Number(c)) ? -1 : Number(c);

	if (a < 0 || b < 0 || c < 0) {
		return ["Error in input parameters"];
	}

	if (
		Math.pow(a, 2) === Math.pow(b, 2) + Math.pow(c, 2) ||
    Math.pow(b, 2) === Math.pow(c, 2) + Math.pow(a, 2) ||
    Math.pow(c, 2) === Math.pow(a, 2) + Math.pow(b, 2)
	) {
		return ["right triangle"];
	}

	return ["not right tirangle"];
};

export let hw9_f2 = (r) => {
	r = isNaN(Number(r)) ? -1 : Number(r);

	if (r < 0) {
		return ["Error in input parameters"];
	}
	return [Math.PI * r * 2, Math.PI * Math.pow(2 * r, 2)];
};

export let hw9_f3 = (a, b, c) => {
	a = isNaN(Number(a)) ? 0 : Number(a);
	b = isNaN(Number(b)) ? 0 : Number(b);
	c = isNaN(Number(c)) ? 0 : Number(c);

	let d = Math.pow(b, 2) - 4 * a * c;
	if (d < 0) {
		return ["no solution"];
	} else {
		if (d > 0) {
			return [(Math.sqrt(d) - b) / (2 * a), (-Math.sqrt(d) - b) / (2 * a)];
		}
	}

	return [-b / (2 * a)];
};

functions.push({
	name: "Homework 9 task #1",
	func: hw9_f1,
	params: [
		[3, 4, 5][(Math.random() * 3) >>> 0],
		[3, 4, 5][(Math.random() * 3) >>> 0],
		[3, 4, 5][(Math.random() * 3) >>> 0],
	],
});
functions.push({
	name: "Homework 9 task #2",
	func: hw9_f2,
	params: [(Math.random() * 10) >>> 0],
});
functions.push({
	name: "Homework 9 task #3",
	func: hw9_f3,
	params: [
		[3, -4, 54][(Math.random() * 3) >>> 0],
		[3, 28, 6][(Math.random() * 3) >>> 0],
		[3, -49, 0][(Math.random() * 3) >>> 0],
	],
});
