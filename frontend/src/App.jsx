<<<<<<< HEAD
import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
=======
 // App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing'; // Your landing page component
import Products from './product'; // Your products page component
import Navbar from './components/Layout/navbar'; // The updated navbar component
import { Outlet } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';

// Import the new pages
import About from './components/Layout/Navbar/about';
import BecomeSeller from './components/Layout/Navbar/BecomeSeller';
import Support from './components/Layout/Navbar/Support';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="products" element={<Products />} />
          {/* Add the new routes */}
          <Route path="about" element={<About />} />
          <Route path="become-seller" element={<BecomeSeller />} />
          <Route path="support" element={<Support />} />
          <Route path="/product/:name" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
>>>>>>> 53002ccdf3a83398f8489f1421618a266daa60c2
