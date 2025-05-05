"use client"

import "../styles/Toolbar.css"

const Toolbar = ({ onAddImage, onAddText, onSave }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <div className="toolbar-buttons">
          <div className="toolbar-button image-upload">
            <label htmlFor="image-upload" className="button-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 15L16 10L5 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add Image
            </label>
            <input id="image-upload" type="file" accept="image/*" onChange={onAddImage} style={{ display: "none" }} />
          </div>

          <div className="toolbar-dropdown">
            <button className="toolbar-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add Text
            </button>
            <div className="dropdown-content">
              <button onClick={() => onAddText("default")}>Normal Text</button>
              <button onClick={() => onAddText("title")}>Title</button>
              <button onClick={() => onAddText("subtitle")}>Subtitle</button>
              <button onClick={() => onAddText("quote")}>Quote</button>
            </div>
          </div>
        </div>
      </div>

      <div className="toolbar-section">
        <button className="save-button" onClick={onSave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 21V13H7V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Save Journal
        </button>
      </div>
    </div>
  )
}

export default Toolbar
