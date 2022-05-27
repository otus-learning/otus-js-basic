import { functions } from "./const.js";

export let hw2_f1 = (a, b) => {
	a = isNaN(Number(a)) ? 0 : Number(a);
	b = isNaN(Number(b)) ? 0 : Number(b);

	return [Math.max(a, b)];
};

export let hw2_f2 = () => {
	let m = prompt("Please enter the number of month (1..12)");
	m = isNaN(Number(m)) ? 1 : Number(m);
	if (m > 12) {
		m = 12;
	}
	if (m < 1) {
		m = 1;
	}
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	return [months[m - 1]];
};

export let hw2_f3 = (circle, square) => {
	square = isNaN(Number(square)) ? 0 : Number(square);
	circle = isNaN(Number(circle)) ? 0 : Number(circle);

	let r = circle / (Math.PI * 2);
	return r <= Math.sqrt(square) / 2 ? ["fitted"] : ["not fitted"];
};

functions.push({
	name: "Homework 2 task #1",
	func: hw2_f1,
	params: [+(Math.random() * 100).toFixed(), +(Math.random() * 100).toFixed()],
});
functions.push({ name: "Homework 2 task #2", func: hw2_f2, params: [] });
functions.push({
	name: "Homework 2 task #3",
	func: hw2_f3,
	params: [
		[18.85, 18][(Math.random() * 2) >>> 0],
		[36.1, 25][(Math.random() * 2) >> 0],
	],
});
