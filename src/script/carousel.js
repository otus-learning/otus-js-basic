export class Carousel {
  //parent container
  #el;
  //index of current picture
  index;
  //count of all included items
  count;
  //container with count visualisation
  #countEl;

  //count items and return it's visual presentation
  //static because not need object implementation
  static #changeCount(txt, index) {
    let length = txt.length;
    txt = "";
    for (let i = 0; i < length; i++) {
      txt += i === index ? ":" : ".";
    }
    return txt;
  }

  constructor(el, urls) {
    if (!/^carousel$/.test(el.className)) {
      let ul = document.createElement("ul");
      el.appendChild(ul);
      el = ul;
    }
    el.classList.add("carousel");

    this.index = 0;
    this.count = 0;
    this.#el = el;

    let controlsContainer = document.createElement("div");
    controlsContainer.classList.add("carousel-ctrls");

    this.#countEl = document.createElement("p");
    this.#countEl.innerHTML = "";
    this.#countEl.classList.add("carousel-count");

    //creating left control arrow
    let left = document.createElement("p");
    left.innerHTML = "<";
    left.classList.add("carousel-ctrls__item");
    left.classList.add("carousel-ctrls__item--left");
    left.addEventListener("click", () => {
      if (!this.count) {
        return;
      }
      let items = el.querySelectorAll(".carousel__item");
      items[this.index].classList.remove("carousel__item--active");
      this.index--;
      if (this.index < 0) {
        this.index = items.length - 1;
      }

      this.#countEl.innerHTML = Carousel.#changeCount(
        this.#countEl.innerHTML,
        this.index
      );
      items[this.index].classList.add("carousel__item--active");
    });

    //creating right control arrow
    let right = document.createElement("p");

    right.innerHTML = ">";
    right.classList.add("carousel-ctrls__item");
    right.classList.add("carousel-ctrls__item--right");
    right.addEventListener("click", () => {
      if (!this.count) {
        return;
      }
      let items = el.querySelectorAll(".carousel__item");
      items[this.index].classList.remove("carousel__item--active");
      this.index++;
      if (this.index === items.length) {
        this.index = 0;
      }

      this.#countEl.innerHTML = Carousel.#changeCount(
        this.#countEl.innerHTML,
        this.index
      );
      items[this.index].classList.add("carousel__item--active");
    });

    controlsContainer.appendChild(left);
    controlsContainer.appendChild(right);
    controlsContainer.style["width"] = el.parentNode.offsetWidth + "px";
    controlsContainer.style["height"] = el.parentNode.offsetHeight + "px";

    el.parentNode.classList.add("carousel-container");
    el.parentNode.appendChild(controlsContainer);
    el.parentNode.appendChild(this.#countEl);

    //adding declarative items defined on page
    let items = el.querySelectorAll(".carousel__item");
    items.forEach((item, idx) => {
      //item.classList.add("carousel__item");
      if (!idx) {
        item.classList.add("carousel__item--active");
      }
      let img = item.querySelector("img");
      img.style["max-width"] = el.parentNode.offsetWidth + "px";
      img.style["max-height"] = el.parentNode.offsetHeight + "px";
      this.#countEl.innerHTML += ".";
      this.count++;
    });

    //adding img url's from parameters
    if (urls) {
      urls.forEach((url) => {
        this.add(url);
      });
    }

    this.#countEl.innerHTML = Carousel.#changeCount(
      this.#countEl.innerHTML,
      this.index
    );
  }

  //dinamicaly adding items by url
  add(imgSrc, idx) {
    let li = document.createElement("li");
    li.classList.add("carousel__item");
    if (!this.count) {
      li.classList.add("carousel__item--active");
    }
    let img = document.createElement("img");
    img.src = imgSrc;
    img.style["max-width"] = this.#el.parentNode.offsetWidth + "px";
    img.style["max-height"] = this.#el.parentNode.offsetHeight + "px";
    li.appendChild(img);
    if (idx !== undefined && this.count && idx < this.count) {
      let items = this.#el.querySelectorAll(".carousel__item");
      this.#el.insertBefore(li, items[idx]);
      this.index >= idx && this.index++;
    } else {
      this.#el.appendChild(li);
    }
    this.count++;
    this.#countEl.innerHTML += ".";
    this.#countEl.innerHTML = Carousel.#changeCount(
      this.#countEl.innerHTML,
      this.index
    );
  }

  //dinamicaly removing last item
  remove(idx) {
    if (!this.count) {
      return;
    }
    let items = this.#el.querySelectorAll(".carousel__item");
    if (idx !== undefined && idx < this.count) {
      this.#el.removeChild(items[idx]);
      idx < this.index && this.index--;
    } else {
      this.#el.removeChild(items[items.length - 1]);
    }
    this.count--;

    items = this.#el.querySelectorAll(".carousel__item");
    if (
      this.#el.querySelector(".carousel__item--active") === null &&
      items.length
    ) {
      this.index > 0 && this.index--;
      items[this.index].classList.add("carousel__item--active");
    }
    this.#countEl.innerHTML = this.#countEl.innerHTML.substring(
      0,
      this.#countEl.innerHTML.length - 1
    );
    this.#countEl.innerHTML = Carousel.#changeCount(
      this.#countEl.innerHTML,
      this.index
    );
  }
}

//self calling function that collect all declarative carousels and defined it's list
//and it defined new global constructor Carousel
(() => {
  let carousels = document.querySelectorAll(".carousel");
  if (carousels.length) {
    Object.defineProperty(window, "carousels", { value: [] });
    carousels.forEach((el) => {
      window.carousels.push(new Carousel(el));
    });
  }

  Object.defineProperty(window, "Carousel", { value: Carousel });
})();
