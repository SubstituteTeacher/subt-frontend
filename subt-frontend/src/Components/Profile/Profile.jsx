import {
  Container,
  Col,
  Row,
  Button,
  Card,
  Spinner,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import "./Profile.css";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [overtime, setOvertime] = useState(false);
  const [isWorkComplete, setIsWorkComplete] = useState(false);
  const [extraHours, setExtraHours] = useState(0);
  const [itemIndex, setItemIndex] = useState();
  const [todoCardInfo, setTodoCardInfo] = useState([]);
  const { user } = useUserAuth();
  const [jobTimer, setJobtimer] = useState(3);
  const date = new Date();
  const [showSettings, setShowSettings] = useState(false);

  const handleModalShow = () => setModalShow((current) => !current);
  const handleShow = () => setShow((current) => !current);
  const handleCheck = () => setIsChecked((current) => !current);

  const getTaskItems = async () => {
    const getPostsFromFirebase = [];
    const querySnapshot = await getDocs(
      query(collection(db, "Tasks"), where("userId", "==", user.uid))
    );
    querySnapshot.forEach((doc) => {
      getPostsFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    let count = 0;
    getPostsFromFirebase.map((val) => {
      if (val.isDone) count = count + 1;
      return count;
    });
    if (count === getPostsFromFirebase.length) {
      setIsWorkComplete(true);
    }
    setTodoCardInfo(getPostsFromFirebase);
    setLoading(false);

    return () => querySnapshot();
  };
  useEffect(() => {
    if (loading === true && user.uid) {
      getTaskItems();
    }
  });

  const updateTask = async () => {
    const docRef = doc(db, "Tasks", todoCardInfo[itemIndex].id);
    await updateDoc(docRef, {
      isDone: true,
    });
  };

  const createReport = async () => {
    try {
      const usersCollectionRef = collection(db, "reports");
      await addDoc(usersCollectionRef, {
        taskId: todoCardInfo[itemIndex].id,
        userId: user.uid,
        overtime: extraHours,
        reportSick: isChecked,
      });
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const renderJobs = (card, index) => {
    return (
      <Row className="mt-4" key={index}>
        {!card.isDone ? (
          <Col xs={12}>
            <Card className="card-display">
              <Card.Body className="d-flex flex-column ">
                <Card.Title className="mb-3">{card.title}</Card.Title>
                <Row>
                  <Col className="d-none d-xl-block">{`Plats`}</Col>
                  <Col>{`Skola`}</Col>
                  <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">{`Kurs`}</Col>
                  <Col>{`Datum`}</Col>
                </Row>
                <Row>
                  <Col className="d-none d-xl-block">
                    <Card.Text className="text-nowrap">
                      {card.location}
                    </Card.Text>
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
        ) : (
          <></>
        )}
      </Row>
    );
  };

  useEffect(() => {
    if (jobTimer > 0)
      setTimeout(() => {
        setJobtimer(jobTimer - 1);
      }, 1000);
  }, [jobTimer]);

  const showNoJobs = () => {
    return (
      <>
        {jobTimer > 0 ? (
          <Container
            className="align-self-center m-5 text-center text-white"
            fluid
          >
            <Row className="mx-auto mt-5">
              <Col
                xs={12}
                style={{
                  textAlign: "end",
                  width: "60vw",
                  margin: "auto",
                }}
              >
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowSettings(true);
                    }}
                  >{`Inställningar`}</Button>
                  &nbsp;
                  <Button>{`Statistik`}</Button>
                </Col>
              </Col>
              <div className="todo-profile d-flex">
                <div className="m-auto">
                  <h1>
                    {" "}
                    <Spinner
                      as="span"
                      animation="border"
                      size="xl"
                      role="status"
                      aria-hidden="true"
                    />
                    {`Laddar dina jobb...`}
                  </h1>
                </div>
              </div>
            </Row>
          </Container>
        ) : (
          <Container
            className="align-self-center m-5 text-center text-white"
            fluid
          >
            <Row className="mx-auto mt-5">
              <Col
                xs={12}
                style={{
                  textAlign: "end",
                  width: "60vw",
                  margin: "auto",
                }}
              >
                <Col>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowSettings(true);
                    }}
                  >{`Inställningar`}</Button>
                  &nbsp;
                  <Button>{`Statistik`}</Button>
                </Col>
              </Col>
              <div className="todo-profile d-flex">
                <div className="m-auto">
                  <h1>{`Du har inget jobb!`}</h1>
                </div>
              </div>
            </Row>
          </Container>
        )}
      </>
    );
  };
  console.log(user.uid);
  return (
    <div id="profile-background">
      <div className="profile-opacity  align-items-center d-flex">
        <Modal
          show={modalShow}
          onHide={handleModalShow}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Rapportera`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <p className="m-auto">{`Tidsrapportering*`}</p>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    if (e.target.value === "overtime") setOvertime(true);
                    else setOvertime(false);
                  }}
                >
                  {itemIndex !== undefined ? (
                    <>
                      <option>{`${todoCardInfo[itemIndex].timeStart} - ${todoCardInfo[itemIndex].timeEnd}`}</option>
                      <option value="overtime">{`Övertid`}</option>
                    </>
                  ) : (
                    <></>
                  )}
                </Form.Select>
                {overtime ? (
                  <div className="mt-2">
                    <p className="m-auto">{`Övertidstimmar*`}</p>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setExtraHours(e.target.value);
                      }}
                    >
                      <option value="15">{`15min`}</option>
                      <option value="30">{`30min`}</option>
                      <option value="45">{`45min`}</option>
                      <option value="60">{`60min`}</option>
                      <option value="90">{`90min`}</option>
                      <option value="120">{`120min`}</option>
                    </Form.Select>
                  </div>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="justify-content-between">
            <Form.Group>
              <Form.Check
                type="checkbox"
                checked={isChecked}
                label={`Jag är sjuk och kan inte komma`}
                onChange={() => {
                  handleCheck();
                }}
              />
            </Form.Group>
            {itemIndex !== undefined ? (
              <OverlayTrigger
                overlay={
                  !(
                    isChecked ||
                    (date.toLocaleTimeString() >
                      todoCardInfo[itemIndex].timeEnd &&
                      date.toLocaleDateString() >= todoCardInfo[itemIndex].date)
                  ) ? (
                    <Tooltip id="tooltip-disabled">
                      {`Du kan endast rapportera om du är sjuk, eller lektionen avslutats`}
                    </Tooltip>
                  ) : (
                    <></>
                  )
                }
              >
                <span className="d-inline-block">
                  <Button
                    variant="primary"
                    onClick={() => {
                      updateTask();
                      createReport();
                      handleModalShow();
                      handleShow();
                    }}
                    disabled={
                      !(
                        isChecked ||
                        (date.toLocaleTimeString() >
                          todoCardInfo[itemIndex].timeEnd &&
                          date.toLocaleDateString() >=
                            todoCardInfo[itemIndex].date)
                      )
                    }
                  >
                    {`Skicka rapport`}
                  </Button>
                </span>
              </OverlayTrigger>
            ) : (
              <></>
            )}
          </Modal.Footer>
        </Modal>
        {showSettings ? (
          <>
            <div
              className="text-white text-center"
              style={{
                minHeight: "75vh",
                maxHeight: "75vh",
                width: "60vw",
                margin: "auto",
              }}
            >
              <div className="m-auto">
                <ProfileSettings props={user.uid} />
              </div>
              <Button
                className="mt-5"
                onClick={() => setShowSettings(false)}
              >{`stäng`}</Button>
            </div>
          </>
        ) : (
          <>
            {!!todoCardInfo.length && !isWorkComplete ? (
              <Container className="align-self-center m-5" fluid>
                <Row className="mx-auto mt-5">
                  <>
                    {!show ? (
                      <>
                        <Col
                          xs={12}
                          style={{
                            textAlign: "end",
                            width: "60vw",
                            margin: "auto",
                          }}
                        >
                          <h1 className="text-white text-center">{`TODO'S`}</h1>
                          <Col>
                            <span style={{ textAlign: "end" }}>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  setShowSettings(true);
                                }}
                              >{`Inställningar`}</Button>
                              &nbsp;
                              <Button>{`Statistik`}</Button>
                            </span>
                          </Col>
                        </Col>
                        <Col xs={12} className="todo-profile">
                          <div>{todoCardInfo.map(renderJobs)}</div>
                        </Col>
                      </>
                    ) : (
                      <Col>
                        {show && itemIndex !== undefined ? (
                          <div
                            className="text-white todo-profile d-flex"
                            style={{ textShadow: "1px 1px black" }}
                          >
                            <div className="m-auto">
                              <h1>{todoCardInfo[itemIndex].title}</h1>
                              <h3>{`Skola: ${todoCardInfo[itemIndex].schoolName} - ${todoCardInfo[itemIndex].location}`}</h3>
                              <h4>{`Kurs: ${todoCardInfo[itemIndex].class}`}</h4>
                              <h4>{`Datum: ${todoCardInfo[itemIndex].date}`}</h4>
                              <h4>{`Tid: ${todoCardInfo[itemIndex].timeStart} - ${todoCardInfo[itemIndex].timeEnd}`}</h4>
                              <p>{`${todoCardInfo[itemIndex].text}`}</p>
                              <br />
                              <div>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    handleModalShow();
                                  }}
                                >{`Rapportera`}</Button>
                                <Button
                                  className="m-1"
                                  variant="secondary"
                                  onClick={() => {
                                    handleShow();
                                  }}
                                >{`stäng`}</Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </Col>
                    )}
                  </>
                </Row>
              </Container>
            ) : (
              <>{showNoJobs()}</>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
