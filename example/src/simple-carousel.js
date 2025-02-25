import "./css/example.css";

export const SimpleCarousel = (function (doc) {
  function rotate(currentCarousel, currentSlide, nextSlideId) {
    const nextSlide = currentCarousel.querySelector(
      `[data-id="${nextSlideId}"]`,
    );

    nextSlide.classList.add("active");
    currentSlide.classList.remove("active");
  }
  function getCarouselComponents(event) {
    const currentCarousel = event.target.closest(".simple-carousel");
    const carouselInfinite = currentCarousel.classList.contains("infinite");
    const slidesCount =
      currentCarousel.querySelectorAll(".simple-slide").length;
    const currentSlide = currentCarousel.querySelector(".active");
    return {
      currentCarousel,
      carouselInfinite,
      slidesCount,
      currentSlide,
    };
  }
  function rotateForward(event) {
    event.stopPropagation();
    const { currentCarousel, carouselInfinite, slidesCount, currentSlide } =
      getCarouselComponents(event);
    if (currentSlide) {
      let currentSlideId = Number(currentSlide.getAttribute("data-id"));
      const hasNextSlide = currentSlideId++ < slidesCount - 1;
      if (hasNextSlide || carouselInfinite) {
        const nextSlideId = hasNextSlide ? currentSlideId++ : 0;
        rotate(currentCarousel, currentSlide, nextSlideId);
        currentCarousel
          .querySelector(".simple-arrow[data-direction='right']")
          .classList.remove("disabled");
      } else {
        event.target.classList.add("disabled");
      }
    }
  }
  function rotateBackward(event) {
    event.stopPropagation();
    const { currentCarousel, carouselInfinite, slidesCount, currentSlide } =
      getCarouselComponents(event);
    if (currentSlide) {
      let currentSlideId = Number(currentSlide.getAttribute("data-id"));
      console.log(currentSlideId);
      const hasNextSlide = currentSlideId > 0;
      if (hasNextSlide || carouselInfinite) {
        const nextSlideId = hasNextSlide ? currentSlideId-- : slidesCount - 1;
        rotate(currentCarousel, currentSlide, nextSlideId);
        currentCarousel
          .querySelector(".simple-arrow[data-direction='left']")
          .classList.remove("disabled");
      } else {
        event.target.classList.add("disabled");
      }
    }
  }
  function addArrows(currentCarousel) {
    const arrowLeft = doc.createElement("button");
    arrowLeft.classList.add("simple-arrow");
    const arrowRight = arrowLeft.cloneNode(true);

    arrowLeft.setAttribute("data-direction", "left");
    arrowRight.setAttribute("data-direction", "right");

    arrowLeft.addEventListener("click", rotateBackward);
    arrowRight.addEventListener("click", rotateForward);

    currentCarousel.append(arrowLeft, arrowRight);
  }
  function initCarousel(currentCarousel) {
    currentCarousel
      .querySelectorAll(".simple-slide")
      .forEach((slide, index) => {
        slide.setAttribute("data-id", index);
        if (index === 0) slide.classList.add("active");
      });
    addArrows(currentCarousel);
  }

  function initCarousels() {
    const ImgCarousels = doc.querySelectorAll(".simple-carousel");
    ImgCarousels.forEach((currentCarousel) => {
      initCarousel(currentCarousel);
    });
  }
  return {
    init: initCarousels,
  };
})(document);
