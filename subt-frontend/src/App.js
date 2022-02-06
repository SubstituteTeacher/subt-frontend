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
{/* 

import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}
*/}