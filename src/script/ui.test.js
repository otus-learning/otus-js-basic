import { createUI, addTask, FakeConsole } from "./ui.js";
import { functions } from "./const.js";

describe("task adding test", () => {
	document.body.innerHTML = "<div id='testDiv'></div>";

	let container = document.getElementById("testDiv");
	let func = () => {};

	addTask("testDiv", "task0", func);
	addTask("testDiv", "task1", func);
	addTask("testDiv", "task2", func);

	let tasks = container.querySelectorAll("a");

	it("check added tasks", () => {
		expect(container.querySelectorAll("a")).toHaveLength(3);
	});

	it("check tasks captions", () => {
		expect(tasks[0].text).toEqual("task0");
		expect(tasks[1].text).toEqual("task1");
		expect(tasks[2].text).toEqual("task2");
	});

	it("check tasks functions", () => {
		expect(tasks[0].onclick).toEqual(func);
		expect(tasks[1].onclick).toEqual(func);
		expect(tasks[2].onclick).toEqual(func);
	});
});

describe("FakeConsole working test", () => {
	document.body.innerHTML = "<div id='testDiv'></div>";

	let container = document.getElementById("testDiv");
	let myConsole = new FakeConsole("testDiv");

	it("check console creating", () => {
		expect(myConsole).toBeDefined();
	});

	it("check console container choosing", () => {
		expect(myConsole.container).toEqual(container);
	});

	it("check console printing", () => {
		myConsole.log("test1!");
		myConsole.log("test2!");
		expect(container.innerHTML).toEqual("test1!<br>test2!<br>");
	});

	it("check console erasing", () => {
		myConsole.clear();
		expect(container.innerHTML).toEqual("");
	});
});

describe("UI creation test", () => {
	document.body.innerHTML = "<div id='testDiv'></div>";

	functions[0] = { name: "task0", func: () => {}, params: [] };
	functions[1] = { name: "task1", func: () => {}, params: [] };

	createUI("testDiv");

	let container = document.getElementById("testDiv");

	it("check divs", () => {
		expect(container.querySelectorAll("div")).toHaveLength(3);
	});

	it("check inputs", () => {
		expect(container.querySelectorAll("input")).toHaveLength(1);
	});

	it("check spans", () => {
		expect(container.querySelectorAll("span")).toHaveLength(1);
	});

	it("check links, created from tasks", () => {
		expect(container.querySelectorAll("a")).toHaveLength(2);
	});
});
