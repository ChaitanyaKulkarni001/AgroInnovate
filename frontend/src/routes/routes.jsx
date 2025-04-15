// routes.js
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/auth/Login';
import ProductList from '../components/user/ProductList';
import UserDashboard from '../pages/dashboard/UserDashboard';
import SignupStep1 from '../pages/auth/SignupStep1';
import SignupStep2 from '../pages/auth/SignupStep2';
import SignupStep3 from '../pages/auth/SignupStep3';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/signup-step-1', element: <SignupStep1 /> },
  { path: '/signup-step-2', element: <SignupStep2 /> },
  { path: '/signup-step-3', element: <SignupStep3 /> },
  { path: '/login', element: <Login /> },
  { path: '/productlist', element: <ProductList /> },
  { path: '/dashboard', element: <UserDashboard /> },
  { path: '*', element: <div className="p-6 text-center">Page not found</div> }
];

export default routes;
