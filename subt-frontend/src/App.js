import Landing from "./Components/Pages/Landing/Landing";
import { useState } from "react";
import LoginPage from "./Components/LoginPage/LoginPage";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import { getToken, removeToken } from "./Services/Storage/StorageHelper";
//import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Components/Footer/Footer";
import Profile from "./Components/Profile/Profile";
import ProfileSettings from "./Components/Profile/ProfileSettings/ProfileSettings";

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(true)

  // const CheckValidation = () => {
  //   const token = getToken() // Get your token from the request
  //   /* Checks if the token is valid, stores the return value in checkToken. */
  //   const checkToken = jwt.verify(token, 'nyckeln', function (err) {
  //     if (err) {
  //       removeToken()
  //       return false
  //     }
  //     return true
  //   })
  //   setIsLoggedIn(checkToken)
  // }

  // /* checks if the token is valid every 60 second. */
  // const tick = () => {
  //   setInterval(function () {
  //     CheckValidation()
  //   }, 60000)
  // }

  // useEffect(() => {
  //   CheckValidation()
  //   tick()
  // })

  return (
    <Router>
      {isloggedIn ? (
        <>
          <HeaderNav />
          <Routes>
            <Route
              path={'/'}
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path={'/main'}
              element={<Landing />}
            />
            <Route
              path={'/profile'}
              element={<Profile />}
            />
            <Route
              path={'/profile/settings'}
              element={<ProfileSettings />}
            />
            <Route
              path={'/about'}
              element={<About />}
            />
            <Route
              path={'/contact'}
              element={<Contact />}
            />
          </Routes>
          <Footer />
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
