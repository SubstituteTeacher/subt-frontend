import { useState, useEffect } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import { setToken } from "../../Services/Storage/StorageHelper";
import "./LoginPage.css";

const LoginPage = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isCredentials, setIsCredentials] = useState(false);
  const [login, setLogin] = useState(false); //Sets to true if user press login.
  const [loading, setLoading] = useState(false); //Loading boolean for user experience
  const [show, setShow] = useState(false); //Shows popup if credentials are incorrect.
  const navigate = useNavigate();
  const tempData = [
    {
      id: "9876543210",
      email: "asd@hotmail.com",
      password: "asd",
      firstname: "Berit",
      lastname: "Bengal",
      role: "Administrator",
      token: "",
    },
    {
      id: "1234567890",
      email: "hej123@hotmail.com",
      password: "hej123",
      firstname: "Kenny",
      lastname: "Kofot",
      role: "User",
      token: "",
    },
  ];

  const checkCredentials = (email, password) => {
    let count = 0;
    tempData.map((item) => {
      if (item.email === email && item.password === password) {
        return (count = count + 1);
      } else {
        return (count = count + 0);
      }
    });
    console.log(count);
    if (count > 0) setIsCredentials(true);
  };

  const handleCredentials = () => {
    setTimeout(() => {
      setLoading(false);
      checkCredentials(email, password);
      setLogin(true);
    }, 1000);
  };

  const validationCheck = () => {
    /* IFALL CREDENTIALS ÄR TRUE, SKICKA VIDARE TILL INLOGG */
    console.log("FUNKAR JIRA NU");
    if (login) {
      if (isCredentials === true) {
        //setToken();
        props.setIsLoggedIn(true);
        navigate(`/main`);
        setShow(false);
      } else {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    validationCheck();
  });

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
                placeholder="email"
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
              <Button
                className="px-5"
                variant="primary"
                onClick={() => {
                  setLoading(true);
                  setLogin(false);
                  setShow(false);
                  handleCredentials();
                }}>
                {`Logga in`}
              </Button>
            ) : (
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
