import "./css/example.css";

const ImageCarousel = (function (doc) {
  let ImgCarousels;

  function initCarousel(carousel) {
    const carouselSlides = carousel.childNodes;
    for (const node of carouselSlides) {
      console.log(node);
    }
    // carouselSlides.forEach((slide, index) => {
    //   console.log(slide);
    //   slide.setAttribute("data-id", index);
    //   if (index === 0) slide.classList.add("active");
    // });
  }

  function initCarousels() {
    ImgCarousels = doc.querySelectorAll(".img-carousel");
    ImgCarousels.forEach((carousel) => {
      initCarousel(carousel);
    });
  }
  return {
    init: initCarousels,
  };
})(document);

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
    slide.classList.add("img-slide");
    slide.append(createImage(images));
    carousel.append(slide);
  }

  function addImages() {
    import(`./images/appetizers.jpg?sizes[]=500,sizes[]=1920`).then(
      (images) => {
        createSlide(images);
      },
    );

    import(`./images/desserts.jpg?sizes[]=500,sizes[]=1920`).then((images) => {
      createSlide(images);
    });
    import(`./images/pasta.jpg?sizes[]=500,sizes[]=1920`).then((images) => {
      createSlide(images);
    });
    import(`./images/pizza.jpg?sizes[]=500,sizes[]=1920`).then((images) => {
      createSlide(images);
    });
    import(`./images/salad.jpg?sizes[]=500,sizes[]=1920`).then((images) => {
      createSlide(images);
    });
  }

  function init() {
    carousel = doc.querySelector(".img-carousel");
    addImages();
    ImageCarousel.init();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(document);
