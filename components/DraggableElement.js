"use client"

import { useState, useRef, useEffect } from "react"
import TextEditor from "./TextEditor"
import "../styles/DraggableElement.css"

const DraggableElement = ({ element, isSelected, onSelect, updateElement }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const elementRef = useRef(null)

  const handleMouseDown = (e) => {
    e.stopPropagation()
    onSelect()

    const rect = elementRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    }

    updateElement(element.id, { position: newPosition })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    if (element.type === "text") {
      setIsEditing(true)
    }
  }

  const handleRotationStart = (e) => {
    e.stopPropagation()

    const rect = elementRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const handleRotationMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - centerX
      const deltaY = moveEvent.clientY - centerY

      // Calculate angle in radians and convert to degrees
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      // Add 90 degrees to make rotation feel more natural
      angle = angle + 90

      updateElement(element.id, { rotation: angle })
    }

    const handleRotationEnd = () => {
      document.removeEventListener("mousemove", handleRotationMove)
      document.removeEventListener("mouseup", handleRotationEnd)
    }

    document.addEventListener("mousemove", handleRotationMove)
    document.addEventListener("mouseup", handleRotationEnd)
  }

  const renderElement = () => {
    if (element.type === "image") {
      return (
        <div
          className={`image-container ${element.border || ""}`}
          style={{
            filter: element.filter || "none",
          }}
        >
          <img
            src={element.src || "/placeholder.svg"}
            alt="Journal image"
            style={{
              width: element.size.width,
              height: element.size.height,
              transform: `rotate(${element.rotation || 0}deg)`,
            }}
          />
        </div>
      )
    } else if (element.type === "text") {
      if (isEditing) {
        return (
          <TextEditor element={element} updateElement={updateElement} onFinishEditing={() => setIsEditing(false)} />
        )
      } else {
        return (
          <div
            className="text-element"
            style={{
              fontSize: element.style.fontSize,
              color: element.style.color,
              fontFamily: element.style.fontFamily,
              fontWeight: element.style.fontWeight || "normal",
              fontStyle: element.style.fontStyle || "normal",
              lineHeight: element.style.lineHeight || "1.5",
              maxWidth: element.style.maxWidth || "none",
              textAlign: element.style.textAlign || "left",
              transform: `rotate(${element.rotation || 0}deg)`,
              textShadow: element.style.textShadow || "none",
              letterSpacing: element.style.letterSpacing || "normal",
            }}
          >
            {element.content}
          </div>
        )
      }
    }
  }

  return (
    <div
      ref={elementRef}
      className={`draggable-element ${isSelected ? "selected" : ""}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {renderElement()}
      {isSelected && (
        <>
          <div className="element-controls">
            {element.type === "text" && <button onClick={() => setIsEditing(true)}>Edit</button>}
          </div>
          <div className="rotation-handle" onMouseDown={(e) => handleRotationStart(e)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

export default DraggableElement
