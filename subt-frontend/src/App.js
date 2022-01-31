import Landing from "./Components/Pages/Landing/Landing";
import { useState } from "react";
import LoginPage from "./Components/LoginPage/LoginPage";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false)
  return (
    <Router>
      {isloggedIn ? (
        <>
          <HeaderNav />
          <Routes>
            <Route
              path={'/main'}
              element={<Landing />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route
            path={'/'}
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
