# react-drawable-overlay

> A package for wrapping an element with a drawable canvas.

[![NPM](https://img.shields.io/npm/v/react-drawable-overlay.svg)](https://www.npmjs.com/package/react-drawable-overlay) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
$ npm install --save react-drawable-overlay
$ yarn add react-drawable-overlay
```

## Usage

```jsx
import React, { Component } from "react"
import DrawableOverlay from "react-drawable-overlay"

class Example extends Component {
  renderDrawableContent = () => (
    <div style={{ height: 500, width: 1000 }}>
      <p>Content that can be drawn on</p>
    </div>
  )

  render() {
    return (
      <DrawableOverlay
        renderDrawableContent={renderDrawableContent}
        defaultBrushColor="#000"
      >
        <p>
          Content that cannot be drawn on but still has access to the
          Context-values
        </p>
        <Toolbar />
      </DrawableOverlay>
    )
  }
}
```

## Props

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| Prop                    | Type                         | Default     | Description                                                           |
| ----------------------- | ---------------------------- | ----------- | --------------------------------------------------------------------- |
| `renderDrawableContent` | `function()`                 | `undefined` | Returns the element to draw on. (Required)                            |
| `inDrawMode`            | `boolean`                    | `true`      | Whether or not you can draw on the element.                           |
| `defaultBrushColor`     | `string`                     | `#000000`   | Hexadecimal color on the initial render.                              |
| `children`              | `node`/`node[]`              | `undefined` | The children cannot be drawn on, but they have access to the context. |
| `className`             | `string`                     | `undefined` | Add a class name to DrawableOverlay.                                  |
| `heightOffset`          | `number`                     | `0`         | Used to narrow down drawable area in y-axis.                          |
| `widthOffset`           | `number`                     | `0`         | Used to narrow down drawable area in x-axis.                          |
| `onAddToHistory`        | `function(string/undefined)` | `undefined` | Callback on brush stroke.                                             |

## Context

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| Key                   | Type                           | Description                                                                       |
| --------------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `undo`                | `function()`                   | Undo latest brush stroke or eraser stroke.                                        |
| `redo`                | `function()`                   | Redo latest brush stroke or eraser stroke.                                        |
| `reset`               | `function()`                   | Clear canvas. This also resets `history` and `currentHistoryIndex`.               |
| `setInitialDrawing`   | `function(string)`             | Set a base-64 image as the initial drawing. Takes a base-64 image as an argument. |
| `currentHistoryIndex` | `number`                       | Current index in `history`.                                                       |
| `history`             | `string[]`                     | Array of base-64 images.                                                          |
| `drawMode`            | `"brush"`/`"eraser"`           | Current draw mode.                                                                |
| `setDrawMode`         | `function("brush"`/`"eraser")` | Set `drawMode`.                                                                   |
| `brushSize`           | `number`                       | Current size for the brush-tool.                                                  |
| `setBrushSize`        | `function(number)`             | Set `brushSize`.                                                                  |
| `eraserSize`          | `number`                       | Current size for the eraser-tool.                                                 |
| `setEraserSize`       | `function(number)`             | Set `eraserSize`.                                                                 |
| `brushColor`          | `string`                       | Hexadecimal color.                                                                |
| `setBrushColor`       | `function(string)`             | Set `brushColor`. Takes a hexadecimal color as an argument.                       |

## Example

See the example-folder for an example on how to use the package.

## License

MIT © [SAITS](https://github.com/SAITS)
