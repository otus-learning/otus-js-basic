import { Carousel } from "./carousel";

describe("Carousel class test", () => {
  it("tests that function defined and it is a function", () => {
    expect(Carousel).toBeDefined();
    expect(Carousel).toBeInstanceOf(Function);
  });

  it("tests that new carousel ctrls are creating right", () => {
    document.body.innerHTML = "<div></div>";
    let div = document.querySelector("div");

    let carousel = new Carousel(div);
    expect(div.className).toEqual("carousel-container");
    expect(div.querySelectorAll(".carousel-ctrls").length).toEqual(1);
    expect(div.querySelectorAll(".carousel-ctrls__item").length).toEqual(2);
    expect(div.querySelectorAll(".carousel-count").length).toEqual(1);
    expect(div.querySelectorAll(".carousel-ctrls__item--left").length).toEqual(
      1
    );
    expect(div.querySelectorAll(".carousel-ctrls__item--right").length).toEqual(
      1
    );
    expect(carousel.count).toEqual(0);
    expect(carousel.index).toEqual(0);
  });

  it("tests that new declarative carousel are creating right", () => {
    document.body.innerHTML =
      "<div><ul class='carousel'><li class='carousel__item'><img src='url'></li></ul></div>";

    let ul = document.querySelector("ul");

    let carousel = new Carousel(ul, ["url1", "url2", "url3"]);

    expect(carousel.count).toEqual(4);
    expect(carousel.index).toEqual(0);

    expect(ul.querySelectorAll(".carousel__item").length).toEqual(4);
    expect(ul.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(ul.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(ul.querySelectorAll("img").length).toEqual(4);
    expect(ul.querySelectorAll("li").length).toEqual(4);
    expect(ul.parentNode.querySelector(".carousel-count").innerHTML).toEqual(
      ":..."
    );
  });

  it("tests that new carousel are creating right", () => {
    document.body.innerHTML = "<div></div>";

    let div = document.querySelector("div");

    let carousel = new Carousel(div, ["url1", "url2", "url3"]);

    expect(carousel.count).toEqual(3);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":..");

    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );

    let left = div.querySelector(".carousel-ctrls__item--left");
    let right = div.querySelector(".carousel-ctrls__item--right");
    right.dispatchEvent(new MouseEvent("click", {}));

    expect(carousel.index).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item"
    );
    expect(div.querySelectorAll(".carousel__item")[1].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(".:.");

    left.dispatchEvent(new MouseEvent("click", {}));

    expect(carousel.index).toEqual(0);
    expect(div.querySelectorAll(".carousel__item")[1].className).toEqual(
      "carousel__item"
    );
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":..");

    left.dispatchEvent(new MouseEvent("click", {}));
    expect(carousel.index).toEqual(2);

    document.body.innerHTML = "<div></div>";
    div = document.querySelector("div");
    carousel = new Carousel(div);

    expect(carousel.count).toEqual(0);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual("");

    left = div.querySelector(".carousel-ctrls__item--left");
    right = div.querySelector(".carousel-ctrls__item--right");

    right.dispatchEvent(new MouseEvent("click", {}));
    expect(carousel.index).toEqual(0);

    left.dispatchEvent(new MouseEvent("click", {}));
    expect(carousel.index).toEqual(0);
  });

  it("tests that new carousel's last element are adding and removing right", () => {
    document.body.innerHTML = "<div></div>";

    let div = document.querySelector("div");

    let carousel = new Carousel(div, ["url1", "url2", "url3"]);

    expect(carousel.count).toEqual(3);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":..");

    carousel.add("url");
    expect(carousel.count).toEqual(4);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":...");

    expect(div.querySelectorAll(".carousel__item").length).toEqual(4);
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll("img").length).toEqual(4);
    expect(div.querySelectorAll("li").length).toEqual(4);

    let right = div.querySelector(".carousel-ctrls__item--right");
    right.dispatchEvent(new MouseEvent("click", {}));
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(".:..");
    right.dispatchEvent(new MouseEvent("click", {}));
    expect(div.querySelector(".carousel-count").innerHTML).toEqual("..:.");
    right.dispatchEvent(new MouseEvent("click", {}));
    expect(div.querySelector(".carousel-count").innerHTML).toEqual("...:");
    expect(carousel.index).toEqual(3);
    right.dispatchEvent(new MouseEvent("click", {}));
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":...");
    expect(carousel.index).toEqual(0);

    carousel.remove();
    expect(carousel.index).toEqual(0);
    expect(carousel.count).toEqual(3);

    expect(div.querySelectorAll(".carousel__item").length).toEqual(3);
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll("img").length).toEqual(3);
    expect(div.querySelectorAll("li").length).toEqual(3);

    carousel.remove();
    carousel.remove();
    carousel.remove();
    expect(div.querySelector(".carousel-count").innerHTML).toEqual("");
    expect(carousel.index).toEqual(0);
    expect(carousel.count).toEqual(0);

    carousel.remove();
    expect(div.querySelector(".carousel-count").innerHTML).toEqual("");
    expect(carousel.index).toEqual(0);
    expect(carousel.count).toEqual(0);
  });

  it("tests that new carousel elements are adding and removing right by index", () => {
    document.body.innerHTML = "<div></div>";

    let div = document.querySelector("div");

    let carousel = new Carousel(div, ["url1", "url2", "url3"]);

    expect(carousel.count).toEqual(3);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":..");

    carousel.add("url", 0);
    expect(carousel.count).toEqual(4);
    expect(carousel.index).toEqual(1);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(".:..");
    expect(div.querySelectorAll(".carousel__item").length).toEqual(4);
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[1].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll("img").length).toEqual(4);
    expect(div.querySelectorAll("li").length).toEqual(4);

    carousel.remove(1);
    expect(carousel.count).toEqual(3);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":..");
    expect(div.querySelectorAll(".carousel__item").length).toEqual(3);
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll("img").length).toEqual(3);
    expect(div.querySelectorAll("li").length).toEqual(3);

    carousel.remove(1);
    expect(carousel.count).toEqual(2);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":.");
    expect(div.querySelectorAll(".carousel__item").length).toEqual(2);
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll("img").length).toEqual(2);
    expect(div.querySelectorAll("li").length).toEqual(2);

    carousel.remove(10);
    expect(carousel.count).toEqual(1);
    expect(carousel.index).toEqual(0);
    expect(div.querySelector(".carousel-count").innerHTML).toEqual(":");
    expect(div.querySelectorAll(".carousel__item").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item--active").length).toEqual(1);
    expect(div.querySelectorAll(".carousel__item")[0].className).toEqual(
      "carousel__item carousel__item--active"
    );
    expect(div.querySelectorAll("img").length).toEqual(1);
    expect(div.querySelectorAll("li").length).toEqual(1);
  });
});
