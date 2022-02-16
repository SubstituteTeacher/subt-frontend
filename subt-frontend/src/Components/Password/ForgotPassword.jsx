import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef(null);
  const { resetPassword } = useUserAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="main d-flex justify-content-center">
      <Card className="logincard">
        <Card.Header className="text-center">
          <h3 className="text-white">{`Återställ Lösenord`}</h3>
        </Card.Header>
        <Card.Body className="">
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <div className="m-auto text-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>{`Email`}</Form.Label>
                <Form.Control
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
            </Form>
            <Button disabled={loading} className="w-100" type="submit">
              {`Reset Password`}
            </Button>
            <div className="p-4 box mt-3 text-center text-white">
              {`Return to login`} <Link to="/">{`Log In`}</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;

//  <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Password Reset</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           {message && <Alert variant="success">{message}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Reset Password
//             </Button>
//           </Form>
//           <div className="w-100 text-center mt-3">
//             <Link to="/">Login</Link>
//           </div>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Need an account? <Link to="/signup">Sign Up</Link>
//       </div>
