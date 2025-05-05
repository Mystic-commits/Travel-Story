"use client"

import { useState, useRef, useEffect } from "react"
import Canvas from "../components/Canvas"
import Toolbar from "../components/Toolbar"
import SaveAnimation from "../components/SaveAnimation"
import ExportOptions from "../components/ExportOptions"
import SidePanel from "../components/SidePanel"
import "../styles/globals.css"

export default function TravelStory() {
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [canvasTheme, setCanvasTheme] = useState("classic")
  const canvasRef = useRef(null)

  // Add some sample content when the app loads for demonstration
  useEffect(() => {
    // Only add sample content if there are no elements yet
    if (elements.length === 0) {
      const sampleElements = [
        {
          id: 1,
          type: "text",
          content: "My Travel Journal",
          position: { x: 250, y: 80 },
          style: {
            fontSize: "42px",
            color: "#2c3e50",
            fontFamily: "Playfair Display, serif",
            fontWeight: "700",
          },
          rotation: 0,
        },
        {
          id: 2,
          type: "text",
          content: "Paris, France - Summer 2023",
          position: { x: 280, y: 140 },
          style: {
            fontSize: "18px",
            color: "#7f8c8d",
            fontFamily: "Montserrat, sans-serif",
            fontStyle: "italic",
          },
          rotation: 0,
        },
        {
          id: 3,
          type: "text",
          content:
            "The city of lights welcomed me with its charm and beauty. Every corner had a story to tell, every café a memory to create.",
          position: { x: 120, y: 380 },
          style: {
            fontSize: "16px",
            color: "#34495e",
            fontFamily: "Lora, serif",
            maxWidth: "300px",
            lineHeight: "1.6",
          },
          rotation: 0,
        },
      ]
      setElements(sampleElements)
    }
  }, [])

  const addImage = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newElement = {
        id: Date.now(),
        type: "image",
        src: e.target.result,
        position: { x: 100, y: 200 },
        size: { width: 300, height: 200 },
        rotation: 0,
        filter: "none",
        border: "none",
      }
      setElements([...elements, newElement])
    }
    reader.readAsDataURL(file)
  }

  const addText = (preset = "default") => {
    let style = {
      fontSize: "16px",
      color: "#34495e",
      fontFamily: "Lora, serif",
    }

    let content = "Add your text here"

    // Text presets for different purposes
    if (preset === "title") {
      style = {
        fontSize: "32px",
        color: "#2c3e50",
        fontFamily: "Playfair Display, serif",
        fontWeight: "700",
      }
      content = "Journal Title"
    } else if (preset === "subtitle") {
      style = {
        fontSize: "18px",
        color: "#7f8c8d",
        fontFamily: "Montserrat, sans-serif",
        fontStyle: "italic",
      }
      content = "Location - Date"
    } else if (preset === "quote") {
      style = {
        fontSize: "20px",
        color: "#16a085",
        fontFamily: "Merriweather, serif",
        fontStyle: "italic",
        fontWeight: "500",
      }
      content = '"The journey, not the arrival, matters." - T.S. Eliot'
    }

    const newElement = {
      id: Date.now(),
      type: "text",
      content,
      position: { x: 150, y: 150 },
      style,
      rotation: 0,
    }
    setElements([...elements, newElement])
  }

  const updateElement = (id, updates) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id))
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate saving process
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setShowExportOptions(true)
    }, 2000)
  }

  return (
    <div className={`travel-story theme-${canvasTheme}`}>
      <div className="app-header">
        <h1 className="app-title">TravelStory</h1>
        <div className="theme-selector">
          <label>Journal Theme:</label>
          <select value={canvasTheme} onChange={(e) => setCanvasTheme(e.target.value)} className="theme-select">
            <option value="classic">Classic</option>
            <option value="vintage">Vintage</option>
            <option value="modern">Modern</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="cityscape">Cityscape</option>
          </select>
        </div>
      </div>

      <div className="main-content">
        <SidePanel
          onAddText={addText}
          selectedElement={selectedElement ? elements.find((el) => el.id === selectedElement) : null}
          updateElement={updateElement}
          deleteElement={deleteElement}
        />

        <div className="canvas-container">
          <Toolbar onAddImage={(e) => addImage(e.target.files[0])} onAddText={addText} onSave={handleSave} />

          <Canvas
            ref={canvasRef}
            elements={elements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            updateElement={updateElement}
            theme={canvasTheme}
          />
        </div>
      </div>

      {isSaving && <SaveAnimation />}

      {showExportOptions && (
        <ExportOptions canvasRef={canvasRef} elements={elements} onClose={() => setShowExportOptions(false)} />
      )}
    </div>
  )
}
