import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

// import { ThemeProvider } from "./Components/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ThemeProvider> */}
      <BrowserRouter> {/* Wrap BrowserRouter around AuthProvider */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    {/* </ThemeProvider> */}
  </StrictMode>
);
