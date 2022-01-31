import "./Mainpage.css";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useState } from "react";

const Mainpage = () => {
  const [show, setShow] = useState(false);
  const tempJobs = [
    {
      title: "Pedagog till lågstadiet sökes",
      location: "Göteborg",
      schoolName: "Newton",
      class: "TDD",
      date: "2022-02-03",
      timeStart: "08.00",
      timeEnd: "16.00",
    },
    {
      title: "Pedagog till lågstadiet sökes",
      location: "Göteborg",
      schoolName: "Newton",
      class: "TDD",
      date: "2022-02-03",
      timeStart: "08.00",
      timeEnd: "16.00",
    },
    {
      title: "Pedagog till lågstadiet sökes",
      location: "Göteborg",
      schoolName: "Newton",
      class: "TDD",
      date: "2022-02-03",
      timeStart: "08.00",
      timeEnd: "16.00",
    },
    {
      title: "Pedagog till lågstadiet sökes",
      location: "Göteborg",
      schoolName: "Newton",
      class: "TDD",
      date: "2022-02-03",
      timeStart: "08.00",
      timeEnd: "16.00",
    },
  ];

  const renderJobs = (card) => {
    return (
      <Row className="mb-4">
        <Col xs={12}>
          <Card className="card-display">
            <Card.Body className="d-flex flex-column ">
              <Card.Title className="mb-3">{card.title}</Card.Title>
              <Row>
                <Col>{`Plats`}</Col>
                <Col>{`Skola`}</Col>
                <Col>{`Kurs`}</Col>
                <Col>{`Datum`}</Col>
                <Col>{`Start`}</Col>
                <Col>{`Slut`}</Col>
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
                <Col>
                  <Card.Text className="text-nowrap">
                    {card.timeStart}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-nowrap">{card.timeEnd}</Card.Text>
                </Col>
              </Row>

              <ButtonGroup vertical className=" mt-auto justify-content-center">
                <Button
                  className="card-btn mt-1 p-0"
                  onClick={() => setShow(true)}
                >{`Information`}</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  const renderJobInfo = (card) => {};

  return (
    <div id="mainpage-background">
      <div className="background-opacity">
        <Container className="job-container">
          <Row>
            <Col className="todo overflow-auto">
              <h1 className="text-white text-center">{`TODO'S`}</h1>
              <div>{tempJobs.map(renderJobs)}</div>
            </Col>
            <Col>{show ? <div></div> : <></>}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Mainpage;
