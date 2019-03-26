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

- `renderDrawableContent` - Function. Returns the element you want to draw on. Required.
- `inDrawMode` - Boolean. Whether or not you can draw on the element. Defaults to true.
- `className` - String. Adds a class to ReactDrawableOverlay.
- `defaultBrushColor` - String (hexadecimal). If this is not specified, #000000 will be the initial brush color.
- `children` - Node/s. Children will not be able to be drawn on, but they can still access the context.

## Example

```
See the example-folder for an example on how to use the package.
```

## License

MIT © [jimmyhoglund](https://github.com/jimmyhoglund)
