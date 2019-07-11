declare module "react-drawable-overlay" {
  import React from "react"

  const DrawableOverlay: React.ComponentType<DrawableOverlayProps>
  export default DrawableOverlay
  export function useDrawableContext(): DrawableContextValues
  export const DrawableContext: React.Context<DrawableContextValues>

  export interface DrawableOverlayProps {
    widthOffset?: number
    heightOffset?: number
    defaultBrushColor?: string
    inDrawMode?: boolean
    className?: string
    renderDrawableContent: () => JSX.Element
    onAddToHistory?: (drawing: string) => void
  }

  export interface DrawableContextValues {
    undo: () => void
    redo: () => void
    reset: () => void
    setInitialDrawing: (drawing: string) => void
    currentHistoryIndex: number
    history: string[]
    drawMode: DrawModeTypes
    setDrawMode: (drawMode: DrawModeTypes) => void
    brushSize: number
    setBrushSize: (size: number) => void
    eraserSize: number
    setEraserSize: (size: number) => void
    brushColor: string
    setBrushColor: (hexadecimal: string) => void
  }
  export type DrawModeTypes = "brush" | "eraser"
  export enum DrawMode {
    Brush = "brush",
    Eraser = "eraser",
  }
}
