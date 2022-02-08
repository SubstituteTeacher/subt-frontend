import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Card } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main d-flex justify-content-center">
      <Card className="signupcard">
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
                  placeholder="Lösenord"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className="text-white">{`Användarnamn`}</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Användarnamn"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBank">
                <Form.Label className="text-white">{`Bank`}</Form.Label>
                <Form.Control
                  type="bank"
                  placeholder="Bank"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBankNr">
                <Form.Label className="text-white">{`Banknummer`}</Form.Label>
                <Form.Control
                  type="banknr"
                  placeholder="Banknummer"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSocialNr">
                <Form.Label className="text-white">{`Födelsedatum`}</Form.Label>
                <Form.Control
                  id="date"
                  label=""
                  type="date"
                  defaultValue=""
                  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneNr">
                <Form.Label className="text-white">{`Telefonnummer`}</Form.Label>
                <Form.Control
                  type="phonenr"
                  placeholder="Telefonnummer"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>


              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  {`Skapa konto!`}
                </Button>
              </div>
            </Form>
            <div className="p-4 box mt-3 text-center text-white">
              {`Har du redan ett konto?`} <Link to="/">{`Logga in`}</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
