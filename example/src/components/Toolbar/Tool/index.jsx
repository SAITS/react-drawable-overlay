import React from "react"
import { useDrawableContext } from "react-drawable-overlay"
import RangeSlider from "../../RangeSlider"
import cx from "classnames"

const Tool = ({ tool, label, brushSize, onChange }) => {
  const { drawMode, setDrawMode } = useDrawableContext()

  return (
    <div
      className={cx("tool", { "tool--active": drawMode === tool })}
      onClick={() => setDrawMode(tool)}
    >
      <span className="tool__name">{label}</span>
      <RangeSlider value={brushSize} max={10} min={1} onChange={onChange} />
    </div>
  )
}

export default Tool
