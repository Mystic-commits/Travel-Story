"use client"

import { useState } from "react"
import "../styles/TextEditor.css"

const TextEditor = ({ element, updateElement, onFinishEditing }) => {
  const [text, setText] = useState(element.content)
  const [fontSize, setFontSize] = useState(element.style.fontSize)
  const [color, setColor] = useState(element.style.color)
  const [fontFamily, setFontFamily] = useState(element.style.fontFamily || "Lora, serif")
  const [fontWeight, setFontWeight] = useState(element.style.fontWeight || "normal")
  const [fontStyle, setFontStyle] = useState(element.style.fontStyle || "normal")
  const [textAlign, setTextAlign] = useState(element.style.textAlign || "left")
  const [letterSpacing, setLetterSpacing] = useState(element.style.letterSpacing || "normal")
  const [textShadow, setTextShadow] = useState(element.style.textShadow || "none")

  const handleSave = () => {
    updateElement(element.id, {
      content: text,
      style: {
        ...element.style,
        fontSize,
        color,
        fontFamily,
        fontWeight,
        fontStyle,
        textAlign,
        letterSpacing,
        textShadow,
      },
      rotation: element.rotation,
    })
    onFinishEditing()
  }

  const fontFamilies = [
    { name: "Lora", value: "Lora, serif" },
    { name: "Playfair Display", value: "Playfair Display, serif" },
    { name: "Montserrat", value: "Montserrat, sans-serif" },
    { name: "Merriweather", value: "Merriweather, serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif" },
    { name: "Roboto", value: "Roboto, sans-serif" },
    { name: "Dancing Script", value: "Dancing Script, cursive" },
    { name: "Pacifico", value: "Pacifico, cursive" },
  ]

  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "42px",
    "48px",
    "56px",
    "64px",
  ]

  const textShadowOptions = [
    { name: "None", value: "none" },
    { name: "Light", value: "1px 1px 2px rgba(0,0,0,0.1)" },
    { name: "Medium", value: "2px 2px 4px rgba(0,0,0,0.2)" },
    { name: "Strong", value: "3px 3px 6px rgba(0,0,0,0.3)" },
    { name: "Glow", value: "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.5)" },
  ]

  return (
    <div className="text-editor" onClick={(e) => e.stopPropagation()}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        style={{
          fontFamily,
          fontSize,
          color,
          fontWeight,
          fontStyle,
          textAlign,
        }}
      />

      <div className="editor-tabs">
        <div className="editor-tab-content">
          <div className="editor-row">
            <div className="control-group">
              <label>Font:</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                {fontFamilies.map((font) => (
                  <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label>Size:</label>
              <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="editor-row">
            <div className="control-group">
              <label>Color:</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>

            <div className="control-group">
              <label>Style:</label>
              <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
              </select>
            </div>

            <div className="control-group">
              <label>Weight:</label>
              <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="300">Light</option>
                <option value="500">Medium</option>
                <option value="700">Bold</option>
                <option value="900">Black</option>
              </select>
            </div>
          </div>

          <div className="editor-row">
            <div className="control-group">
              <label>Align:</label>
              <div className="button-group">
                <button className={textAlign === "left" ? "active" : ""} onClick={() => setTextAlign("left")}>
                  <span className="icon">⟵</span>
                </button>
                <button className={textAlign === "center" ? "active" : ""} onClick={() => setTextAlign("center")}>
                  <span className="icon">⟷</span>
                </button>
                <button className={textAlign === "right" ? "active" : ""} onClick={() => setTextAlign("right")}>
                  <span className="icon">⟶</span>
                </button>
              </div>
            </div>

            <div className="control-group">
              <label>Shadow:</label>
              <select value={textShadow} onChange={(e) => setTextShadow(e.target.value)}>
                {textShadowOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="editor-actions">
        <button className="cancel-button" onClick={onFinishEditing}>
          Cancel
        </button>
        <button className="save-button" onClick={handleSave}>
          Apply Changes
        </button>
      </div>
    </div>
  )
}

export default TextEditor
