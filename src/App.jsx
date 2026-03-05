import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer copy';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import KareCourses from './pages/KareCourses';
import KareCourseDetails from './pages/KareCourseDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmailManagement from './pages/EmailManagement';
import Profile from './pages/Profile';
import EnrolledCourses from './pages/EnrolledCourses';
import PaymentHistory from './pages/PaymentHistory';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import ResendVerification from './pages/ResendVerification';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';
import Placement from './pages/Placement';
import Internship from './pages/Internship';
import COE from './pages/COE';
import Training from './pages/Training';
import CodeChef from './pages/CodeChef';
import EduTech from './pages/EduTech';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Refund from './pages/Refund';

import Inquiries from './pages/Inquiries';
import InquiryPage from './pages/InquiryPage';
import Redirect from './components/Redirect';
import ComingSoon from './pages/ComingSoon';
import CourseSlugRedirect from './components/CourseSlugRedirect';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for both user and token
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      // Clear both if either is missing
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Note: token is already saved in the loginUser function in api.js
  };

  const handleLoguot = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app">
        <Toaster position="top-center" />
        <Header />
        <ScrollToTop />

        <main className="main-content">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Placement />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/coe" element={<COE />} />
            <Route path="/codechef" element={<CodeChef />} />
            <Route path="/edutech" element={<EduTech />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/refund" element={<Refund />} />

            {/* Mock Course Routes */}
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CourseDetails user={user} />} />
            <Route path="course/:slug" element={<CourseSlugRedirect user={user} />} />

            {/* Kare Course Routes */}
            <Route path="kare/courses" element={<KareCourses />} />
            <Route path="kare/courses/:id" element={<KareCourseDetails user={user} />} />
            <Route path="kare/course/:slug" element={<CourseSlugRedirect user={user} />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login handleLogin={handleLogin} user={user} />} />
            <Route path="/register" element={<Register handleLogin={handleLogin} user={user} />} />

            {/* Payment Routes */}
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/payment" element={<InquiryPage />} />

            {/* Auth Routes - Coming Soon */}
            <Route path="/forgot-password" element={<ComingSoon />} />
            <Route path="/reset-password/:token" element={<ComingSoon />} />
            <Route path="/verify-email/:token" element={<ComingSoon />} />
            <Route path="/resend-verification" element={<ComingSoon />} />

            {/* Protected Routes - Coming Soon */}
            <Route path="/dashboard" element={user ? <AdminDashboard user={user} /> : <Login handleLogin={handleLogin} user={user} />} />
            <Route path="/email-management" element={user ? <EmailManagement user={user} /> : <Login handleLogin={handleLogin} user={user} />} />
            <Route path="/profile" element={<ComingSoon />} />
            <Route path="/enrolled-courses" element={<ComingSoon />} />
            <Route path="/payment-history" element={<ComingSoon />} />
            <Route path="/inquiries" element={user ? <Inquiries user={user} /> : <Login handleLogin={handleLogin} user={user} />} />

            {/* External Course Redirects */}
            <Route path="/aiml" element={<Redirect link="https://aicl.infoziant.com/courses/680a024024dff2cef862633e" />} />
            <Route path="/webdev" element={<Redirect link="https://aicl.infoziant.com/courses/680a024024dff2cef8626340" />} />
            <Route path="/cybersec" element={<Redirect link="https://aicl.infoziant.com/courses/680a024024dff2cef862633f" />} />

            <Route path="/aimlinternship" element={<Redirect link="https://aicl.infoziant.com/courses/68234801248526e958dd4d8b" />} />
            <Route path="/webdevinternship" element={<Redirect link="https://aicl.infoziant.com/courses/68234801248526e958dd4d8d" />} />
            <Route path="/cybersecinternship" element={<Redirect link="https://aicl.infoziant.com/courses/68234801248526e958dd4d8c" />} />

            <Route path="/techcamp" element={<Redirect link="https://aicl.infoziant.com/courses/683048add177c19178d55b56/" />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
