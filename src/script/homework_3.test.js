import { hw3_f1, hw3_f2, hw3_f3 } from "./homework_3.js";

describe("homework 3, function 1 test", () => {
	it("is function exists", () => {
		expect(hw3_f1).toBeDefined();
	});

	it("check sum", () => {
		let sum = 0;
		for (let i = 100; i >= 50; i--) {
			sum += i;
		}
		expect(hw3_f1()).toEqual([sum]);
	});
});

describe("homework 3, function 2 test", () => {
	it("is function exists", () => {
		expect(hw3_f2).toBeDefined();
	});

	it("checking seven multiple table", () => {
		let check = [];
		for (let i = 1; i < 10; i++) {
			check.push(i * 7);
		}
		let rslt = hw3_f2()
			.join("")
			.split("<br>")
			.map((el) => {
				return Number(el.split("=").pop().trim());
			})
			.slice(1);
		expect(check).toEqual(rslt);
	});
});

describe("homework 3, function 3 test", () => {
	it("prompted 3", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "3");
		expect(hw3_f3()).toEqual([2]);
	});

	it("prompted 9", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "9");
		expect(hw3_f3()).toEqual([5]);
	});

	it("prompted 0", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "0");
		expect(hw3_f3()).toEqual([0]);
	});

	it("prompted null", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "null");
		expect(hw3_f3()).toEqual([0]);
	});

	it("prompted undefined", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "undefined");
		expect(hw3_f3()).toEqual([0]);
	});

	it("prompted empty string", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "");
		expect(hw3_f3()).toEqual([0]);
	});
});
