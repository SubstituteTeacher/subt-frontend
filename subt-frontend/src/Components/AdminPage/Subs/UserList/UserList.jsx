import { Button, Card, Col, Row, Nav, Modal } from "react-bootstrap";
import { db } from "../../../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import ProfileSettings from "../../../Profile/ProfileSettings/ProfileSettings";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const usersCollectionRef = collection(db, "users");
  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow((current) => !current);

  const handleShow = () => setShow((current) => !current);
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
    return () => data();
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      getUsers();
    }
  });

  const renderUsers = (card, index) => {
    return (
      <Row className="mb-4" key={index}>
        <Col className="text-black" xs={12}>
          <Card className="card-display">
            <Card.Body className="d-flex flex-column ">
              <Card.Title className="mb-1 justify-content-between d-flex">
                <span>{card.title}</span>
                <Nav.Link>
                  <ImCross
                    size={20}
                    className="delete-task p-0"
                    onClick={() => {
                      setItemIndex(index);
                      handleModalShow();
                    }}
                  />
                </Nav.Link>
              </Card.Title>
              <Row>
                <Col className="d-none d-xl-block">{`Email`}</Col>
                <Col>{`Lösenord`}</Col>
                <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">{`Roll`}</Col>
              </Row>
              <Row>
                <Col className="d-none d-xl-block">
                  <Card.Text className="text-nowrap">{card.email}</Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-nowrap">{card.password}</Card.Text>
                </Col>
                <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">
                  <Card.Text className="text-nowrap">{card.role}</Card.Text>
                </Col>
              </Row>

              <Button
                className="card-btn mt-3 p-0"
                onClick={() => {
                  setItemIndex(index);
                  setShow(true);
                }}
              >{`Ändra`}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleModalShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`RADERA ANVÄNDARE`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemIndex !== undefined && !!users.length ? (
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>{`Email: `}</strong>
                  {users[itemIndex].email}
                </Card.Text>
                <Card.Text>
                  <strong>{`Lösenord: `}</strong>
                  {users[itemIndex].password}
                </Card.Text>
                <Card.Text>
                  <strong>{`Roll: `}</strong>
                  {users[itemIndex].role}
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <p style={{ fontStyle: "italic", textAlign: "start" }}>
            {`Är du säker på att du vill radera kontot?`}
          </p>
          <Button
            variant="primary"
            style={{ width: "15%" }}
            onClick={() => {
              //  DELETE FUNKTION
              deleteUser(users[itemIndex].id);
              handleModalShow();
            }}
          >
            {`Ja`}
          </Button>
          <Button
            variant="primary"
            style={{ width: "15%" }}
            onClick={() => handleModalShow()}
          >
            {`Nej`}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="mx-auto">
        {!show ? (
          <>
            <Col
              xs={12}
              style={{
                width: "60vw",
                margin: "auto",
              }}
            >
              <h1 className="text-white text-center">{`ANVÄNDARE`}</h1>
            </Col>
            <Col className="todo-profile" sm={12}>
              {users.map(renderUsers)}
            </Col>
          </>
        ) : (
          <Col>
            {show && itemIndex !== undefined ? (
              <div
              className="text-white text-center"
              style={{minHeight: "75vh", maxHeight: "75vh", width: "60vw", margin: "auto"}}
            >
              <div className="m-auto"><ProfileSettings props={users[itemIndex].id}/></div>
              <Button className="mt-5" onClick={() => handleShow()}>{`stäng`}</Button>
            </div>
            ) : (
              <></>
            )}
          </Col>
        )}
      </Row>
    </>
  );
};
export default UserList;
