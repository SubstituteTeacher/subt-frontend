import { Button, Card, Col, Row, Nav, Modal } from "react-bootstrap";
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import "./TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow((current) => !current);
  const handleShow = () => setShow((current) => !current);

  const tasksCollectionRef = collection(db, "Tasks");
  const getTasks = async () => {
    const data = await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
    return () => data();
  };

  useEffect(() => {
    if (isLoading) {
      getTasks();
    }
  });

  const renderJobs = (card, index) => {
    return (
      <Row className="mb-4" key={index}>
        <Col xs={12}>
          <Card className="card-display">
            <Card.Body className="d-flex flex-column ">
              <Card.Title className="mb-3 justify-content-between d-flex">
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
                <Col className="d-none d-xl-block">{`Plats`}</Col>
                <Col>{`Skola`}</Col>
                <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">{`Kurs`}</Col>
                <Col>{`Datum`}</Col>
              </Row>
              <Row>
                <Col className="d-none d-xl-block">
                  <Card.Text className="text-nowrap">{card.location}</Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-nowrap">
                    {card.schoolName}
                  </Card.Text>
                </Col>
                <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">
                  <Card.Text className="text-nowrap">{card.class}</Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-nowrap">{card.date}</Card.Text>
                </Col>
              </Row>
              <Button
                className="card-btn mt-3 p-0"
                onClick={() => {
                  setItemIndex(index);
                  setShow(true);
                }}
              >{`Information`}</Button>
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
          <Modal.Title>{`RADERA JOBB`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemIndex !== undefined && !!tasks.length ? (
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>{`Skola: `}</strong>
                  {tasks[itemIndex].schoolName}
                </Card.Text>
                <Card.Text>
                  <strong>{`Stad: `}</strong>
                  {tasks[itemIndex].location}
                </Card.Text>
                <Card.Text>
                  <strong>{`Kurs: `}</strong>
                  {tasks[itemIndex].class}
                </Card.Text>
                <Card.Text>
                  <strong>{`Datum: `}</strong>
                  {tasks[itemIndex].date}
                </Card.Text>
                <Card.Text>
                  <strong>{`Tid: `}</strong>
                  {`${tasks[itemIndex].timeStart}-${tasks[itemIndex].timeEnd}`}
                </Card.Text>
                <Card.Text>
                  <strong>{`Beskrivning: `}</strong>
                  {tasks[itemIndex].text}
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <p style={{ fontStyle: "italic", textAlign: "start" }}>
            {`Är du säker på att du radera detta jobb?`}
          </p>
          <Button
            variant="primary"
            style={{ width: "15%" }}
            onClick={() => {
              //  DELETE FUNKTION
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
              <h1 className="text-white text-center">{`JOBB`}</h1>
            </Col>
            <Col className="todo-profile text-black" sm={12}>
              {tasks.map(renderJobs)}
            </Col>
          </>
        ) : (
          <Col>
            {show && itemIndex !== undefined ? (
              <div
                className="text-white todo-profile d-flex"
                style={{ textShadow: "1px 1px black" }}
              >
                <div className="m-auto">{`Här kan det finnas data ${tasks[itemIndex].title}`}</div>
                <Button onClick={() => handleShow()}>{`stäng`}</Button>
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
export default TaskManager;
