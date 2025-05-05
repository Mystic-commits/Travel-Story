"use client"

import { useState } from "react"
import "../styles/SidePanel.css"

const SidePanel = ({ onAddText, selectedElement, updateElement, deleteElement }) => {
  const [activeTab, setActiveTab] = useState("elements")

  const handleDeleteElement = () => {
    if (selectedElement) {
      deleteElement(selectedElement.id)
    }
  }

  const handleImageFilter = (filter) => {
    if (selectedElement && selectedElement.type === "image") {
      updateElement(selectedElement.id, { filter })
    }
  }

  const handleImageBorder = (border) => {
    if (selectedElement && selectedElement.type === "image") {
      updateElement(selectedElement.id, { border })
    }
  }

  return (
    <div className="side-panel">
      <div className="panel-tabs">
        <button
          className={`panel-tab ${activeTab === "elements" ? "active" : ""}`}
          onClick={() => setActiveTab("elements")}
        >
          Elements
        </button>
        <button
          className={`panel-tab ${activeTab === "styles" ? "active" : ""}`}
          onClick={() => setActiveTab("styles")}
        >
          Styles
        </button>
      </div>

      <div className="panel-content">
        {activeTab === "elements" && (
          <div className="elements-tab">
            <h3>Add Elements</h3>

            <div className="element-section">
              <h4>Text Elements</h4>
              <div className="element-buttons">
                <button className="element-button" onClick={() => onAddText("title")}>
                  <span className="element-icon">T</span>
                  <span>Title</span>
                </button>
                <button className="element-button" onClick={() => onAddText("subtitle")}>
                  <span className="element-icon">S</span>
                  <span>Subtitle</span>
                </button>
                <button className="element-button" onClick={() => onAddText()}>
                  <span className="element-icon">P</span>
                  <span>Paragraph</span>
                </button>
                <button className="element-button" onClick={() => onAddText("quote")}>
                  <span className="element-icon">"</span>
                  <span>Quote</span>
                </button>
              </div>
            </div>

            <div className="element-section">
              <h4>Decorative Elements</h4>
              <div className="element-buttons">
                <button className="element-button sticker">
                  <span className="element-icon">✈️</span>
                  <span>Travel</span>
                </button>
                <button className="element-button sticker">
                  <span className="element-icon">🏖️</span>
                  <span>Beach</span>
                </button>
                <button className="element-button sticker">
                  <span className="element-icon">🏔️</span>
                  <span>Mountain</span>
                </button>
                <button className="element-button sticker">
                  <span className="element-icon">🍽️</span>
                  <span>Food</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "styles" && (
          <div className="styles-tab">
            {selectedElement ? (
              <>
                <h3>Element Styles</h3>

                {selectedElement.type === "image" && (
                  <>
                    <div className="style-section">
                      <h4>Image Filters</h4>
                      <div className="filter-buttons">
                        <button
                          className={`filter-button ${selectedElement.filter === "none" ? "active" : ""}`}
                          onClick={() => handleImageFilter("none")}
                        >
                          None
                        </button>
                        <button
                          className={`filter-button ${selectedElement.filter === "sepia(0.5)" ? "active" : ""}`}
                          onClick={() => handleImageFilter("sepia(0.5)")}
                        >
                          Vintage
                        </button>
                        <button
                          className={`filter-button ${selectedElement.filter === "grayscale(0.7)" ? "active" : ""}`}
                          onClick={() => handleImageFilter("grayscale(0.7)")}
                        >
                          B&W
                        </button>
                        <button
                          className={`filter-button ${selectedElement.filter === "contrast(1.2) saturate(1.5)" ? "active" : ""}`}
                          onClick={() => handleImageFilter("contrast(1.2) saturate(1.5)")}
                        >
                          Vibrant
                        </button>
                      </div>
                    </div>

                    <div className="style-section">
                      <h4>Image Borders</h4>
                      <div className="border-buttons">
                        <button
                          className={`border-button ${selectedElement.border === "none" ? "active" : ""}`}
                          onClick={() => handleImageBorder("none")}
                        >
                          None
                        </button>
                        <button
                          className={`border-button ${selectedElement.border === "border-white" ? "active" : ""}`}
                          onClick={() => handleImageBorder("border-white")}
                        >
                          White
                        </button>
                        <button
                          className={`border-button ${selectedElement.border === "border-black" ? "active" : ""}`}
                          onClick={() => handleImageBorder("border-black")}
                        >
                          Black
                        </button>
                        <button
                          className={`border-button ${selectedElement.border === "border-polaroid" ? "active" : ""}`}
                          onClick={() => handleImageBorder("border-polaroid")}
                        >
                          Polaroid
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="style-section">
                  <button className="delete-button" onClick={handleDeleteElement}>
                    Delete Element
                  </button>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <p>Select an element to edit its styles</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SidePanel
