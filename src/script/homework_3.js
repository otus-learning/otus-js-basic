import { functions } from "./const.js";

export let hw3_f1 = () => {
	let sum = 0;
	for (let i = 50; i <= 100; i++) {
		sum += i;
	}
	return [sum];
};

export let hw3_f2 = () => {
	let result = [];
	for (let i = 1; i < 10; i++) {
		result.push("<br>");
		result.push(`7 x ${i} = ${7 * i}`);
	}
	return result;
};

export let hw3_f3 = () => {
	let n = prompt("Please enter the number N");
	n = isNaN(Number(n)) ? 0 : Number(n);

	if (n < 1) {
		return [0];
	}

	let sum = 0;
	let cnt = 0;
	for (let i = 1; i <= n; i++) {
		if (i & 0x01) {
			cnt++;
			sum += i;
		}
	}
	return [sum / cnt];
};

functions.push({ name: "Homework 3 task #1", func: hw3_f1, params: [] });
functions.push({ name: "Homework 3 task #2", func: hw3_f2, params: [] });
functions.push({ name: "Homework 3 task #3", func: hw3_f3, params: [] });
