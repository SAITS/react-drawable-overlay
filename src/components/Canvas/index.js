import React, { useState, useEffect, useRef } from "react"
import { Image } from "react-konva"

const Canvas = props => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState(null)
  const [lastPointerPosition, setLastPointerPosition] = useState(null)
  const image = useRef()

  const getBrushSize = () =>
    props.drawMode === "brush" ? props.brushSize : props.eraserSize

  const initCanvas = () => {
    const context = image.current.getContext()
    const canvas = context.getCanvas()

    canvas.width = 0
    canvas.height = 0

    context.lineJoin = "round"
    context.lineWidth = getBrushSize()
    context.strokeStyle = props.brushColor

    setContext(context)
  }

  useEffect(() => {
    initCanvas()
  }, [props.dimensions])

  useEffect(() => {
    if (context) context.strokeStyle = props.brushColor
  }, [props.brushColor])

  useEffect(() => {
    if (context) {
      context.lineWidth = getBrushSize()
      if (props.drawMode === "brush")
        context.globalCompositeOperation = "source-over"
      else if (props.drawMode === "eraser")
        context.globalCompositeOperation = "destination-out"
    }
  }, [props.brushSize, props.eraserSize, props.drawMode])

  const handleMouseDown = ({ evt }) => {
    if (evt.button !== 0) return
    setIsDrawing(true)
    setLastPointerPosition(image.current.getStage().getPointerPosition())
  }

  const handleMouseUp = ({ evt }) => {
    if (evt.button !== 0) return
    setIsDrawing(false)
    props.onAddToHistory(image.current.getCanvas().toDataURL())
  }

  const handleMouseMove = () => {
    if (!isDrawing) return

    let localPos = {
      x: lastPointerPosition.x - image.current.x(),
      y: lastPointerPosition.y - image.current.y(),
    }

    context.beginPath()
    context.moveTo(localPos.x, localPos.y)

    const pos = image.current.getStage().getPointerPosition()
    localPos = { x: pos.x - image.current.x(), y: pos.y - image.current.y() }

    context.lineTo(localPos.x, localPos.y)
    context.closePath()
    context.stroke()
    setLastPointerPosition(pos)
    image.current.getLayer().draw()
  }

  return (
    <Image
      ref={image}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
      {...props.dimensions}
    />
  )
}

export default Canvas
