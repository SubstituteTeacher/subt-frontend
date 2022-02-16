import { Button, Card, Col, Row, Nav, Collapse, Form } from "react-bootstrap";
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const TaskManager = () => {
  const [reports, setReports] = useState([]);
  const [filterReports, setFilterReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [singleUser, setSingleUser] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const [isChecked, setIsChecked] = useState({
    isDone: false,
    isSick: false,
    isOvertime: false,
    none: true,
  });
  const handleShow = () => setShow((current) => !current);
  const handleOpen = () => setOpen((current) => !current);

  const getReports = async () => {
    const reportsCollectionRef = collection(db, "reports");
    const data = await getDocs(reportsCollectionRef);
    setReports(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    return () => data();
  };

  const getUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    return () => data();
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
      getReports();
      getUsers();
      getTasks();
    }
  });

  const findTask = (id) => {
    return tasks.filter((object) => object.id === id);
  };

  const findUser = (id) => {
    return users.filter((object) => object.id === id);
  };

  const filterResults = (filter) => {
    switch (filter) {
      case "isSick":
        setFilterReports(
          reports.filter((object) => object.reportSick === true)
        );
        break;
      case "isDone":
        setFilterReports(
          reports.filter((object) => object.reportSick === false)
        );
        break;
      case "isOvertime":
        setFilterReports(reports.filter((object) => object.overtime > 0));
        break;
      default:
        setFilterReports([]);
    }
  };

  const renderReports = (data, index) => {
    let task = findTask(data.taskId);
    let user = findUser(data.userId);
    return (
      <Col key={index} className="d-flex text-white">
        <Col xs={4}>
          <h6>{`${task[0]?.class} - ${task[0]?.schoolName}`}</h6>
        </Col>
        <Col xs={3}>
          <h6>
            {user[0]?.firstname !== undefined
              ? `${user[0]?.firstname} ${user[0]?.surname}`
              : "N/A"}
          </h6>
        </Col>
        <Col xs={2} className="text-center">
          <h6>{data.reportSick ? "Ja" : ""}</h6>
        </Col>
        <Col xs={1} className="text-center">
          <h6> {data.overtime > 0 ? `${data.overtime}min` : ""}</h6>
        </Col>
        <Col className="d-flex justify-content-end">
          <Nav.Link
            style={{ padding: "0", color: "white" }}
            onClick={() => {
              setItemIndex(index);
              setSingleUser(user);
              handleShow();
            }}
          >
            <AiFillEye size={25} />
          </Nav.Link>
          &nbsp;
          <Nav.Link
            style={{ padding: "0", color: "white" }}
            onClick={() => {
              setItemIndex(index);
            }}
          >
            <MdDeleteOutline size={25} />
          </Nav.Link>
        </Col>
      </Col>
    );
  };

  return (
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
            <h1 className="text-white text-center">{`RAPPORTER`}</h1>
          </Col>
          <Row className="mx-auto h-100 align-content-center">
            <Card className="information-card">
              <Card.Body className="text-white">
                <Col>
                  <Nav.Link
                    className="d-flex"
                    style={{ padding: "0", color: "white" }}
                    onClick={() => handleOpen()}
                  >
                    <IoIosArrowDropdownCircle size={25} />
                    <p>{`Sortering`}</p>
                  </Nav.Link>
                </Col>
                <Collapse className="p-0" in={open}>
                  <Row>
                    <Form>
                      <Form.Group>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            checked={isChecked.none}
                            label={`Inget`}
                            onChange={() => {
                              filterResults("");
                              setIsChecked({
                                isSick: false,
                                isDone: false,
                                isOvertime: false,
                                none: true,
                              });
                            }}
                          />

                          <Form.Check
                            type="checkbox"
                            checked={isChecked.isSick}
                            label={`Sjukdom`}
                            onChange={() => {
                              filterResults("isSick");
                              setIsChecked({
                                isSick: true,
                                isDone: false,
                                isOvertime: false,
                                none: false,
                              });
                            }}
                          />

                          <Form.Check
                            type="checkbox"
                            checked={isChecked.isDone}
                            label={`Avsultat`}
                            onChange={() => {
                              filterResults("isDone");
                              setIsChecked({
                                isSick: false,
                                isDone: true,
                                isOvertime: false,
                                none: false,
                              });
                            }}
                          />

                          <Form.Check
                            type="checkbox"
                            checked={isChecked.isOvertime}
                            label={`Övertid`}
                            onChange={() => {
                              filterResults("isOvertime");
                              setIsChecked({
                                isSick: false,
                                isDone: false,
                                isOvertime: true,
                                none: false,
                              });
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Form>
                  </Row>
                </Collapse>
                <Col
                  className="d-flex"
                  style={{ borderBottom: "solid 1px" }}
                  sm={12}
                >
                  <Col xs={4}>{`Kurs & Skola`}</Col>
                  <Col xs={3}>{`Användare`}</Col>
                  <Col xs={2} className="text-center">{`Sjukdom`}</Col>
                  <Col xs={1} className="text-center">{`Övertid`}</Col>
                </Col>
                <Col xs={12} className="mt-2">
                  {!filterReports.length
                    ? reports.map(renderReports)
                    : filterReports.map(renderReports)}
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
                }}
              >
                <h1 className="text-white text-center">{`RAPPORTER`}</h1>
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
                          style={{ borderBottom: "solid 1px" }}
                        >
                          <Col>{`Namn`}</Col>
                          <Col>{`Telefon`}</Col>
                          <Col>{`Email`}</Col>
                          <Col>{`Sjukdom`}</Col>
                          <Col>{`Övertid`}</Col>
                        </Col>
                        {!!singleUser.length ? (
                          <Col className="d-flex">
                            <Col>{`${singleUser[0].firstname} ${singleUser[0].surname}`}</Col>
                            <Col>{singleUser[0].phone}</Col>
                            <Col>{singleUser[0].email}</Col>
                            <Col>
                              {reports[itemIndex].reportSick
                                ? "Sjukanmäld"
                                : "Nej"}
                            </Col>
                            <Col>
                              {reports[itemIndex].overtime > 0
                                ? `${reports[itemIndex].overtime}min`
                                : "0min"}
                            </Col>
                          </Col>
                        ) : (
                          <></>
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
                        setSingleUser("");
                        handleShow();
                      }}
                    >{`stäng`}</Button>
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
  );
};
export default TaskManager;
