import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Card } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
      createUser(email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  //create user and save to firestore
  const createUser = async () => {
    await addDoc(usersCollectionRef, { email: email, password: password });
  };

  return (
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
                <Button variant="primary" type="Submit">
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
  );
};

export default Signup;
