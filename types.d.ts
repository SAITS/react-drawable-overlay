export interface DrawableStateContext {
  drawMode: DrawModeTypes
  brushSize: number
  eraserSize: number
  brushColor: string
  inDrawMode: boolean
}

export interface DrawableUtilsContext {
  reset: () => void
  setDrawMode: (drawMode: DrawModeTypes) => void
  setBrushSize: (size: number) => void
  setEraserSize: (size: number) => void
  setBrushColor: (hexadecimal: string) => void
  setInitialDrawing: (drawing: string) => void
  setInDrawMode: (inDrawMode: boolean) => void
}

export interface DrawableHistoryContext {
  undo: () => void
  redo: () => void
  history: string[]
  currentHistoryIndex: number
}
export interface DrawableOverlayProps {
  widthOffset?: number
  heightOffset?: number
  defaultBrushColor?: string
  initialInDrawMode?: boolean
  children?: JSX.Element | JSX.Element[]
  onAddToHistory?: (drawing: string) => void
}
export type DrawModeTypes = "brush" | "eraser"
export enum DrawMode {
  Brush = "brush",
  Eraser = "eraser",
}
export declare function useDrawableState(): DrawableStateContext
export declare function useDrawableUtils(): DrawableUtilsContext
export declare function useDrawableHistory(): DrawableHistoryContext
export declare function useStage(): JSX.Element
export declare const DrawableOverlay: (
  props: DrawableOverlayProps
) => JSX.Element
