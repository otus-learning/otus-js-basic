const TASK7_MAIN_CONTAINER_ID = "task7id";
const TASK7_BTN_CLASS_NAME = "btns";
const TASK7_EDIT_CLASS_NAME = "edits";

export let hw7_f1 = (mainContainer) => {
  let task7Div = document.getElementById(TASK7_MAIN_CONTAINER_ID);
  if (task7Div) {
    task7Div.innerHTML = "";
  } else {
    task7Div = document.createElement("div");
    task7Div.id = TASK7_MAIN_CONTAINER_ID;
  }

  let btn = document.createElement("input");

  let edit = document.createElement("input");
  edit.type = "text";
  edit.className = TASK7_EDIT_CLASS_NAME;
  edit.addEventListener("keyup", () => {
    if (edit.value.length) {
      btn.style["display"] = "block";
    } else {
      btn.style["display"] = "none";
    }
  });

  btn.type = "button";
  btn.className = TASK7_BTN_CLASS_NAME;
  btn.addEventListener("click", () => {
    let p = document.createElement("p");
    p.innerHTML = edit.value;
    task7Div.appendChild(p);

    let allP = document.querySelectorAll("p");
    if (allP.length > 5) {
      task7Div.removeChild(allP[0]);
    }
  });

  task7Div.appendChild(edit);
  task7Div.appendChild(btn);

  for (let i = 0; i < 3; i++) {
    let p = document.createElement("p");
    p.innerHTML = `Text for paragraph ${i}`;
    task7Div.appendChild(p);
  }

  mainContainer.appendChild(task7Div);
};
