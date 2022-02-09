import "./Mainpage.css";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  runTransaction,
  doc,
  setDoc,
  sfDocRef,
} from "@firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleCheck = () => setIsChecked((current) => !current);
  const handleModalShow = () => setModalShow((current) => !current);
  const handleShow = () => setShow((current) => !current);
  const [overtime, setOvertime] = useState(false);
  const [extraHours, setExtraHours] = useState();
  const date = new Date();
  const [loading, setLoading] = useState(true);
  const [todoCardInfo, setTodoCardInfo] = useState([]);
  const { user } = useUserAuth();
  const [jobInfo, setJobinfo] = useState({
    id: "",
    title: "",
    location: "",
    schoolName: "",
    class: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    text: "",
    isAssigned: false,
    userId: "",
  });

  const currentWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const [windowDimensions, setWindowDimensions] = useState(
    currentWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(currentWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (show && windowDimensions.width === 767) {
      setShow(false);
      setIsMobile(false);
    }
  }, [show, windowDimensions.width]);

  const getTaskItems = async () => {
    const getPostsFromFirebase = [];
    const querySnapshot = await getDocs(
      query(collection(db, "Tasks"), where("isAssigned", "==", false))
    );
    querySnapshot.forEach((doc) => {
      getPostsFromFirebase.push({
        ...doc.data(), //spread operator
        id: doc.id, // `id` given to us by Firebase
      });
    });
    setTodoCardInfo(getPostsFromFirebase);
    setLoading(true);
    return () => querySnapshot();
  };

  useEffect(() => {
    getTaskItems();
  }, [loading]);

  const handleAssignment = async () => {
    const sfDocRef = doc(db, "Tasks", jobInfo.id);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        //console.log(sfDoc.data());
        //const newPopulation = (sfDoc.data().isAssigned = true);
        transaction.update(sfDocRef, { isAssigned: true, userId: user.uid });
      });
      handleShow();
      setLoading(false);
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  const renderJobs = (card, index) => {
    return (
      <Row className="mb-4" key={index}>
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
                  setJobinfo({
                    id: card.id,
                    title: card.title,
                    location: card.location,
                    schoolName: card.schoolName,
                    class: card.class,
                    date: card.date,
                    timeStart: card.timeStart,
                    timeEnd: card.timeEnd,
                    text: card.text,
                    isAssigned: card.isAssigned,
                    userId: card.userId,
                  });
                  setShow(true);
                  if (windowDimensions.width < 768) {
                    setIsMobile(true);
                  }
                }}
              >{`Information`}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <div id="mainpage-background">
      <div className="mainpage-opacity d-flex">
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
                  <option>{`${jobInfo.timeStart} - ${jobInfo.timeEnd}`}</option>
                  <option value="overtime">{`Övertid`}</option>
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
            <OverlayTrigger
              overlay={
                !(
                  isChecked ||
                  (date.toLocaleTimeString() > jobInfo.timeEnd &&
                    date.toLocaleDateString() >= jobInfo.date)
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
                  onClick={() => handleModalShow()}
                  disabled={
                    !(
                      isChecked ||
                      (date.toLocaleTimeString() > jobInfo.timeEnd &&
                        date.toLocaleDateString() >= jobInfo.date)
                    )
                  }
                >
                  {`Skicka rapport`}
                </Button>
              </span>
            </OverlayTrigger>
          </Modal.Footer>
        </Modal>
        <Container className="align-self-center m-5" fluid>
          <Row className="mx-auto mt-5">
            {isMobile ? (
              <></>
            ) : (
              <>
                <Col sm={12} md={6}>
                  <h1 className="text-white text-center">{`TODO'S`}</h1>
                </Col>
                <Col></Col>
              </>
            )}
          </Row>
          <Row className="mx-auto">
            {isMobile ? (
              <></>
            ) : (
              <Col className="todo overflow-auto" sm={12} md={6}>
                <div>{todoCardInfo.map(renderJobs)}</div>
              </Col>
            )}
            <Col>
              {show ? (
                <div
                  className="text-white jobinfo-box "
                  style={{ textShadow: "1px 1px black" }}
                >
                  <h1>{jobInfo.title}</h1>
                  <h3>{`Skola: ${jobInfo.schoolName} - ${jobInfo.location}`}</h3>
                  <h4>{`Kurs: ${jobInfo.class}`}</h4>
                  <h4>{`Datum: ${jobInfo.date}`}</h4>
                  <h4>{`Tid: ${jobInfo.timeStart} - ${jobInfo.timeEnd}`}</h4>
                  <p>{`${jobInfo.text}`}</p>
                  <br />
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleAssignment();
                      }}
                      // onClick={() => setModalShow(true)}
                    >{`Tacka ja`}</Button>
                    <Button
                      className="m-1"
                      variant="secondary"
                      onClick={() => {
                        handleShow();
                        setIsMobile(false);
                      }}
                    >{`stäng`}</Button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Mainpage;
