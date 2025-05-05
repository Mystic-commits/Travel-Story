"use client"

import { useEffect, useRef } from "react"
import anime from "animejs"
import "../styles/SaveAnimation.css"

const SaveAnimation = () => {
  const progressRef = useRef(null)
  const textRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Animate the container
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: "easeOutQuad",
      duration: 600,
    })

    // Animate the progress bar
    const progressAnimation = anime({
      targets: progressRef.current,
      width: "100%",
      easing: "easeInOutQuad",
      duration: 2000,
    })

    // Animate the text
    const textAnimation = anime({
      targets: textRef.current,
      opacity: [0, 1],
      translateY: [10, 0],
      easing: "easeOutQuad",
      duration: 800,
    })

    return () => {
      progressAnimation.pause()
      textAnimation.pause()
    }
  }, [])

  return (
    <div className="save-animation-overlay">
      <div ref={containerRef} className="save-animation-container">
        <div ref={textRef} className="save-text">
          <svg
            className="save-icon"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          Saving your story...
        </div>
        <div className="progress-bar">
          <div ref={progressRef} className="progress"></div>
        </div>
      </div>
    </div>
  )
}

export default SaveAnimation
