import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Card,
  Nav,
  Collapse,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState("");
  const [isChecked, setIsChecked] = useState({
    male: false,
    female: false,
    undefined: false,
  });
  const tempInfo = {
    id: "1234567890",
    firstname: "Bengan",
    surname: "Bengalsson",
    age: "1982-01-01",
    email: "marcus.94.richardson@gmail.com",
    phone: "072-419 22 22",
    bankAccount: "1234-12341112",
    bank: "Glasbanken",
    adress: "Bengalgatan 64",
    zipCode: "111 11",
    city: "Bengaldesh",
    username: "BengalBengan82",
    password: "asd",
    sex: "Man",
  };
  const headers = {
    id: "",
    firstname: "Namn",
    surname: "Efternamn",
    age: "Föddelseår",
    email: "Email",
    phone: "Telefon",
    bankAccount: "Kontonummer",
    bank: "Bank",
    adress: "Address",
    zipCode: "Postnummer",
    city: "Stad",
    username: "Användarnamn",
    password: "Lösenord",
    sex: "Kön",
  };
  const [user, setUser] = useState({
    id: tempInfo.id,
    firstname: tempInfo.firstname,
    surname: tempInfo.surname,
    age: tempInfo.age,
    email: tempInfo.email,
    phone: tempInfo.phone,
    bankAccount: tempInfo.bankAccount,
    bank: tempInfo.bank,
    adress: tempInfo.adress,
    zipCode: tempInfo.zipCode,
    city: tempInfo.city,
    username: tempInfo.username,
    password: tempInfo.password,
    sex: tempInfo.sex,
  });

  const setData = (index, data) => {
    switch (index) {
      case "Namn":
        setUser({
          ...user,
          firstname: data,
        });
        break;
      case "Efternamn":
        setUser({
          ...user,
          surname: data,
        });
        break;
      case "Föddelseår":
        setUser({
          ...user,
          age: data,
        });
        break;
      case "Email":
        setUser({
          ...user,
          email: data,
        });
        break;
      case "Telefon":
        setUser({
          ...user,
          phone: data,
        });
        break;
      case "Kontonummer":
        setUser({
          ...user,
          bankAccount: data,
        });
        break;
      case "Bank":
        setUser({
          ...user,
          bank: data,
        });
        break;
      case "Address":
        setUser({
          ...user,
          adress: data,
        });
        break;
      case "Postnummer":
        setUser({
          ...user,
          zipCode: data,
        });
        break;
      case "Stad":
        setUser({
          ...user,
          city: data,
        });
        break;
      case "Användarnamn":
        setUser({
          ...user,
          username: data,
        });
        break;
      case "Lösenord":
        setUser({
          ...user,
          password: data,
        });
        break;
      case "Kön":
        setUser({
          ...user,
          sex: data,
        });
        break;
      default:
        return;
    }
  };

  const newData = (header, val) => {
    let data;
    return (
      <div className="d-flex" style={{ borderBottom: "solid 1px" }}>
        <Col className="align-self-end mb-1">
          <Form>
            <Form.Group className="">
              <Form.Control
                placeholder={`${header}: ${val}`}
                onChange={(e) => {
                  data = e.target.value;
                }}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col className="align-self-end text-end mb-1">
          <Button
            variant="primary"
            onClick={() => {
              setData(header, data);
              setOpen("");
            }}
          >{`Spara`}</Button>
          &nbsp;
          <Button
            variant="secondary"
            onClick={() => setOpen("")}
          >{`Stäng`}</Button>
        </Col>
      </div>
    );
  };

  const renderRows = () => {
    return (
      <>
        {Object.entries(headers).map((val, index) => {
          return (
            <Row key={index}>
              {index > 0 ? (
                <>
                  <Col xs={3} className="p-0">
                    <h5>{`${val[1]}`}</h5>
                  </Col>
                  <Col className="p-0">
                    <h5>{`${Object.entries(user)[index][1]}`}</h5>
                  </Col>
                  <Col xs={2} className="text-end p-0">
                    <Nav.Link
                      className="edit-btn"
                      aria-controls={index}
                      aria-expanded={open}
                      onClick={() => {
                        setOpen(index);
                      }}
                    >
                      <h5>{`Redigera`}</h5>
                    </Nav.Link>
                  </Col>
                  <Collapse className="p-0" id={index} in={open === index}>
                    <div>
                      {newData(
                        Object.entries(headers)[index][1],
                        Object.entries(tempInfo)[index][1]
                      )}
                    </div>
                  </Collapse>
                </>
              ) : (
                <></>
              )}
            </Row>
          );
        })}
      </>
    );
  };

  return (
    <div id="profile-background">
      <div className="profile-opacity text-white align-items-center d-flex">
        <Container
          className="text-center h-75"
          fluid
          style={{ textShadow: "2px 2px black" }}
        >
          <Row className="mx-auto h-100">
            <Card className="information-card">
              <Card.Header className="text-center">
                <h2 className="text-white">{`Allmänna kontoinställningar`}</h2>
              </Card.Header>
              <div className="solid">
                <Card.Body className="text-white" style={{ textAlign: "left" }}>
                  {renderRows()}
                </Card.Body>
              </div>
            </Card>
          </Row>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/profile");
            }}
          >{`Tillbaka`}</Button>
        </Container>
      </div>
    </div>
  );
};
export default ProfileSettings;

/* <Form className="">
                  <Row className="d-flex justify-content-between">
                    <Form.Group as={Col} className="mb-3" controlId="firstname">
                      <p className="m-auto">{`Namn`}</p>
                      <Form.Control
                        placeholder={user.firstname}
                        onChange={(e) => {
                          setUser({
                            ...user,
                            firstname: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="surname">
                      <p className="m-auto">{`Efternamn`}</p>
                      <Form.Control
                        onChange={(e) => {
                          setUser({
                            ...user,
                            surname: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="d-flex justify-content-between">
                    <Form.Group as={Col} className="mb-3" controlId="phone">
                      <p className="m-auto">{`Kön`}</p>
                      <Form.Check
                        type="checkbox"
                        checked={isChecked.male}
                        label={<p className="m-0">{`Man`}</p>}
                        onChange={() => {
                          setIsChecked({
                            male: true,
                            female: false,
                            undefined: false,
                          });
                          setUser({
                            ...user,
                            sex: "man",
                          });
                        }}
                      />
                      <Form.Check
                        type="checkbox"
                        checked={isChecked.female}
                        label={<p className="m-0">{`Kvinna`}</p>}
                        onChange={() => {
                          setIsChecked({
                            male: false,
                            female: true,
                            undefined: false,
                          });
                          setUser({
                            ...user,
                            sex: "Kvinna",
                          });
                        }}
                      />
                      <Form.Check
                        type="checkbox"
                        checked={isChecked.undefined}
                        label={<p className="m-0">{`Annat`}</p>}
                        onChange={() => {
                          setIsChecked({
                            male: false,
                            female: false,
                            undefined: true,
                          });
                          setUser({
                            ...user,
                            sex: "Annat",
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="email">
                      <p className="m-auto">{`Email`}</p>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Row>
                </Form> */
