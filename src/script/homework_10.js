import { functions } from "./const.js";

export let hw10_f1 = (str) => {
	if (
		/^[a-zA-Z]{1}[a-zA-Z0-9_-]+[a-zA-Z0-9]{1}@[a-zA-Z0-9]{1}[a-zA-Z0-9-]+[a-zA-Z0-9]{1}\.[a-zA-Z]{2,}$/.test(
			str
		)
	) {
		return ["mail"];
	}

	if (/^(((\+7)|8))[89][0-9]{9}$/.test(str)) {
		return ["phone number"];
	}

	if (/^([0-9]{1,2}\.[0-9]{1,2}\.)([0-9]{4}|[0-9]{2})$/.test(str)) {
		return ["date"];
	}

	return ["not correct date or phone number or mail"];
};

functions.push({
	name: "Homework 10 task #1",
	func: hw10_f1,
	params: [
		[
			"mail@mail.ru",
			"89009998877",
			"11.12.2012",
			"mail@mail",
			"8900999887",
			"+79009998877",
			"+78009998877",
			"11.12.213",
			"11.12.13",
		][(Math.random() * 9) >>> 0],
	],
});
