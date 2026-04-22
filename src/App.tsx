import { Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pawan Sain Salon Freelancer — Men's Home Salon Jaipur</title>
        <meta name="description" content="Premium men's grooming at your doorstep in Jaipur. Haircut, beard, facial & more. Call +91 96607 53211 to book." />
        <meta property="og:title" content="Pawan Sain Salon Freelancer — Jaipur" />
        <meta property="og:description" content="Premium men's home salon service in Jaipur." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
