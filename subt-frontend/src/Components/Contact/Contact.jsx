import { Row, Col, Form, Container } from "react-bootstrap";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaPhoneAlt,
  FaEnvelope,
  FaMapPin,
  FaGlobe,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <div id="contact-background">
        <div className="contact-opacity d-flex">
          <Container
            className="text-center text-white align-self-center p-0"
            fluid
          >
            <h1>{`Kontakta oss`}</h1>
          </Container>
        </div>
      </div>
      <section className="py-5">
        <Row className="m-4">
          <Col
            lg={5}
            className="lg-0 mb-4 mx-auto d-none d-md-block"
            style={{
              borderRadius: "5px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Form className="p-5">
              <Form.Group className="mb-3" controlId="nameForm">
                <Form.Label>{`Ditt namn`}</Form.Label>
                <Form.Control type="text" placeholder="Namn" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="emailForm">
                <Form.Label>{`Din email`}</Form.Label>
                <Form.Control type="email" placeholder="email@exempel.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{`Ditt meddelande`}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Skriv ditt meddelande här"
                />
              </Form.Group>
            </Form>
          </Col>
          <Col
            lg={5}
            className="lg-0 mb-4 mx-auto d-flex justify-content-center align-items-center"
          >
            <div className="d-none d-lg-block">
              <h5>
                <FaPhoneAlt size={25} style={{ fill: "pink" }} />{" "}
                {`0707-3232 70`}
              </h5>
              <h5>
                <FaEnvelope size={25} style={{ fill: "pink" }} />{" "}
                {`hello@dothisnow.com`}
              </h5>
              <h5>
                <FaMapPin size={25} style={{ fill: "pink" }} />{" "}
                {`Krögargatan 26B, 416 22 Göteborg`}
              </h5>
              <h5>
                <FaFacebookSquare size={25} style={{ fill: "pink" }} />{" "}
                {`Följ oss på facebook!`}
              </h5>
              <h5>
                <FaInstagramSquare size={25} style={{ fill: "pink" }} />{" "}
                {`Följ oss på Instagram!`}
              </h5>
            </div>
          </Col>
        </Row>
        <Row className="d-block d-md-none m-0">
          <Col>
            <Form className="">
              <Form.Group className="mb-3" controlId="nameForm">
                <Form.Label>{`Ditt namn`}</Form.Label>
                <Form.Control type="text" placeholder="Namn" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="emailForm">
                <Form.Label>{`Din email`}</Form.Label>
                <Form.Control type="email" placeholder="email@exempel.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{`Ditt meddelande`}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Skriv ditt meddelande här"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Contact;
