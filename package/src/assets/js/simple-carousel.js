import "./css/simple-carousel.css";
import { documentMock } from "./document-mock";

export const SimpleCarousel = (function (doc) {
  function rotate(currentCarousel, currentSlide, nextSlideId) {
    // Find next slide
    const nextSlide = currentCarousel.querySelector(
      `.simple-slide[data-id="${nextSlideId}"]`,
    );

    // Find current and next dot
    const currentDot = currentCarousel.querySelector(".simple-dot.active");
    const nextDot = currentCarousel.querySelector(
      `.simple-dot[data-id="${nextSlideId}"]`,
    );

    // Add active class to active slide and dot and remove it from the previous ones
    nextSlide.classList.add("active");
    nextDot.classList.add("active");
    currentSlide.classList.remove("active");
    currentDot.classList.remove("active");
  }

  function isInfinite(currentCarousel) {
    return currentCarousel.classList.contains("infinite");
  }

  function getCarouselComponents(event) {
    const currentCarousel = event.target.closest(".simple-carousel");
    const carouselInfinite = isInfinite(currentCarousel);
    const slidesCount =
      currentCarousel.querySelectorAll(".simple-slide").length;
    const currentSlide = currentCarousel.querySelector(".simple-slide.active");

    return {
      currentCarousel,
      carouselInfinite,
      slidesCount,
      currentSlide,
    };
  }

  function toggleArrowState(currentCarousel, slidesCount, nextSlideId) {
    const arrowLeft = currentCarousel.querySelector(
      ".simple-arrow[data-direction='left']",
    );
    const arrowRight = currentCarousel.querySelector(
      ".simple-arrow[data-direction='right']",
    );
    if (nextSlideId < slidesCount - 1 && nextSlideId !== 0) {
      // Remove disabled class from left arrow
      arrowLeft.classList.remove("disabled");

      // Remove disabled class from right arrow
      arrowRight.classList.remove("disabled");
    } else if (nextSlideId === 0) {
      // Disable arrow left
      arrowLeft.classList.add("disabled");

      // Remove disabled class from right arrow
      arrowRight.classList.remove("disabled");
    } else if (nextSlideId === slidesCount - 1) {
      // Disable arrow right
      arrowRight.classList.add("disabled");

      // Remove disabled class from left arrow
      arrowLeft.classList.remove("disabled");
    }
  }

  function rotateForward(event) {
    event.stopPropagation();

    // Get carousel components
    const { currentCarousel, carouselInfinite, slidesCount, currentSlide } =
      getCarouselComponents(event);

    if (currentSlide) {
      // Find active slide id and check if there is a next slide
      const currentSlideId = Number(currentSlide.getAttribute("data-id"));
      const hasNextSlide = currentSlideId < slidesCount - 1;

      if (hasNextSlide || carouselInfinite) {
        // Set the data-id of the next slide
        const nextSlideId = hasNextSlide ? currentSlideId + 1 : 0;

        // Change  slide
        rotate(currentCarousel, currentSlide, nextSlideId);

        if (!carouselInfinite) {
          toggleArrowState(currentCarousel, slidesCount, nextSlideId);
        }
      }
    }
  }

  function rotateBackward(event) {
    event.stopPropagation();

    // Get carousel components
    const { currentCarousel, carouselInfinite, slidesCount, currentSlide } =
      getCarouselComponents(event);

    if (currentSlide) {
      // Find active slide id and check if there is a next slide
      const currentSlideId = Number(currentSlide.getAttribute("data-id"));
      const hasNextSlide = currentSlideId > 0;

      if (hasNextSlide || carouselInfinite) {
        // Set the data-id of the next slide
        const nextSlideId = hasNextSlide ? currentSlideId - 1 : slidesCount - 1;

        // Change slide
        rotate(currentCarousel, currentSlide, nextSlideId);

        if (!carouselInfinite) {
          toggleArrowState(currentCarousel, slidesCount, nextSlideId);
        }
      }
    }
  }

  function dotNavigate(event) {
    event.stopPropagation();

    // Find next slide id
    const nextSlideId = Number(event.target.getAttribute("data-id"));

    // Get carousel components
    const carouselComponents = getCarouselComponents(event);

    // Change slide
    rotate(
      carouselComponents["currentCarousel"],
      carouselComponents["currentSlide"],
      nextSlideId,
    );

    if (!carouselComponents["carouselInfinite"]) {
      toggleArrowState(
        carouselComponents["currentCarousel"],
        carouselComponents["slidesCount"],
        nextSlideId,
      );
    }
  }

  function createArrows(currentCarousel) {
    const arrowLeft = doc.createElement("button");
    arrowLeft.classList.add("simple-arrow");
    const arrowRight = arrowLeft.cloneNode(true);

    if (!isInfinite(currentCarousel)) {
      // Disable left arrow
      arrowLeft.classList.add("disabled");
    }

    // Add direction attribute to arrows
    arrowLeft.setAttribute("data-direction", "left");
    arrowLeft.setAttribute("aria-label", "left");
    arrowRight.setAttribute("data-direction", "right");
    arrowRight.setAttribute("aria-label", "right");

    // Bind events
    arrowLeft.addEventListener("click", rotateBackward);
    arrowRight.addEventListener("click", rotateForward);

    return { arrowLeft, arrowRight };
  }

  function createDot(id) {
    // Create navigation dot
    const dot = doc.createElement("button");
    dot.classList.add("simple-dot");

    // Set the same data-id to dot as the slide it represents
    dot.setAttribute("data-id", id);
    dot.setAttribute("aria-label", `navigate to slide number ${id + 1}`);

    // Bind events
    dot.addEventListener("click", dotNavigate);

    return dot;
  }

  function autoplayForward(currentCarousel) {
    // Get carousel components
    const slidesCount =
      currentCarousel.querySelectorAll(".simple-slide").length;
    const currentSlide = currentCarousel.querySelector(".simple-slide.active");

    if (currentSlide) {
      // Find active slide id and check if there is a next slide
      const currentSlideId = Number(currentSlide.getAttribute("data-id"));
      const hasNextSlide = currentSlideId < slidesCount - 1;

      // Set the data-id of the next slide and arrow
      let nextSlideId = hasNextSlide ? currentSlideId + 1 : 0;

      // Change  slide
      rotate(currentCarousel, currentSlide, nextSlideId);

      if (!isInfinite(currentCarousel)) {
        toggleArrowState(currentCarousel, slidesCount, nextSlideId);
      }
    }
  }

  function addAutoplay(currentCarousel) {
    setInterval(() => {
      autoplayForward(currentCarousel);
    }, 5000);
  }

  function initCarousel(currentCarousel) {
    // Get all slides of carousel
    const carouselSlides = currentCarousel.querySelectorAll(".simple-slide");

    // Create container to hold all the navigation dots
    const dotsContainer = doc.createElement("nav");
    dotsContainer.classList.add("simple-dots");

    carouselSlides.forEach((slide, index) => {
      // Add data-id to each slide
      slide.setAttribute("data-id", index);

      // Create a navigation dot for each slide and add it to the dot container
      const slideDot = createDot(index);
      dotsContainer.append(slideDot);

      // Add class active to the first slide
      if (index === 0) {
        slide.classList.add("active");
        slideDot.classList.add("active");
      }
    });

    // Create navigation arrows
    const { arrowLeft, arrowRight } = createArrows(currentCarousel);

    // Add navigation arrows and dots to carousel
    currentCarousel.append(arrowLeft, arrowRight, dotsContainer);

    if (currentCarousel.classList.contains("autoplay"))
      addAutoplay(currentCarousel);
  }

  function initCarousels() {
    const SimpleCarousels = doc.querySelectorAll(".simple-carousel");
    SimpleCarousels.forEach((currentCarousel) => {
      initCarousel(currentCarousel);
    });
  }

  initCarousels();
})(document || documentMock);
