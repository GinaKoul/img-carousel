import "../css/menu-drop.css";
import { documentMock } from "./document-mock.js";

export const MenuDrop = (function (doc) {
  let breakSm = 480;
  let breakMd = 768;
  let breakLg = 1279;
  let prevWindowSize = "lg";
  let curWindowSize = "lg";
  let dropdownButtons;
  let windowWidth;

  function setBreakpointSm(value) {
    breakSm = value;
  }

  function getBreakpointSm() {
    return breakSm;
  }

  function setBreakpointMd(value) {
    breakMd = value;
  }

  function getBreakpointMd() {
    return breakMd;
  }

  function setBreakpointLg(value) {
    breakLg = value;
  }

  function getBreakpointLg() {
    return breakLg;
  }

  function closeMenu(event) {
    event.stopPropagation();
    const activeMenu = doc.querySelector(".drop-container.visible");
    if (activeMenu && !activeMenu?.contains(event.target)) {
      activeMenu.classList.remove("visible");
    }
  }

  function menuToggle(event) {
    event.stopPropagation();
    closeMenu(event);
    const currentContainer = event.target.closest(".drop-container");
    currentContainer.classList.toggle("visible");
  }

  function setCurrentSize() {
    if (windowWidth > breakLg) {
      curWindowSize = "xl";
    } else if (windowWidth > breakMd && windowWidth <= breakLg) {
      curWindowSize = "lg";
    } else if (windowWidth > breakSm && windowWidth <= breakMd) {
      curWindowSize = "md";
    } else if (windowWidth <= breakSm) {
      curWindowSize = "sm";
    }
  }

  function breakpointChanged() {
    return prevWindowSize !== curWindowSize;
  }

  function isGreater(menu) {
    return (
      parseInt(getComputedStyle(menu).getPropertyValue("min-width"), 10) >
        windowWidth || windowWidth <= breakSm
    );
  }

  function getDistanceRight(rect) {
    return windowWidth - rect.right;
  }

  function getDistanceLeft(rect) {
    return rect.left;
  }

  function getRect(el) {
    return el.getBoundingClientRect();
  }

  function isRightSide(rect) {
    return getDistanceRight(rect) < getDistanceLeft(rect);
  }

  function addStyling(btn) {
    const currentMenu = btn
      .closest(".drop-container")
      .querySelector(".drop-menu");
    if (currentMenu) {
      const rect = getRect(btn);
      currentMenu.style.removeProperty("right");
      if (isGreater(currentMenu)) {
        currentMenu.style.setProperty("min-width", "unset");
        currentMenu.style.setProperty("width", "100vw");
        currentMenu.style.setProperty("right", `-${getDistanceRight(rect)}px`);
      } else if (isRightSide(rect)) {
        currentMenu.style.setProperty("right", 0);
      }
      currentMenu.style.setProperty(
        "--drop-menu-h",
        currentMenu.scrollHeight + "px",
      );
    }
  }

  function updateStyling() {
    dropdownButtons.forEach((btn) => {
      addStyling(btn);
    });
  }

  function evalBreakpoints() {
    windowWidth = window.innerWidth;
    setCurrentSize();
    if (breakpointChanged()) {
      updateStyling();
      prevWindowSize = curWindowSize;
    }
  }

  function bindEvents() {
    dropdownButtons.forEach((btn) => btn.addEventListener("click", menuToggle));
    window.addEventListener("resize", evalBreakpoints);
    window.addEventListener("click", closeMenu);
  }

  function init() {
    dropdownButtons = doc.querySelectorAll(".drop-toggle");
    windowWidth = window.innerWidth;
    bindEvents();
    updateStyling();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {
    setBreakpointSm,
    getBreakpointSm,
    setBreakpointMd,
    getBreakpointMd,
    setBreakpointLg,
    getBreakpointLg,
  };
})(document || documentMock);
