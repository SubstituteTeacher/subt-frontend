import Landing from "./Components/Pages/Landing/Landing";
import { useState, useEffect } from "react";
import LoginPage from "./Components/LoginPage/LoginPage";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import { getToken, removeToken } from "./Services/Storage/StorageHelper";
//import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false)

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
