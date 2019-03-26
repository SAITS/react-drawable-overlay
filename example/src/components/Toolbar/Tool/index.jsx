import React, { useContext } from "react"
import { DrawableContext } from "react-drawable-overlay"
import RangeSlider from "../../RangeSlider"
import cx from "classnames"

function Tool(props) {
  const { drawMode, setDrawMode } = useContext(DrawableContext)

  return (
    <div
      className={cx("tool", { "tool--active": drawMode === props.tool })}
      onClick={() => setDrawMode(props.tool)}
    >
      <span className="tool__name">{props.label}</span>
      <RangeSlider
        value={props.brushSize}
        max={10}
        min={1}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Tool
