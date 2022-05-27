import { hw6_f1, hw6_f2, hw6_f3 } from "./homework_6.js";

describe("homework 6, function 1 test", () => {
	it("is function exists", () => {
		expect(hw6_f1).toBeDefined();
	});

	it("param 5 and 4", () => {
		expect(hw6_f1(51, 45)).toEqual([6]);
	});

	it("param 4 and 5", () => {
		expect(hw6_f1(4, 5)).toEqual([1]);
	});

	it("param 9 and 9", () => {
		expect(hw6_f1(9, 9)).toEqual([0]);
	});
	it("param null and null", () => {
		expect(hw6_f1(null, null)).toEqual([0]);
	});
	it("param undefined and undefined", () => {
		expect(hw6_f1(undefined, undefined)).toEqual([0]);
	});
	it("param empty string and empty string", () => {
		expect(hw6_f1("", "")).toEqual([0]);
	});

	it("param empty NaN and NaN", () => {
		expect(hw6_f1(NaN, NaN)).toEqual([0]);
	});
});

describe("homework 6, function 2 test", () => {
	it("is function exists", () => {
		expect(hw6_f2).toBeDefined();
	});

	it("param '123 1234", () => {
		expect(hw6_f2("123 1234")).toEqual(["false"]);
	});

	it("param 123", () => {
		expect(hw6_f2("123")).toEqual(["true"]);
	});

	it("param null", () => {
		expect(hw6_f2(null)).toEqual(["true"]);
	});

	it("param undefined", () => {
		expect(hw6_f2(undefined)).toEqual(["true"]);
	});

	it("param empty string", () => {
		expect(hw6_f2("")).toEqual(["true"]);
	});

	it("param NaN", () => {
		expect(hw6_f2(NaN)).toEqual(["true"]);
	});
});

describe("homework 6, function 3 test", () => {
	it("is function exists", () => {
		expect(hw6_f3).toBeDefined();
	});

	it("param 3 and 3", () => {
		expect(hw6_f3(3, 3)).toEqual([27]);
	});

	it("param 4 and 2", () => {
		expect(hw6_f3(4, 2)).toEqual([16]);
	});

	it("param null and null", () => {
		expect(hw6_f3(null, null)).toEqual([1]);
	});

	it("param undefined and undefined", () => {
		expect(hw6_f3(undefined, undefined)).toEqual([1]);
	});

	it("param empty string and empty string", () => {
		expect(hw6_f3("", "")).toEqual([1]);
	});

	it("param NaN and NaN", () => {
		expect(hw6_f3(NaN, NaN)).toEqual([1]);
	});
});
