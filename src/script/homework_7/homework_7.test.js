import { hw7_f1 } from "./homework_7.js";

describe("homework 7, function 1 test", () => {
  it("is function exists", () => {
    expect(hw7_f1).toBeDefined();
  });

  document.body.innerHTML = "<div id='testDiv'></div>";
  let container = document.getElementById("testDiv");

  hw7_f1(container);

  it("check inputs creation", () => {
    expect(container.querySelectorAll("input")).toHaveLength(2);
  });

  it("check paragraphs creation", () => {
    expect(container.querySelectorAll("p")).toHaveLength(3);
  });

  it("check inputs types", () => {
    expect(container.querySelector("input[type=button]")).toBeDefined();
    expect(container.querySelector("input[type=text]")).toBeDefined();
  });

  it("check button set visible", () => {
    let edit = container.querySelector("input[type=text]");
    let btn = container.querySelector("input[type=button]");
    edit.value = "1";
    edit.dispatchEvent(new Event("keyup"));
    expect(btn.style["display"]).toEqual("block");
  });

  it("check button set unvisible", () => {
    let edit = container.querySelector("input[type=text]");
    let btn = container.querySelector("input[type=button]");
    edit.value = "";
    edit.dispatchEvent(new Event("keyup"));
    expect(btn.style["display"]).toEqual("none");
  });

  it("check that button press adding paragraphs", () => {
    let edit = container.querySelector("input[type=text]");
    let btn = container.querySelector("input[type=button]");
    edit.value = "1";
    btn.click();
    expect(container.querySelectorAll("p")).toHaveLength(4);
  });

  it("check that button press adding paragraphs with need text", () => {
    let edit = container.querySelector("input[type=text]");
    let btn = container.querySelector("input[type=button]");
    edit.value = "2";
    btn.click();
    expect(container.querySelector("p:last-child").innerHTML).toEqual(
      edit.value
    );
  });

  it("check that button press adding paragraphs but only five for maximum count", () => {
    let edit = container.querySelector("input[type=text]");
    let btn = container.querySelector("input[type=button]");
    edit.value = "3";
    btn.click();
    expect(container.querySelectorAll("p")).toHaveLength(5);
  });

  it("check inputs creation in component full of childs", () => {
    hw7_f1(container);
    expect(container.querySelectorAll("input")).toHaveLength(2);
    expect(container.querySelectorAll("p")).toHaveLength(3);
  });
});
