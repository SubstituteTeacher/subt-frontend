import { BrowserRouter as Router,
  Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/LoginPage/Login";
import MainPage from "./Components/Mainpage/Mainpage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Signup from "./Components/Signup/Signup";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
          <UserAuthContextProvider>
            <Router>
              <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/main" element={<MainPage />} />
              </Routes>
            </Router>
          </UserAuthContextProvider>
  );
}

export default App;