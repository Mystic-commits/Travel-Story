<<<<<<< HEAD

=======
# TravelStory

TravelStory is a responsive React web application that allows users to create beautiful travel journals by arranging images and text on a canvas.

## Features

- **Travel Journal Canvas**: A full-screen canvas where users can:
  - Upload and display images
  - Add text blocks with customizable font size and color
  - Freely move (drag-and-drop) any element anywhere on the canvas

- **Save Animation**: Animated saving process using anime.js
  - Progress bar animation
  - "Saving your story..." text with fade effect
  - Success message upon completion

- **Export Options**:
  - Export as PDF: Captures the canvas layout and generates a downloadable PDF
  - Export as Video: Uses Remotion to generate a video with animated elements

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`
4. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

- React (JavaScript)
- Plain CSS for styling
- anime.js for animations
- Remotion for video rendering
- html2canvas and jsPDF for PDF export

## Project Structure

- `/app`: Next.js app directory with main page component
- `/components`: React components (Canvas, Toolbar, etc.)
- `/styles`: CSS files for styling components
- `/public`: Static assets

## Usage

1. Use the toolbar to add images and text to your canvas
2. Drag elements to position them as desired
3. Double-click text elements to edit their content and style
4. Click the "Save Journal" button to save your creation
5. Choose to export as PDF or video

## License

MIT
>>>>>>> 07e7f1f (Add working files including components)
