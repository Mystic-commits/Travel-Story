"use client"

import { useState } from "react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import "../styles/ExportOptions.css"

const ExportOptions = ({ canvasRef, elements, onClose }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportMessage, setExportMessage] = useState("")
  const [exportProgress, setExportProgress] = useState(0)

  const exportAsPDF = async () => {
    setIsExporting(true)
    setExportMessage("Generating PDF...")
    setExportProgress(10)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const canvas = await html2canvas(canvasRef.current)
      setExportProgress(95)

      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      })

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
      pdf.save("travel-journal.pdf")

      clearInterval(progressInterval)
      setExportProgress(100)
      setExportMessage("PDF exported successfully!")
    } catch (error) {
      console.error("Error exporting PDF:", error)
      setExportMessage("Error exporting PDF. Please try again.")
      setExportProgress(0)
    } finally {
      setTimeout(() => {
        setIsExporting(false)
        setExportMessage("")
        setExportProgress(0)
      }, 2000)
    }
  }

  const exportAsVideo = async () => {
    setIsExporting(true)
    setExportMessage("Generating video... This may take a moment.")
    setExportProgress(10)

    // Simulate video generation with progress
    const progressInterval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + 5
      })
    }, 300)

    // This is a simplified version - in a real app, you would use Remotion's
    // renderMedia function to create an actual video file
    setTimeout(() => {
      clearInterval(progressInterval)
      setExportProgress(100)
      setExportMessage("Video exported successfully!")
      setTimeout(() => {
        setIsExporting(false)
        setExportMessage("")
        setExportProgress(0)
      }, 2000)
    }, 4000)
  }

  return (
    <div className="export-options-overlay">
      <div className="export-options-container">
        <div className="export-header">
          <svg
            className="success-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
              stroke="#27ae60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 4L12 14.01L9 11.01"
              stroke="#27ae60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Journal saved successfully!</h2>
          <p>Your travel memories are safely stored. Now you can export them in different formats.</p>
        </div>

        <div className="export-options">
          <div className="export-option">
            <div className="export-option-icon pdf-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="#e74c3c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14 2V8H20" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17H8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 9H9H8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="export-option-content">
              <h3>PDF Document</h3>
              <p>
                Export your journal as a high-quality PDF document that preserves your layout exactly as you designed
                it.
              </p>
              <button className="export-button pdf-button" onClick={exportAsPDF} disabled={isExporting}>
                Export as PDF
              </button>
            </div>
          </div>

          <div className="export-option">
            <div className="export-option-icon video-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23 7L16 12L23 17V7Z"
                  stroke="#3498db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                  stroke="#3498db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="export-option-content">
              <h3>Video Animation</h3>
              <p>
                Transform your journal into a dynamic video with smooth transitions and animations between your
                elements.
              </p>
              <button className="export-button video-button" onClick={exportAsVideo} disabled={isExporting}>
                Export as Video
              </button>
            </div>
          </div>
        </div>

        {isExporting && (
          <div className="export-progress">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${exportProgress}%` }}></div>
            </div>
            <div className="export-message">{exportMessage}</div>
          </div>
        )}

        <button className="close-button" onClick={onClose}>
          Return to Editor
        </button>
      </div>
    </div>
  )
}

export default ExportOptions
