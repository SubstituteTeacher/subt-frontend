import { Button, Card, Col, Row, Nav, Modal, Form } from "react-bootstrap";
import { db } from "../../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline, MdAddBox } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import "./TaskManager.css";
import AddTaskView from "./AddTaskView/AddTaskView";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [Task, setTask] = useState([]);
  const handleModalShow = () => setModalShow((current) => !current);
  const handleEditModalShow = () => setEditModalShow((current) => !current);
  const handleShow = () => setShow((current) => !current);
  const [updateTaskInfo, setUpdateTaskInfo] = useState(false);

  const [currentTask, setCurrentTask] = useState({
    title: "",
    class: "",
    date: "",
    location: "",
    schoolName: "",
    text: "",
    timeEnd: "",
    timeStart: "",
  });
  console.log("currenttask", currentTask);

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "Tasks", id));
    setIsLoading(true);
  };

  const getTasks = async () => {
    const tasksCollectionRef = collection(db, "Tasks");
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

  const updateTask = async (id) => {
    console.log(id);
    await updateDoc(doc(db, "Tasks", id), {
      class: currentTask.class,
      date: currentTask.date,
      //isAssigned: false,
      //isDone: false,
      location: currentTask.location,
      schoolName: currentTask.schoolName,
      text: currentTask.text,
      timeEnd: currentTask.timeEnd,
      timeStart: currentTask.timeStart,
      title: currentTask.title,
    });
    setUpdateTaskInfo(false);
    setIsLoading(true);
  };

  useEffect(() => {
    if (updateTaskInfo) {
      updateTask(tasks[itemIndex].id);
    }
  });

  const getTask = async (id) => {
    const getPostsFromFirebase = [];
    const querySnapshot = await getDocs(
      query(collection(db, "Tasks"), where("id", "==", id))
    );
    querySnapshot.forEach((doc) => {
      getPostsFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
      setTask(getPostsFromFirebase);
    });
  };

  const renderTasks = (data, index) => {
    //console.log("currentTask:", currentTask);
    return (
      <Col key={index} className="d-flex text-white">
        <Col xs={2}>
          <h6>{data.schoolName}</h6>
        </Col>
        <Col xs={2}>
          <h6>{data.location}</h6>
        </Col>
        <Col xs={3}>
          <h6>{data.class}</h6>
        </Col>
        <Col xs={2}>
          <h6>{data.date}</h6>
        </Col>
        <Col xs={2}>
          <h6>{`${data.timeStart}-${data.timeEnd}`}</h6>
        </Col>
        <Col className="d-flex text-white">
          <Nav.Link
            style={{ padding: "0", color: "white" }}
            onClick={() => {
              setItemIndex(index);
              getTask(data.TaskId);
              handleShow();
            }}>
            <AiFillEye size={25} />
          </Nav.Link>
          &nbsp;
          <Nav.Link
            style={{ padding: "0", color: "white" }}
            onClick={() => {
              setItemIndex(index);
              setCurrentTask({
                title: tasks[index]?.title,
                class: tasks[index]?.class,
                date: tasks[index]?.date,
                location: tasks[index]?.location,
                schoolName: tasks[index]?.schoolName,
                text: tasks[index]?.text,
                timeEnd: tasks[index]?.timeEnd,
                timeStart: tasks[index]?.timeStart,
              });
              handleEditModalShow();
            }}>
            <MdModeEditOutline size={25} />
          </Nav.Link>
          &nbsp;
          <Nav.Link
            style={{ padding: "0", color: "white" }}
            onClick={() => {
              setItemIndex(index);
              handleModalShow();
            }}>
            <MdDeleteOutline size={25} />
          </Nav.Link>
        </Col>
      </Col>
    );
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleModalShow}
        backdrop="static"
        keyboard={false}>
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
              deleteTask(tasks[itemIndex].id);
              handleModalShow();
            }}>
            {`Ja`}
          </Button>
          <Button
            variant="primary"
            style={{ width: "15%" }}
            onClick={() => handleModalShow()}>
            {`Nej`}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={editModalShow}
        onHide={handleEditModalShow}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{`REDIGERA JOBB`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemIndex !== undefined && !!tasks.length ? (
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>{`Titel: `}</strong>
                  {tasks[itemIndex].title}
                </Card.Text>
                <Form.Control
                  onInput={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      title: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Card.Text>
                  <strong>{`Skola: `}</strong>
                  {tasks[itemIndex].schoolName}
                </Card.Text>
                <Form.Control
                  onInput={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      schoolName: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Card.Text>
                  <strong>{`Stad: `}</strong>
                  {tasks[itemIndex].location}
                </Card.Text>
                <Form.Control
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      location: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Card.Text>
                  <strong>{`Kurs: `}</strong>
                  {tasks[itemIndex].class}
                </Card.Text>
                <Form.Control
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      class: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Card.Text>
                  <strong>{`Datum: `}</strong>
                  {tasks[itemIndex].date}
                </Card.Text>
                <Form.Control
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      date: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Card.Text>
                  <strong>{`Tid: `}</strong>
                  {`${tasks[itemIndex].timeStart}-${tasks[itemIndex].timeEnd}`}
                </Card.Text>
                <Form.Control
                  required
                  placeholder="Från klockan: xx.xx"
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      timeStart: e.target.value,
                    })
                  }
                />{" "}
                <br />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Form.Control
                  required
                  placeholder="Till klockan: xx.xx"
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      timeEnd: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
                <Card.Text>
                  <strong>{`Beskrivning: `}</strong>
                  {tasks[itemIndex].text}
                </Card.Text>
                <Form.Control
                  required
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      text: e.target.value,
                    })
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    //updateTask(tasks[itemIndex].id);
                  }}>{`Spara`}</Button>
              </Card.Body>
            </Card>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="primary"
            style={{ width: "15%" }}
            onClick={() => {
              setUpdateTaskInfo(true);
              updateTask(tasks[itemIndex].id);
              handleEditModalShow();
            }}>
            {`Ändra`}
          </Button>
        </Modal.Footer>
      </Modal>
      {addTask && (
        <AddTaskView setAddTask={setAddTask} setIsLoading={setIsLoading} />
      )}
      <Row className="mx-auto">
        {!show ? (
          <>
            <Col
              xs={12}
              style={{
                width: "60vw",
                margin: "auto",
              }}>
              <h1 className="text-white text-center">{`JOBB`}</h1>
            </Col>
            <Row className="mx-auto h-100 align-content-center">
              <Card className="information-card">
                <Card.Body className="text-white">
                  <Col className="text-end">
                    <Nav.Link
                      style={{ padding: "0", color: "white" }}
                      onClick={() => {
                        setAddTask(true);
                      }}>
                      <MdAddBox size={25} />
                    </Nav.Link>
                  </Col>
                  <Col
                    className="d-flex"
                    style={{ borderBottom: "solid 1px" }}
                    sm={12}>
                    <Col xs={2}>{`Skola`}</Col>
                    <Col xs={2}>{`Kommun`}</Col>
                    <Col xs={3}>{`Kurs`}</Col>
                    <Col xs={2}>{`Datum`}</Col>
                    <Col xs={2}>{`Tid`}</Col>
                  </Col>
                  <Col xs={12} className="mt-2">
                    {tasks.map(renderTasks)}
                  </Col>
                </Card.Body>
              </Card>
            </Row>
          </>
        ) : (
          <Col>
            {show && itemIndex !== undefined ? (
              <>
                <Col
                  xs={12}
                  style={{
                    width: "60vw",
                    margin: "auto",
                  }}>
                  <h1 className="text-white text-center">{`JOBB`}</h1>
                </Col>
                <Row className="mx-auto h-100">
                  <Card className="information-card">
                    <Card.Body className="text-white">
                      <Col>
                        <Col xs={6}>
                          <h1>{tasks[itemIndex].title}</h1>
                          <h3>{`Skola: ${tasks[itemIndex].schoolName} - ${tasks[itemIndex].location}`}</h3>
                          <h4>{`Kurs: ${tasks[itemIndex].class}`}</h4>
                          <h4>{`Datum: ${tasks[itemIndex].date}`}</h4>
                          <h4>{`Tid: ${tasks[itemIndex].timeStart} - ${tasks[itemIndex].timeEnd}`}</h4>
                          <p>{`${tasks[itemIndex].text}`}</p>
                        </Col>
                        <br />
                        <Col>
                          <Col
                            className="d-flex"
                            style={{ borderBottom: "solid 1px" }}>
                            <Col>{`Namn`}</Col>
                            <Col>{`Telefon`}</Col>
                            <Col>{`Email`}</Col>
                            <Col>{`Status`}</Col>
                          </Col>
                          {!!Task.length ? (
                            <Col className="d-flex">
                              <Col>{`${Task[0].firstname} ${Task[0].surname}`}</Col>
                              <Col>{Task[0].phone}</Col>
                              <Col>{Task[0].email}</Col>
                              <Col>{Task[0].isDone ? "Klar" : "Ej klar"}</Col>
                            </Col>
                          ) : (
                            <Col className="d-flex">
                              <Col></Col>
                              <Col></Col>
                              <Col></Col>
                              <Col>{`Ej tilldelad`}</Col>
                            </Col>
                          )}
                        </Col>
                        <br />
                      </Col>
                    </Card.Body>
                    <div className="text-end">
                      <Button
                        className="m-1"
                        variant="secondary"
                        onClick={() => {
                          setTask("");
                          handleShow();
                        }}>{`stäng`}</Button>
                    </div>
                  </Card>
                </Row>
              </>
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
