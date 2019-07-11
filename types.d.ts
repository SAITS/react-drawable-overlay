import * as React from "react"

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
export const DrawableContext: React.Context<DrawableContextValues>
export interface DrawableOverlayProps {
  widthOffset?: number
  heightOffset?: number
  defaultBrushColor?: string
  inDrawMode?: boolean
  children?: JSX.Element | JSX.Element[]
  className?: string
  renderDrawableContent: () => JSX.Element
  onAddToHistory?: (drawing: string) => void
}
export type DrawModeTypes = "brush" | "eraser"
export enum DrawMode {
  Brush = "brush",
  Eraser = "eraser",
}
export declare function useDrawableContext(): DrawableContextValues
declare class DrawableOverlay extends React.Component<DrawableOverlayProps> {}
export default DrawableOverlay
