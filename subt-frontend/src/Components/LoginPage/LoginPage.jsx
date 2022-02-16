import { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false); //Loading boolean for user experience
  const [show, setShow] = useState(false); //Shows popup if credentials are incorrect.
  const navigate = useNavigate();
  const { logIn, googleSignIn } = useUserAuth();

  const checkCredentials = async (email, password) => {
    try {
      await logIn(email, password);
      navigate("/main");
    } catch (err) {
      setShow(true);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCredentials = () => {
    setTimeout(() => {
      setLoading(false);
      checkCredentials(email, password);
    }, 1000);
  };

  return (
    <div className="main d-flex justify-content-center">
      <Card className="logincard">
        <Card.Header className="text-center">
          <h3 className="text-white">{`Logga in`}</h3>
        </Card.Header>
        <Card.Body>
          <Form>
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
            {!loading ? (
              <div className="">
                <Button
                  style={{ width: "100%" }}
                  className="px-5"
                  variant="primary"
                  onClick={() => {
                    setLoading(true);
                    setShow(false);
                    handleCredentials();
                  }}
                >
                  {`Logga in`}
                </Button>

                <div className="text-white m-1 text-center">
                  {`Har du inget konto? `}
                  <Link to="/signup">{`Skapa konto`}</Link>
                </div>
                <div className="text-white m-1 text-center">
                  <Link to="/forgot-password">Glömt lösenord?</Link>
                </div>

                <div>
                  <GoogleButton
                    style={{ width: "100%" }}
                    className="g-btn"
                    type="dark"
                    onClick={handleGoogleSignIn}
                  />
                </div>
              </div>
            ) : (
              <div className="d-grid">
                <Button variant="primary" className="px-4" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;&nbsp;{`Laddar...`}
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
        {show ? (
          <Card className="error">
            <Card.Header className="text-center">
              <p className="text-warning m-0">
                {`Fel användarnamn eller lösenord`}
              </p>
            </Card.Header>
          </Card>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
