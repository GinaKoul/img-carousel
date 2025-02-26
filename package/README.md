# Simple Carousel

## Package installation

```bash
npm i simple-carousel
```

## Import menu-drop to project

### Import Css

```bash
import "simple-carousel/dist/simple-carousel.css";
```

### Import Js

```bash
import { SimpleCarousel } from "simple-carousel/dist/simple-carousel.js";
SimpleCarousel.init();
```

## Use inside project

- Add class **simple-carousel** to element that wraps the slides, in order

- Add class **simple-slide** to each slide

```bash
  <div class="simple-carousel">
    <div class="simple-slide">
      <img src="" alt="">
    </div>
    <div class="simple-slide">
      <img src="" alt="">
    </div>
  </div>
```

**_Optional:_**

- Add class **fit** to element that wraps the slide, in order to make the images inside the slide cover the width and height of the carousel

- Add class **infinite** to element that wraps the slides, in order to make carousel loop

- Add class **autoplay** to element that wraps the slides, in order to make carousel slide every 5 seconds

## Change basic carousel styling

To change the basic styling of the menu add the variables you want to change to the :root of your css file

```bash
:root {
    --simple-carousel-width: <Only works with class fit>;
    --simple-carousel-height: <Only works with class fit>;
    --simple-carousel-arrow-bg: <Carousel arrow background>;
    --simple-carousel-arrow-hover-bg: <Carousel arrow hover background>;
    --simple-carousel-arrow-disabled-bg: <Carousel arrow disabled background>;
    --simple-carousel-arrow-color: <Carousel arrow color>;
}
```
