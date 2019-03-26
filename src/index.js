import React, { useRef, useState, createContext, useEffect } from "react"
import PropTypes from "prop-types"
import { Stage, Layer } from "react-konva"
import ResizeObserver from "resize-observer-polyfill"
import Canvas from "./components/Canvas"
import "./styles.css"

export const DrawableContext = createContext({})

function DrawableOverlay(props) {
  const layerRef = useRef()
  const drawableRef = useRef()
  const [history, setHistory] = useState([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const [drawableAreaDimensions, setDrawableAreaDimensions] = useState(null)
  const [drawMode, setDrawMode] = useState("brush")
  const [brushSize, setBrushSize] = useState(10)
  const [eraserSize, setEraserSize] = useState(10)
  const [brushColor, setBrushColor] = useState(
    props.defaultBrushColor || "#FFF"
  )
  const { children, inDrawMode, renderDrawableContent, onAddToHistory } = props

  const resizeObserver = new ResizeObserver(() => {
    const el = drawableRef.current
    if (!el) return

    const offsetLeft = props.widthOffset || 0
    const offsetTop = props.heightOffset || 0

    const width = el.clientWidth - offsetLeft
    const height = el.clientHeight - offsetTop

    setDrawableAreaDimensions({ width, height })
  })

  useEffect(() => {
    resizeObserver.observe(drawableRef.current)
  }, [drawableRef.current])

  const clearCanvas = () =>
    layerRef.current
      .getContext()
      .clear({ x: 0, y: 0, ...drawableAreaDimensions })

  const handleReset = () => {
    clearCanvas()
    setHistory([])
    setCurrentHistoryIndex(-1)
  }

  const addToHistory = img => {
    const nextHistoryIndex = currentHistoryIndex + 1

    let newHistory = [...history]

    if (nextHistoryIndex < history.length)
      newHistory.splice(nextHistoryIndex, history.length - nextHistoryIndex)

    setHistory([...newHistory, img])

    setCurrentHistoryIndex(nextHistoryIndex)
    onAddToHistory && onAddToHistory(img)
  }

  const handleHistoryChange = direction => {
    clearCanvas()

    const newImgSrcIndex =
      direction === "undo" ? currentHistoryIndex - 1 : currentHistoryIndex + 1

    const context = layerRef.current.getContext()
    const newImage = new Image()

    context.globalCompositeOperation = "source-over"

    newImage.src = history[newImgSrcIndex]
    newImage.onload = () => {
      context.drawImage(newImage, 0, 0)
      if (drawMode === "eraser")
        context.globalCompositeOperation = "destination-out"
    }

    setCurrentHistoryIndex(newImgSrcIndex)
  }

  const undoBrushStroke = () => handleHistoryChange("undo")

  const redoBrushStroke = () => handleHistoryChange("redo")

  const contextValue = {
    onUndo: undoBrushStroke,
    onRedo: redoBrushStroke,
    onClearCanvas: clearCanvas,
    onReset: handleReset,
    currentHistoryIndex,
    history,
    brushSize,
    eraserSize,
    drawMode,
    brushColor,
    setBrushColor,
    setEraserSize,
    setBrushSize,
    setDrawMode,
  }

  return (
    <DrawableContext.Provider value={contextValue}>
      <div className="ReactDrawableOverlay">
        <div
          className="ReactDrawableOverlay__DrawableContent"
          ref={drawableRef}
        >
          {drawableAreaDimensions && (
            <Stage
              width={drawableAreaDimensions.width}
              style={{ display: inDrawMode ? "block" : "none" }}
              height={drawableAreaDimensions.height}
              className="ReactDrawableOverlay__Stage"
            >
              <Layer ref={layerRef}>
                <Canvas
                  dimensions={drawableAreaDimensions}
                  drawMode={drawMode}
                  brushColor={brushColor}
                  brushSize={brushSize}
                  eraserSize={eraserSize}
                  onAddToHistory={addToHistory}
                />
              </Layer>
            </Stage>
          )}
          {renderDrawableContent(contextValue)}
        </div>
        {children}
      </div>
    </DrawableContext.Provider>
  )
}

DrawableOverlay.propTypes = {
  renderDrawableContent: PropTypes.func,
  inDrawMode: PropTypes.bool,
  defaultBrushColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

DrawableOverlay.defaultProps = {
  inDrawMode: true,
}

export default DrawableOverlay
