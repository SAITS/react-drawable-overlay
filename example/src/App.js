import React from "react"
import ReactDrawableOverlay from "react-drawable-overlay"
import Toolbar from "./components/Toolbar"

function App() {
  const renderDrawableContent = () => (
    <div style={{ height: 500, width: 1000 }} className="drawable-content" />
  )

  return (
    <div className="wrapper">
      <ReactDrawableOverlay
        renderDrawableContent={renderDrawableContent}
        defaultBrushColor="#0000FF"
      >
        <Toolbar />
      </ReactDrawableOverlay>
    </div>
  )
}

export default App
