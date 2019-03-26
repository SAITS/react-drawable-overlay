import React, { useContext } from "react"
import { DrawableContext } from "react-drawable-overlay"
import { HuePicker } from "react-color"
import Tool from "./Tool"
import Button from "./Button"

function Toolbar() {
  const {
    setBrushSize,
    brushSize,
    brushColor,
    setBrushColor,
    eraserSize,
    setEraserSize,
    onUndo,
    onRedo,
    currentHistoryIndex,
    history,
    onReset,
  } = useContext(DrawableContext)

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
        onClick={onUndo}
        disabled={currentHistoryIndex === -1}
      />
      <Button
        icon="redo"
        onClick={onRedo}
        disabled={currentHistoryIndex + 1 === history.length}
      />
      <Button
        text="Reset canvas"
        onClick={onReset}
        disabled={!history.length}
      />
    </div>
  )
}

export default Toolbar
