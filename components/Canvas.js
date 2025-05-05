"use client"

import { useState, useEffect, forwardRef } from "react"
import DraggableElement from "./DraggableElement"
import "../styles/Canvas.css"

const Canvas = forwardRef(({ elements, selectedElement, setSelectedElement, updateElement, theme }, ref) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize({
        width: Math.min(window.innerWidth * 0.7, 900),
        height: Math.min(window.innerHeight * 0.8, 700),
      })
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`canvas theme-${theme}`}
      style={{ width: canvasSize.width, height: canvasSize.height }}
      onClick={() => setSelectedElement(null)}
    >
      {elements.map((element) => (
        <DraggableElement
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onSelect={() => setSelectedElement(element.id)}
          updateElement={updateElement}
        />
      ))}
    </div>
  )
})

Canvas.displayName = "Canvas"

export default Canvas
