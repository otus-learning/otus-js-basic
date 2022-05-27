import { hw4_f1, hw4_f2, hw4_f3 } from "./homework_4.js";

describe("homework 4, function 1 test", () => {
	jest.spyOn(window, "prompt").mockImplementation(() => "23");

	it("is function exists", () => {
		expect(hw4_f1).toBeDefined();
	});

	it("check user object", () => {
		expect(typeof hw4_f1()[0]).toEqual("object");
	});

	it("check user name exists", () => {
		expect(hw4_f1()[0].name).toBeDefined();
	});

	it("check user name value", () => {
		expect(hw4_f1()[0].name).toEqual("John");
	});

	it("check user age exists", () => {
		expect(hw4_f1()[0].age).toBeDefined();
	});

	it("check user age value", () => {
		expect(hw4_f1()[0].age).toEqual(23);
	});

	it("check user age modified", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "21");
		expect(hw4_f1()[0].age).toEqual(21);
	});

	it("check user age null prompted", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "null");
		expect(hw4_f1()[0].age).toEqual(0);
	});

	it("check user age undefined prompted", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "undefined");
		expect(hw4_f1()[0].age).toEqual(0);
	});

	it("check user age empty string prompted", () => {
		jest.spyOn(window, "prompt").mockImplementation(() => "");
		expect(hw4_f1()[0].age).toEqual(0);
	});
});

describe("homework 3, function 2 test", () => {
	jest.spyOn(window, "prompt").mockImplementation(() => "23");
	let user = hw4_f1()[0];

	it("is function exists", () => {
		expect(hw4_f2).toBeDefined();
	});

	it("check admin object", () => {
		expect(typeof hw4_f2()[0]).toEqual("object");
	});

	it("check admin name exists", () => {
		expect(hw4_f2()[0].name).toBeDefined();
	});

	it("check that admin name is equal to user name", () => {
		expect(hw4_f2()[0].name).toEqual(user.name);
	});

	it("check admin age exists", () => {
		expect(hw4_f2()[0].age).toBeDefined();
	});

	it("check admin age value", () => {
		expect(hw4_f2()[0].age).toEqual(user.age);
	});

	it("check admin role exists", () => {
		expect(hw4_f2()[0].role).toBeDefined();
	});

	it("check admin role value", () => {
		expect(hw4_f2()[0].role).toEqual("admin");
	});
});

describe("homework 3, function 3 test", () => {
	jest.spyOn(window, "prompt").mockImplementation(() => "23");

	let admin = hw4_f2()[0];

	it("is function exists", () => {
		expect(hw4_f3).toBeDefined();
	});

	hw4_f3();

	it("check variable age exists", () => {
		expect(window.age).toBeDefined();
	});

	it("check variable age value", () => {
		expect(window.age).toEqual(admin.age);
	});

	it("check variable name exists", () => {
		expect(window.name).toBeDefined();
	});

	it("check variable name value", () => {
		expect(window.name).toEqual(admin.name);
	});

	it("check variable role exists", () => {
		expect(window.role).toBeDefined();
	});

	it("check variable role value", () => {
		expect(window.role).toEqual(admin.role);
	});
});
