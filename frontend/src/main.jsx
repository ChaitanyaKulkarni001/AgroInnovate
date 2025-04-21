<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import { ThemeProvider } from "./Components/ThemeContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider> */}
      <App />
    {/* </ThemeProvider> */}
  // </StrictMode>,
)
>>>>>>> 53002ccdf3a83398f8489f1421618a266daa60c2
