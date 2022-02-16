import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Card, Modal } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase-config";
import { collection, setDoc, doc } from "firebase/firestore";
import { useEffect } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, logOut } = useUserAuth();
  const [user, setUser] = useState();
  const [modalShow, setModalShow] = useState(false);
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setUser(await signUp(email, password));
    } catch (err) {
      setError(err.message);
    }
  };
  //create user and save to firestore
  const createUser = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      await setDoc(doc(usersCollectionRef, user.user.uid), {
        id: user.user.uid,
        email: email,
        password: password,
        role: "user",
      });
      setModalShow(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      createUser();
    }
  });

  return (
    <>
      <Modal
        show={modalShow}
        onHide={setModalShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{`SKAPA KONTO LYCKADES!`}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="text-center d-block">
          <Button
            variant="primary"
            style={{ width: "15%" }}
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
          >
            {`Okej`}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="main d-flex justify-content-center">
        <Card className="logincard">
          <Card.Header className="text-center">
            <h3 className="text-white">{`Skapa konto`}</h3>
          </Card.Header>
          <Card.Body className="">
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="m-auto">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white">{`Email`}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white">{`Lösenord`}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="Submit" /* onClick={() => setModalShow(true)} */>
                    {`Skapa konto!`}
                  </Button>
                </div>
              </Form>
              <div className="p-4 box mt-3 text-center text-white">
                {`Already have an account?`} <Link to="/">{`Log In`}</Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Signup;
