(self["webpackChunkotus_learning"] = self["webpackChunkotus_learning"] || []).push([[520],{

/***/ 520:
/***/ (() => {

(() => {
  let carousels = document.querySelectorAll(".carousel");
  carousels.forEach(el => {
    let index = 0;

    let changeCount = txt => {
      let length = txt.length;
      txt = "";

      for (let i = 0; i < length; i++) {
        txt += i === index ? ":" : ".";
      }

      return txt;
    };

    let controlsContainer = document.createElement("div");
    controlsContainer.classList.add("carousel-ctrls");
    let count = document.createElement("p");
    count.innerHTML = "";
    count.classList.add("carousel-count");
    let left = document.createElement("p");
    left.innerHTML = "<";
    left.classList.add("carousel-ctrls__item");
    left.classList.add("carousel-ctrls__item--left");
    left.addEventListener("click", () => {
      let items = el.querySelectorAll(".carousel__item");
      items[index].classList.remove("carousel__item--active");
      index--;

      if (index < 0) {
        index = items.length - 1;
      }

      count.innerHTML = changeCount(count.innerHTML);
      items[index].classList.add("carousel__item--active");
    });
    let right = document.createElement("p");
    right.innerHTML = ">";
    right.classList.add("carousel-ctrls__item");
    right.classList.add("carousel-ctrls__item--right");
    right.addEventListener("click", () => {
      let items = el.querySelectorAll(".carousel__item");
      items[index].classList.remove("carousel__item--active");
      index++;

      if (index === items.length) {
        index = 0;
      }

      count.innerHTML = changeCount(count.innerHTML);
      items[index].classList.add("carousel__item--active");
    });
    controlsContainer.appendChild(left);
    controlsContainer.appendChild(right);
    controlsContainer.style["width"] = el.parentNode.offsetWidth + "px";
    controlsContainer.style["height"] = el.parentNode.offsetHeight + "px";
    el.parentNode.classList.add("carousel-container");
    el.parentNode.appendChild(controlsContainer);
    el.parentNode.appendChild(count);
    let items = el.querySelectorAll(".carousel__item");
    items.forEach((item, idx) => {
      if (!idx) {
        item.classList.add("carousel__item--active");
      }

      let img = item.querySelector("img");
      img.style["max-width"] = el.parentNode.offsetWidth + "px";
      img.style["max-height"] = el.parentNode.offsetHeight + "px";
      count.innerHTML += ".";
    });
    count.innerHTML = changeCount(count.innerHTML);
  });
})();

function Carousel(el) {
  if (!/^_carousel$/.test(el.className)) {
    let ul = document.createElement("ul");
    el.appendChild(ul);
    el = ul;
  }

  el.classList.add("carousel");
  this.index = 0;
  this.count = 0;

  let changeCount = txt => {
    let length = txt.length;
    txt = "";

    for (let i = 0; i < length; i++) {
      txt += i === this.index ? ":" : ".";
    }

    return txt;
  };

  let controlsContainer = document.createElement("div");
  controlsContainer.classList.add("carousel-ctrls");
  let count = document.createElement("p");
  count.innerHTML = "";
  count.classList.add("carousel-count");
  let left = document.createElement("p");
  left.innerHTML = "<";
  left.classList.add("carousel-ctrls__item");
  left.classList.add("carousel-ctrls__item--left");
  left.addEventListener("click", () => {
    let items = el.querySelectorAll("._carousel__item");
    items[this.index].classList.remove("carousel__item--active");
    this.index--;

    if (this.index < 0) {
      this.index = items.length - 1;
    }

    count.innerHTML = changeCount(count.innerHTML);
    items[this.index].classList.add("carousel__item--active");
  });
  let right = document.createElement("p");
  right.innerHTML = ">";
  right.classList.add("carousel-ctrls__item");
  right.classList.add("carousel-ctrls__item--right");
  right.addEventListener("click", () => {
    let items = el.querySelectorAll(".carousel__item");
    items[this.index].classList.remove("carousel__item--active");
    this.index++;

    if (this.index === items.length) {
      this.index = 0;
    }

    count.innerHTML = changeCount(count.innerHTML);
    items[this.index].classList.add("carousel__item--active");
  });
  controlsContainer.appendChild(left);
  controlsContainer.appendChild(right);
  controlsContainer.style["width"] = el.parentNode.offsetWidth + "px";
  controlsContainer.style["height"] = el.parentNode.offsetHeight + "px";
  el.parentNode.classList.add("carousel-container");
  el.parentNode.appendChild(controlsContainer);
  el.parentNode.appendChild(count);
  let items = el.querySelectorAll("._carousel__item");
  items.forEach((item, idx) => {
    item.classList.add("carousel__item");

    if (!idx) {
      item.classList.add("carousel__item--active");
    }

    let img = item.querySelector("img");
    img.style["max-width"] = el.parentNode.offsetWidth + "px";
    img.style["max-height"] = el.parentNode.offsetHeight + "px";
    count.innerHTML += ".";
  });
  count.innerHTML = changeCount(count.innerHTML);
  this.count = items.length;

  this.add = imgSrc => {
    let li = document.createElement("li");
    li.classList.add("_carousel__item");
    li.classList.add("carousel__item");

    if (!this.count) {
      li.classList.add("carousel__item--active");
    }

    let img = document.createElement("img");
    img.src = imgSrc;
    img.style["max-width"] = el.parentNode.offsetWidth + "px";
    img.style["max-height"] = el.parentNode.offsetHeight + "px";
    this.count++;
    li.appendChild(img);
    el.appendChild(li);
    count.innerHTML += ".";
    count.innerHTML = changeCount(count.innerHTML);
  };
}

(() => {
  let carousels = document.querySelectorAll("._carousel");

  if (carousels.length) {
    Object.defineProperty(window, "carousels", {
      value: []
    });
    carousels.forEach(el => {
      window.carousels.push(new Carousel(el));
    });
  }

  Object.defineProperty(window, "Carousel", {
    value: Carousel
  });
})();

/***/ })

}]);