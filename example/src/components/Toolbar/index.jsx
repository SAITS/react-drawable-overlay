import React from "react"
import {
  useDrawableUtils,
  useDrawableHistory,
  useDrawableState,
} from "react-drawable-overlay"
import { HuePicker } from "react-color"
import Tool from "./Tool"
import Button from "./Button"

const Toolbar = () => {
  const { brushSize, brushColor, eraserSize } = useDrawableState()
  const {
    reset,
    setEraserSize,
    setBrushColor,
    setBrushSize,
  } = useDrawableUtils()
  const { undo, redo, history, currentHistoryIndex } = useDrawableHistory()

  const handleBrushSizeChange = e => setBrushSize(e.target.value)

  const handleEraserSizeChange = e => setEraserSize(e.target.value)

  const handleBrushColorChange = color => setBrushColor(color.hex)

  return (
    <div className="toolbar">
      <HuePicker onChange={handleBrushColorChange} color={brushColor} />
      <Tool
        label="Brush"
        tool="brush"
        onChange={handleBrushSizeChange}
        brushSize={brushSize}
      />
      <Tool
        label="Eraser"
        tool="eraser"
        onChange={handleEraserSizeChange}
        brushSize={eraserSize}
      />
      <Button
        icon="undo"
        onClick={undo}
        disabled={currentHistoryIndex === -1}
      />
      <Button
        icon="redo"
        onClick={redo}
        disabled={currentHistoryIndex + 1 === history.length}
      />
      <Button text="Reset canvas" onClick={reset} disabled={!history.length} />
    </div>
  )
}

export default Toolbar
