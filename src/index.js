import React, {
  useRef,
  useState,
  createContext,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react"
import PropTypes from "prop-types"
import { Stage, Layer } from "react-konva"
import ResizeObserver from "resize-observer-polyfill"
import Canvas from "./components/Canvas"
import "./styles.css"

const DrawableStateContext = createContext({})
const DrawableUtilsContext = createContext({})
const DrawableHistoryContext = createContext({})
const DrawableStageContext = createContext()

export const useDrawableState = () => useContext(DrawableStateContext)
export const useDrawableUtils = () => useContext(DrawableUtilsContext)
export const useDrawableHistory = () => useContext(DrawableHistoryContext)
export const useStage = () => useContext(DrawableStageContext)

const DrawableOverlay = props => {
  const { children, initialInDrawMode, onAddToHistory } = props

  const layerRef = useRef()
  const stageRef = useRef()
  const [history, setHistory] = useState([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const [drawableAreaDimensions, setDrawableAreaDimensions] = useState(null)
  const [drawMode, setDrawMode] = useState("brush")
  const [brushSize, setBrushSize] = useState(10)
  const [eraserSize, setEraserSize] = useState(10)
  const [brushColor, setBrushColor] = useState(props.defaultBrushColor)
  const [inDrawMode, setInDrawMode] = useState(initialInDrawMode || false)

  const setInitialDrawing = img => {
    if (!layerRef.current) return
    setHistory([])
    setCurrentHistoryIndex(-1)

    const context = layerRef.current.getContext()
    const initialDrawing = new Image()

    initialDrawing.src = img
    initialDrawing.onload = () => {
      context.drawImage(initialDrawing, 0, 0)
    }
  }

  const resizeObserver = new ResizeObserver(entries => {
    const el = entries[0].target

    const width = el.clientWidth - props.widthOffset
    const height = el.clientHeight - props.heightOffset

    setDrawableAreaDimensions({ width, height })
  })

  useEffect(() => {
    const stageInstance = stageRef.current
    if (stageInstance) resizeObserver.observe(stageInstance)
    return () => resizeObserver.unobserve(stageInstance)
  }, [stageRef])

  const clearCanvas = () => {
    const { height, width } = stageRef.current.getBoundingClientRect()

    if (layerRef.current)
      layerRef.current.getContext().clear({ x: 0, y: 0, height, width })
  }

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

  const handleHistoryChange = useCallback(
    direction => {
      if (!layerRef.current) return
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
    },
    [history, currentHistoryIndex, drawMode]
  )

  const undoBrushStroke = () => handleHistoryChange("undo")

  const redoBrushStroke = () => handleHistoryChange("redo")

  const getCursor = () => {
    const color = brushColor.replace("#", "%23")
    const fillOpacity = drawMode === "brush" ? 1 : 0
    const strokeWidth = drawMode === "brush" ? 0 : 1
    let cursorSize = drawMode === "brush" ? brushSize : eraserSize
    if (cursorSize < 2) cursorSize = 2
    const offset = cursorSize / 2
    const viewBoxSize = cursorSize * 2

    const circle = `<circle cx="${cursorSize}" cy="${cursorSize}" r="${cursorSize}" fill="${color}" fill-opacity="${fillOpacity}" stroke-width="${strokeWidth}" stroke="%23FFFFFF" />`

    return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="${cursorSize}" width="${cursorSize}" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}">${circle}</svg>') ${offset} ${offset}, auto`
  }

  const renderStage = () => {
    return (
      <div className="ReactDrawableOverlay__Stage" ref={stageRef}>
        {drawableAreaDimensions && (
          <Stage
            width={drawableAreaDimensions.width}
            style={{
              display: inDrawMode ? "block" : "none",
              cursor: getCursor(),
            }}
            height={drawableAreaDimensions.height}
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
      </div>
    )
  }

  const drawableUtils = useMemo(
    () => ({
      reset: handleReset,
      setDrawMode,
      setBrushSize,
      setEraserSize,
      setBrushColor,
      setInitialDrawing,
      setInDrawMode,
    }),
    []
  )

  const drawableState = useMemo(
    () => ({
      drawMode,
      brushSize,
      eraserSize,
      brushColor,
      inDrawMode,
    }),
    [drawMode, brushSize, eraserSize, brushColor, inDrawMode]
  )

  const drawableHistory = useMemo(
    () => ({
      undo: undoBrushStroke,
      redo: redoBrushStroke,
      history,
      currentHistoryIndex,
    }),
    [currentHistoryIndex, history, drawMode]
  )

  return (
    <DrawableUtilsContext.Provider value={drawableUtils}>
      <DrawableStateContext.Provider value={drawableState}>
        <DrawableStageContext.Provider value={renderStage()}>
          <DrawableHistoryContext.Provider value={drawableHistory}>
            {children}
          </DrawableHistoryContext.Provider>
        </DrawableStageContext.Provider>
      </DrawableStateContext.Provider>
    </DrawableUtilsContext.Provider>
  )
}

DrawableOverlay.propTypes = {
  initialInDrawMode: PropTypes.bool,
  defaultBrushColor: PropTypes.string,
  heightOffset: PropTypes.number,
  widthOffset: PropTypes.number,
  onAddToHistory: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

DrawableOverlay.defaultProps = {
  initialInDrawMode: false,
  defaultBrushColor: "#000000",
  heightOffset: 0,
  widthOffset: 0,
}

export { DrawableOverlay }
