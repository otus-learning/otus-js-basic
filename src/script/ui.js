import {
	CHECKBOX_ID,
	CHECKBOX_TEXT,
	CHECKBOX_CLASS,
	TASKS_CONTAINER_ID,
	INFO_DIVS_CONTAINER_CLASS,
	CONSOLE_CONTAINER_ID,
	functions,
} from "./const.js";

let fakeConsole;
let outputConsole;

export let addTask = (containerId, task, func) => {
	if (containerId && task && func) {
		let tasksDiv = document.getElementById(containerId);
		let a = document.createElement("a");
		a.href = "#";
		a.text = task;
		a.onclick = func;
		tasksDiv.appendChild(a);
		tasksDiv.appendChild(document.createElement("br"));
	}
};

export function FakeConsole(containerId) {
	this.container = document.getElementById(containerId);
	this.clear = () => {
		this.container.innerHTML = "";
	};
	this.log = (str) => {
		this.container.innerHTML += str + "<br>";
	};
	this.isFake = () => {
		return true;
	};
	this.clear();
}

export let createUI = (containerId) => {
	let mainDiv = document.getElementById(containerId);

	let cbxConsole = document.createElement("input");
	cbxConsole.type = "checkbox";
	cbxConsole.checked = true;
	cbxConsole.id = CHECKBOX_ID;
	cbxConsole.addEventListener("click", (e) => {
		outputConsole = e.currentTarget.checked ? fakeConsole : console;
		outputConsole.log("!");
	});

	let lblConsole = document.createElement("span");
	lblConsole.innerHTML = CHECKBOX_TEXT;

	let cbxDiv = document.createElement("div");
	cbxDiv.appendChild(cbxConsole);
	cbxDiv.appendChild(lblConsole);
	cbxDiv.className = CHECKBOX_CLASS;

	let tasksDiv = document.createElement("div");
	tasksDiv.id = TASKS_CONTAINER_ID;
	tasksDiv.className = INFO_DIVS_CONTAINER_CLASS;

	let consoleDiv = document.createElement("div");
	consoleDiv.id = CONSOLE_CONTAINER_ID;
	consoleDiv.className = INFO_DIVS_CONTAINER_CLASS;

	mainDiv.appendChild(cbxDiv);
	mainDiv.appendChild(tasksDiv);
	mainDiv.appendChild(consoleDiv);

	fakeConsole = new FakeConsole(CONSOLE_CONTAINER_ID);
	outputConsole = fakeConsole;

	functions.forEach((el) => {
		addTask(TASKS_CONTAINER_ID, el.name, () => {
			outputConsole.clear();
			if (el.params.length) {
				let str = "Parameters: ";
				el.params.forEach((el) => {
					str += typeof el === "string" ? `"${el}" ` : `${el} `;
				});
				outputConsole.log(str);
			}
			let str = "Results: ";
			let fake = "isFake" in outputConsole;
			el.func(...el.params).forEach((el) => {
				if (!fake && el === "<br>") {
					el = "\n";
				}
				str +=
          typeof el === "string" && el !== "<br>" && el !== "\n"
          	? `"${el}" `
          	: `${el} `;
			});
			outputConsole.log(str);
		});
	});
};
