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
import { useState } from "react";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => setIsChecked((current) => !current);
  const handleModalShow = () => setModalShow((current) => !current);
  const handleShow = () => setShow((current) => !current);
  const [overtime, setOvertime] = useState(false);
  const [extraHours, setExtraHours] = useState();
  const date = new Date();
  const [jobInfo, setJobinfo] = useState({
    title: "",
    location: "",
    schoolName: "",
    class: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    text: "",
  });
  const tempJobs = [
    {
      title: "Pedagog till lågstadiet sökes",
      location: "Göteborg",
      schoolName: "KrampSkolan",
      class: "Pedagogik",
      date: "2022-01-31",
      timeStart: "11.00",
      timeEnd: "17.00",
      text: "Pedagogiken skall förbättras får åk 1-3 i krampskolan. Du skall göra dom bättre genom pedagogik.",
    },
    {
      title: "TDD EXPERT",
      location: "Göteborg",
      schoolName: "Newton",
      class: "TDD",
      date: "2022-02-03",
      timeStart: "08.00",
      timeEnd: "16.00",
      text: "Gå igenom hela testramverket och examinera genom en quiz. Skriven utav dig själv.",
    },
    {
      title: "Förskolelärare",
      location: "Göteborg",
      schoolName: "RosaKnatten",
      class: "Sovtimmen",
      date: "2022-05-14",
      timeStart: "12.00",
      timeEnd: "13.00",
      text: "Håll koll på ungarna när dom sover.",
    },
    {
      title: "Gymnastiklärare till högstadiet",
      location: "Göteborg",
      schoolName: "HögaStadiet",
      class: "Gymnastik",
      date: "2022-06-02",
      timeStart: "10.00",
      timeEnd: "14.00",
      text: "Planera en bollsportlektion på 4 timmar. Ha så kul.",
    },
  ];

  const renderJobs = (card, index) => {
    return (
      <Row className="mb-4" key={index}>
        <Col xs={12}>
          <Card className="card-display">
            <Card.Body className="d-flex flex-column ">
              <Card.Title className="mb-3">{card.title}</Card.Title>
              <Row>
                <Col>{`Plats`}</Col>
                <Col>{`Skola`}</Col>
                <Col>{`Kurs`}</Col>
                <Col>{`Datum`}</Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Card.Text className="text-nowrap">{card.location}</Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-nowrap">
                    {card.schoolName}
                  </Card.Text>
                </Col>
                <Col>
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
                    title: card.title,
                    location: card.location,
                    schoolName: card.schoolName,
                    class: card.class,
                    date: card.date,
                    timeStart: card.timeStart,
                    timeEnd: card.timeEnd,
                    text: card.text,
                  });
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
    <div id="mainpage-background">
      <div className="background-opacity">
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
        <Container className="job-container">
          <Row>
            <Col className="todo overflow-auto">
              <h1 className="text-white text-center">{`TODO'S`}</h1>
              <div>{tempJobs.map(renderJobs)}</div>
            </Col>
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
                      onClick={() => setModalShow(true)}
                    >{`Rapportera`}</Button>
                    <Button
                      className="m-1"
                      variant="secondary"
                      onClick={handleShow}
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
