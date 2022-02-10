import "./Mainpage.css";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  runTransaction,
  doc,
} from "@firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleModalShow = () => setModalShow((current) => !current);
  const handleShow = () => setShow((current) => !current);
  const [loading, setLoading] = useState(true);
  const [itemCardInfo, setTodoCardInfo] = useState([]);
  const { user } = useUserAuth();
  const [itemIndex, setItemIndex] = useState();

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
        ...doc.data(),
        id: doc.id,
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
    const sfDocRef = doc(db, "Tasks", itemCardInfo[itemIndex].id);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
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
                  setItemIndex(index);
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
        {!!itemCardInfo.length ? (
          <>
            <Modal
              show={modalShow}
              onHide={handleModalShow}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>{`Information`}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {itemIndex !== undefined ? (
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <strong>{`Skola: `}</strong>
                        {itemCardInfo[itemIndex].schoolName}
                      </Card.Text>
                      <Card.Text>
                        <strong>{`Stad: `}</strong>
                        {itemCardInfo[itemIndex].location}
                      </Card.Text>
                      <Card.Text>
                        <strong>{`Kurs: `}</strong>
                        {itemCardInfo[itemIndex].class}
                      </Card.Text>
                      <Card.Text>
                        <strong>{`Datum: `}</strong>
                        {itemCardInfo[itemIndex].date}
                      </Card.Text>
                      <Card.Text>
                        <strong>{`Tid: `}</strong>
                        {`${itemCardInfo[itemIndex].timeStart}-${itemCardInfo[itemIndex].timeEnd}`}
                      </Card.Text>
                      <Card.Text>
                        <strong>{`Beskrivning: `}</strong>
                        {itemCardInfo[itemIndex].text}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ) : (
                  <></>
                )}
              </Modal.Body>
              <Modal.Footer className="justify-content-between">
                <p style={{ fontStyle: "italic", textAlign: "start" }}>
                  {`Är du säker på att du vill tacka ja?`}
                </p>
                <Button
                  variant="primary"
                  style={{ width: "15%" }}
                  onClick={() => {
                    handleModalShow();
                    handleAssignment();
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
            <Container className="align-self-center m-5" fluid>
              <Row className="mx-auto mt-5">
                {isMobile ? (
                  <></>
                ) : (
                  <>
                    <Col sm={12} md={6}>
                      <h1 className="text-white text-center">{`Tillgängliga jobb`}</h1>
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
                    <div>{itemCardInfo.map(renderJobs)}</div>
                  </Col>
                )}
                <Col>
                  {show && itemIndex !== undefined ? (
                    <div
                      className="text-white jobinfo-box "
                      style={{ textShadow: "1px 1px black" }}
                    >
                      <h1>{itemCardInfo[itemIndex].title}</h1>
                      <h3>{`Skola: ${itemCardInfo[itemIndex].schoolName} - ${itemCardInfo[itemIndex].location}`}</h3>
                      <h4>{`Kurs: ${itemCardInfo[itemIndex].class}`}</h4>
                      <h4>{`Datum: ${itemCardInfo[itemIndex].date}`}</h4>
                      <h4>{`Tid: ${itemCardInfo[itemIndex].timeStart} - ${itemCardInfo[itemIndex].timeEnd}`}</h4>
                      <p>{`${itemCardInfo[itemIndex].text}`}</p>
                      <br />
                      <div>
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleModalShow();
                          }}
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
          </>
        ) : (
          <>
            {loading ? (
              <Container
                className="align-self-center m-5 text-center text-white"
                fluid
              >
                <h1>
                  {" "}
                  <Spinner
                    as="span"
                    animation="border"
                    size="xl"
                    role="status"
                    aria-hidden="true"
                  />
                  {`Laddar jobb...`}
                </h1>
              </Container>
            ) : (
              <Container
                className="align-self-center m-5 text-center text-white"
                fluid
              >
                <h1>{`Inga jobb hittades...`}</h1>
              </Container>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Mainpage;
