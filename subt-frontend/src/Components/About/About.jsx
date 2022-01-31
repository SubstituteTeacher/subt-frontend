import { Container, Row, Col, Card } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <>
      <div id="about-background">
        <div className="about-opacity d-flex">
          <Container
            className="text-center text-white align-self-center p-0"
            fluid
          >
            <h1>{`Om oss`}</h1>
          </Container>
        </div>
      </div>
      <Container
        className="justify-content-center align-content-center position-absolute top-50"
        fluid
      >
        <Row className="m-0">
          <Col lg={4} className="pt-3">
            <Card className="info-card">
              <Card.Body>
                <Card.Title>{`Vilka är vi?`}</Card.Title>
                <Card.Text className="m-0">{`Vi är DoThisNow!`}</Card.Text>
                <Card.Text>{`Vi erbjuder en plattform för våra vikarier att hålla koll på`}</Card.Text>
                <ul style={{ paddingLeft: "1.2rem", marginBottom: "0px" }}>
                  <li>{`Scheman`}</li>
                  <li>{`Lektioner`}</li>
                  <li>{`Material`}</li>
                  <li>{`Tider`}</li>
                  <li>{`Datum`}</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="pt-3">
            <Card className="info-card">
              <Card.Body>
                <Card.Title>{`Vad gör oss unika?`}</Card.Title>
                <Card.Text>
                  {`Vi är ledande inom den digitala vikariat marknaden.
                  Och har varit etablerade inom marknaden på tok för länge!`}
                </Card.Text>
                <Card.Text className="m-0">
                  {`Vi erbjuder ett brett utbud utav digitala verktyg`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="pt-3">
            <Card className="info-card">
              <Card.Body>
                <Card.Title>{`Uppgifter`}</Card.Title>
                <br />
                <br />
                <br />
                <Card.Text>{`0707-3232 70`}</Card.Text>
                <Card.Text>{`hello@dothisnow.com`}</Card.Text>
                <Card.Text>{`Krögargatan 26B, 416 22 Göteborg`}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div
        style={{ height: "100vh", backgroundColor: "beige", display: "flex" }}
      >
        <Container className="p-0 align-self-end" fluid>
          <Row className="m-0 justify-content-center text-center">
            <h1>{`Välkommen!`}</h1>
            <Col className="m-5">
              <div
                id="map-container"
                className="rounded z-depth-1-half map-container"
                style={{
                  height: "50vh",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753.741671069942!2d11.95719688660027!3d57.701111195768654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff369ad5ca2d7%3A0x121e41012a8d3714!2sFeskek%C3%B6rka!5e0!3m2!1ssv!2sse!4v1643670983394!5m2!1ssv!2sse"
                  title="This is a unique title"
                  width="100%"
                  height="100%"
                  frameBorder="1"
                  style={{ border: 0 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default About;
