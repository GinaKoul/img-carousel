# Menu Drop

## Package installation

```bash
npm i menu-drop
```

## Import menu-drop to project

### Import Css

```bash
import "menu-drop/dist/menu-drop.css";
```

### Import Js

```bash
import "menu-drop/dist/menu-drop.js";
```

Or

```bash
import { MenuDrop } from "menu-drop/dist/menu-drop.js";
```

## Use inside project

- Add class drop-container to element that wraps the menu

- Add class drop-toggle to element that toggles the state of menu (adds class visible to container)

- Add class drop-menu to element that contains all menu items

- Add class drop-item to all menu items

```bash
      <div class="drop-container">
        <button class="drop-toggle">Menu Toggle</button>
        <nav class="drop-menu">
          <button class="drop-item">Menu Item 1</button>
          <button class="drop-item">Menu Item 2</button>
        </nav>
      </div>
```

## Change basic menu styling

To change the basic styling of the menu add the variables you want to change to the :root of your css file

```bash
:root {
    --drop-menu-bg: <Background color of all menus>;
    --drop-toggle-py: <Menu toogle button padding y>;
    --drop-toggle-px: <Menu toogle button padding x>;
    --drop-item-brd-color: <Menu item border bottom color>;
    --drop-menu-minw: <Menu minimum width in tablet and desktop>;
}
```

## Change breakpoints used in js

- The menu changes position depending on the distance from the left and the right side of the viewport.

- It also takes up the whole viewport size if the minumum width of the menu is wider than the viewport.

- On window resize, if the width of the window passes a breakpoint there is an update of the position and the width of the menu.

- If needed the breakpoints used to update the position and width of the menu can be changed.

### Breakpoint small

**Default breakpoint small:** 480px

**Breakpoint small range:** 0 - 480px

**Change breakpoint small**

```bash
MenuDrop.setBreakpointSm(<Preferred breakpoint small size. It must be a number>);
```

**Get breakpoint small**

```bash
MenuDrop.getBreakpointSm();
```

### Breakpoint medium

**Default breakpoint medium:** 1279px

**Breakpoint medium range:** 768px - 1279px

**Change breakpoint medium**

```bash
MenuDrop.setBreakpointMd(<Preferred breakpoint medium size. It must be a number>);
```

**Get breakpoint medium**

```bash
MenuDrop.getBreakpointMd();
```

### Breakpoint large

**Default breakpoint large:** 1280px

**Breakpoint large range:** 1280px +

**Change breakpoint large**

```bash
MenuDrop.setBreakpointLg(<Preferred breakpoint large size. It must be a number>);
```

**Change breakpoint large**

```bash
MenuDrop.getBreakpointLg();
```
