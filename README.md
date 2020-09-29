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
import { DrawableOverlay, useStage } from "react-drawable-overlay"

const Content = () => {
  const stage = useStage()

  return (
    <React.Fragment>
      <div style={{ position: "relative", height: 500, width: 500 }}>
        {stage}
      </div>
      <p>
        Content that cannot be drawn on but still has access to the
        Context-values
      </p>
      <Toolbar />
    </React.Fragment>
  )
}

const Example = () => {
  return (
    <DrawableOverlay initialInDrawMode defaultBrushColor="#000">
      <Content />
    </DrawableOverlay>
  )
}
```

## Props

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| Prop                | Type                         | Default     | Description                                  |
| ------------------- | ---------------------------- | ----------- | -------------------------------------------- |
| `initialInDrawMode` | `boolean`                    | `false`     | Whether or not you can draw on the stage.    |
| `defaultBrushColor` | `string`                     | `#000000`   | Hexadecimal color on the initial render.     |
| `children`          | `node`/`node[]`              | `undefined` | All children have access to the context.     |
| `className`         | `string`                     | `undefined` | Add a class name to DrawableOverlay.         |
| `heightOffset`      | `number`                     | `0`         | Used to narrow down drawable area in y-axis. |
| `widthOffset`       | `number`                     | `0`         | Used to narrow down drawable area in x-axis. |
| `onAddToHistory`    | `function(string/undefined)` | `undefined` | Callback on brush stroke.                    |

## State Context

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| Key          | Type                 | Description                               |
| ------------ | -------------------- | ----------------------------------------- |
| `drawMode`   | `"brush"`/`"eraser"` | Current draw mode.                        |
| `brushSize`  | `number`             | Current size for the brush-tool.          |
| `eraserSize` | `number`             | Current size for the eraser-tool.         |
| `brushColor` | `string`             | Hexadecimal color.                        |
| `inDrawMode` | `boolean`            | Whether or not the stage can be drawn on. |

## Utils Context

| Key                 | Type                           | Description                                                                       |
| ------------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `reset`             | `function()`                   | Clear canvas. This also resets `history` and `currentHistoryIndex`.               |
| `setInitialDrawing` | `function(string)`             | Set a base-64 image as the initial drawing. Takes a base-64 image as an argument. |
| `setDrawMode`       | `function("brush"`/`"eraser")` | Set `drawMode`.                                                                   |
| `setBrushSize`      | `function(number)`             | Set `brushSize`.                                                                  |
| `setEraserSize`     | `function(number)`             | Set `eraserSize`.                                                                 |
| `setBrushColor`     | `function(string)`             | Set `brushColor`. Takes a hexadecimal color as an argument.                       |
| `setInDrawMode`     | `function(boolean)`            | Set `inDrawMode`.                                                                 |

## History Context

| Key                   | Type         | Description                                |
| --------------------- | ------------ | ------------------------------------------ |
| `undo`                | `function()` | Undo latest brush stroke or eraser stroke. |
| `redo`                | `function()` | Redo latest brush stroke or eraser stroke. |
| `currentHistoryIndex` | `number`     | Current index in `history`.                |
| `history`             | `string[]`   | Array of base-64 images.                   |

## Example

See the example-folder for an example on how to use the package.

## License

MIT © [SAITS](https://github.com/SAITS)
