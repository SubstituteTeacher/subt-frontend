import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="main d-flex justify-content-center">
      <Card className="logincard">
        <Card.Header className="text-center">
          <h3 className="text-white">Logga in</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Kundnr</Form.Label>
              <Form.Control type="email" placeholder="Kundnr" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white">Lösenord</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              className="px-5"
              variant="primary"
              type="submit"
              onClick={() => console.log("asd")}
            >
              Logga in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
