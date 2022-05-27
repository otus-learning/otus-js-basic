import { hw8_f1, hw8_f2, hw8_f3 } from "./homework_8.js";

describe("homework 8, function 1 test", () => {
	it("is function exists", () => {
		expect(hw8_f1).toBeDefined();
	});

	it("param 26.05.2022", () => {
		expect(hw8_f1("26.05.2022")).toEqual(["Thursday"]);
	});
	it("param 24.05.2022", () => {
		expect(hw8_f1("24.05.2022")).toEqual(["Tuesday"]);
	});
	it("param null", () => {
		expect(hw8_f1(null).join("").split(" ")).toContain("Error");
	});
	it("param undefined", () => {
		expect(hw8_f1(undefined).join("").split(" ")).toContain("Error");
	});
	it("param empty string and empty string", () => {
		expect(hw8_f1("").join("").split(" ")).toContain("Error");
	});
});

describe("homework 8, function 2 test", () => {
	it("is function exists", () => {
		expect(hw8_f2).toBeDefined();
	});

	it("is correct working", () => {
		let m1 = 0;
		let m2 = 1;
		let m;

		while (m1 !== m2) {
			m1 = new Date().getMinutes() + new Date().getHours() * 60;
			m = hw8_f2();
			m2 = new Date().getMinutes() + new Date().getHours() * 60;
			if (m1 === m2) {
				expect(m).toEqual([m1]);
				break;
			}
		}
	});
});

describe("homework 8, function 3 test", () => {
	it("is function exists", () => {
		expect(hw8_f3).toBeDefined();
	});

	it("param 21.01.2000 and 23.01.2000", () => {
		expect(hw8_f3("21.01.2000", "23.01.2000").join("").split(" ")).toContain(
			"second"
		);
	});

	it("param 23.01.2000 and 21.01.2000", () => {
		expect(hw8_f3("23.01.2000", "21.01.2000").join("").split(" ")).toContain(
			"first"
		);
	});

	it("param 21.01.2000 and 21.01.2000", () => {
		expect(hw8_f3("21.01.2000", "21.01.2000").join("").split(" ")).toContain(
			"same"
		);
	});

	it("param null and 21.01.2000", () => {
		expect(hw8_f3(null, "21.01.2000").join("").split(" ")).toContain("Error");
	});

	it("param 21.01.2000 and undefined", () => {
		expect(hw8_f3("21.01.2000", undefined).join("").split(" ")).toContain(
			"Error"
		);
	});

	it("param empty string and empty string", () => {
		expect(hw8_f3("", "").join("").split(" ")).toContain("Error");
	});
});
