import { SimpleCarousel } from "./simple-carousel.js";
import carouselImage1 from "./images/appetizers.jpg?sizes[]=500,sizes[]=1920";
import carouselImage2 from "./images/desserts.jpg?sizes[]=500,sizes[]=1920";
import carouselImage3 from "./images/pasta.jpg?sizes[]=500,sizes[]=1920";
import carouselImage4 from "./images/pizza.jpg?sizes[]=500,sizes[]=1920";
import carouselImage5 from "./images/salad.jpg?sizes[]=500,sizes[]=1920";

(function (doc) {
  let carousel;

  function createImage(images) {
    const newImage = doc.createElement("img");
    newImage.setAttribute("srcset", images.srcSet);
    newImage.setAttribute("src", images.src);
    newImage.setAttribute("alt", images.placeholder);
    newImage.setAttribute("sizes", "(max-width: 676px) 500px, 1920px");
    return newImage;
  }

  function createSlide(images) {
    let slide = doc.createElement("div");
    slide.classList.add("simple-slide");
    slide.append(createImage(images));
    carousel.append(slide);
  }

  function addImages() {
    createSlide(carouselImage1);
    createSlide(carouselImage2);
    createSlide(carouselImage3);
    createSlide(carouselImage4);
    createSlide(carouselImage5);
  }

  async function init() {
    carousel = doc.querySelector(".simple-carousel");
    addImages();
    SimpleCarousel.init();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document);
