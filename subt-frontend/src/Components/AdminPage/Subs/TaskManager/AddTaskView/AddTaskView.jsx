import { Row, Card, Button, Form, Col } from "react-bootstrap";
import { useState } from "react";
import { db } from "../../../../../firebase-config";
import { collection, addDoc } from "@firebase/firestore";
import "./AddTaskView.css";

const AddTaskView = (props) => {
  const [newTask, setNewTask] = useState({
    class: "",
    date: "",
    location: "",
    schoolName: "",
    text: "",
    timeEnd: "",
    timeStart: "",
    title: "",
  });

  const createTask = async () => {
    try {
      const usersCollectionRef = collection(db, "Tasks");
      await addDoc(usersCollectionRef, {
        class: newTask.class,
        date: newTask.date,
        isAssigned: false,
        isDone: false,
        location: newTask.location,
        schoolName: newTask.schoolName,
        text: newTask.text,
        timeEnd: newTask.timeEnd,
        timeStart: newTask.timeStart,
        title: newTask.title,
        userId: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className="mx-auto h-100 justify-content-center">
      <Card className="add-view-card">
        <Card.Body className="text-white">
          <h1>{`Lägg till jobb`}</h1>
          <Form className="p-4">
            <Row className="d-flex justify-content-between">
              <Form.Group as={Col} className="mb-3">
                <p className="m-auto">{`Jobb titel`}</p>
                <Form.Control
                  required
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <p className="m-auto">{`Kurs`}</p>
                <Form.Control
                  required
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      class: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            <Row className="d-flex justify-content-between">
              <Form.Group as={Col} className="mb-3">
                <p className="m-auto">{`Kommun`}</p>
                <Form.Control
                  required
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      location: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <p className="m-auto">{`Skola`}</p>
                <Form.Control
                  required
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      schoolName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            <Row>
              <Col xs={6} className="d-flex justify-content-between">
                <Col xs={5}>
                  <Form.Group className="mb-3">
                    <p className="m-auto">{`Start tid`}</p>
                    <Form.Control
                      required
                      placeholder="xx.xx"
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          timeStart: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col className="text-center m-auto">
                  <p className="p-0 m-0">{`-`}</p>
                </Col>
                <Col xs={5}>
                  <Form.Group className="mb-3">
                    <p className="m-auto">{`Slut tid`}</p>
                    <Form.Control
                      required
                      placeholder="xx.xx"
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          timeEnd: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Col>
              <Form.Group as={Col} className="mb-3">
                <p className="m-auto">{`Datum`}</p>
                <Form.Control
                  required
                  placeholder="YYYY-MM-DD"
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      date: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            <Row className="d-flex justify-content-between">
              <Form.Group as={Col} className="mb-3">
                <p className="m-auto">{`Beskrivning`}</p>
                <Form.Control
                  as="textarea"
                  required
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      text: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
          </Form>
          <div className="text-end p-4">
            <Button
              variant="primary"
              onClick={() => {
                createTask();
                props.setAddTask(false);
                props.setIsLoading(true);
              }}>
              {`Lägg till`}
            </Button>
            &nbsp;
            <Button variant="secondary" onClick={() => props.setAddTask(false)}>
              {`Stäng`}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
};
export default AddTaskView;
