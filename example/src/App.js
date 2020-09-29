import React from "react"
import { DrawableOverlay, useStage } from "react-drawable-overlay"
import Toolbar from "./components/Toolbar"

const Content = () => {
  const stage = useStage()

  return (
    <React.Fragment>
      <div
        style={{ position: "relative", height: 500, width: 1000 }}
        className="drawable-content"
      >
        {stage}
      </div>
      <Toolbar />
    </React.Fragment>
  )
}

const App = () => {
  return (
    <div className="wrapper">
      <DrawableOverlay defaultBrushColor="#0000FF" initialInDrawMode>
        <Content />
      </DrawableOverlay>
    </div>
  )
}

export default App
