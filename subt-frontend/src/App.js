import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import "./App.css";
import Mainpage from "./Components/Mainpage/Mainpage";
import LoginPage from "./Components/LoginPage/LoginPage";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import About from "./Components/About/About"
import Contact from "./Components/Contact/Contact"
import Footer from "./Components/Footer/Footer"
import Signup from "./Components/Signup/Signup";
import Profile from "./Components/Profile/Profile";
import ForgotPassword from "./Components/Password/ForgotPassword";
import ProfileSettings from "./Components/Profile/ProfileSettings/ProfileSettings";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <HeaderNav />
                <Mainpage />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <HeaderNav />
                <Profile />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/settings"
            element={
              <ProtectedRoute>
                <HeaderNav />
                <ProfileSettings />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <HeaderNav />
                <About />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <HeaderNav />
                <Contact />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;