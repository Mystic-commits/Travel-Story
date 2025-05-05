export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TravelStory - Create Your Travel Journal</title>
        <meta name="description" content="Create beautiful travel journals with TravelStory" />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
