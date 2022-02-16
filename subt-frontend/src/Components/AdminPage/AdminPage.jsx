import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import UserList from "./Subs/UserList/UserList";
import TaskManager from "./Subs/TaskManager/TaskManager";

import Reports from "./Subs/Reports/Reports";
import "./AdminPage.css";

function AdminPage() {
  const [select, setSelect] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((current) => !current);

  const selectComponent = (comp) => {
    switch (comp) {
      case "user":
        return <UserList />;
      case "task":
        return <TaskManager />;
      case "report":
        return <Reports />;
      case "??":
        return (
          <>
            <Col
              xs={12}
              style={{
                width: "60vw",
                margin: "auto",
              }}
            >
              <h1 className="text-white text-center">{`?????`}</h1>
            </Col>
            <Row className="mx-auto h-100">
              <Card className="information-card d-grid">
                <Card.Body className="text-white text-center align-self-center">
                  <h1>{`???????????????????????????????????????`}</h1>
                  <h1>{`???????????????????????????????????????`}</h1>
                  <h1>{`???????????????????????????????????????`}</h1>
                  <h1>{`???????????????????????????????????????`}</h1>
                  <h1>{`???????????????????????????????????????`}</h1>
                  <h1>{`???????????????????????????????????????`}</h1>
                  <h1>{`???????????????????????????????????????`}</h1>
                </Card.Body>
              </Card>
            </Row>
          </>
        );
      default:
        return (
          <>
            <Col
              xs={12}
              style={{
                width: "60vw",
                margin: "auto",
              }}
            >
              <h1 className="text-white text-center">{`ADMINPAGE`}</h1>
            </Col>
            <Row className="mx-auto h-100">
              <Card className="information-card d-grid">
                <Card.Body className="text-white text-center align-self-center">
                  <h1>{`Du ser fin ut idag! =)`}</h1>
                </Card.Body>
              </Card>
            </Row>
          </>
        );
    }
  };
  return (
    <div id="adminpage-background">
      <div className="adminpage-opacity text-white align-items-center d-flex">
        <Container className="mt-5" fluid>
          <Card className="admin-main-card">
            <div>
              <Card.Body className="text-white" style={{ textAlign: "left" }}>
                {show ? (
                  <></>
                ) : (
                  <Button variant="primary" onClick={() => handleShow()}>
                    <BsFillGrid3X3GapFill size={25} />
                  </Button>
                )}

                <Offcanvas
                  show={show}
                  onHide={() => setShow(false)}
                  keyboard={true}
                  scroll={true}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-white">
                      {`Admin properties`}
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Col xs={10} className=" m-auto">
                      <Col>
                        <Nav.Link
                          className="edit-btn"
                          onClick={() => {
                            handleShow();
                            setSelect("");
                          }}
                        >
                          <h4>{`Start`}</h4>
                        </Nav.Link>
                      </Col>
                      <Col>
                        <Nav.Link
                          className="edit-btn"
                          onClick={() => {
                            handleShow();
                            setSelect("user");
                          }}
                        >
                          <h4>{`Användare`}</h4>
                        </Nav.Link>
                      </Col>
                      <Col>
                        <Nav.Link
                          className="edit-btn"
                          onClick={() => {
                            handleShow();
                            setSelect("task");
                          }}
                        >
                          <h4>{`Arbetskort`}</h4>
                        </Nav.Link>
                      </Col>
                      <Col>
                        <Nav.Link
                          className="edit-btn"
                          onClick={() => {
                            handleShow();
                            setSelect("report");
                          }}
                        >
                          <h4>{`Rapporter`}</h4>
                        </Nav.Link>
                      </Col>
                      <Col>
                        <Nav.Link
                          className="edit-btn"
                          onClick={() => {
                            handleShow();
                            setSelect("??");
                          }}
                        >
                          <h4>{`????`}</h4>
                        </Nav.Link>
                      </Col>
                    </Col>
                  </Offcanvas.Body>
                </Offcanvas>
                {selectComponent(select)}
              </Card.Body>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default AdminPage;
