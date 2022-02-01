import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaPhoneAlt,
  FaEnvelope,
  FaMapPin,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-main bg-primary p-5">
      <div className="footer-text-area text-center">
        <Row className="footer-row align-items-center p-0 justify-content-between">
          <Col xs={12} sm={6} md={5} lg={4}>
            <ul className="contact-info-list">
              <li className="text-white">
                <FaEnvelope size={25} style={{ fill: "white" }} />
                <Link to="/"> &nbsp; {`hello@dothisnow.com`}</Link>
              </li>
              <li>
                <FaMapPin size={25} style={{ fill: "white" }} />
                <a
                  href="https://www.google.com/maps/place/Fiskr%C3%B6keriet+p%C3%A5+%C3%A4ttekulla/@56.004431,12.7717277,16.25z/data=!4m5!3m4!1s0x0:0x6b677baa1e59011c!8m2!3d56.0040685!4d12.7712153"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  &nbsp; {`Krögargatan 26B, 416 22 Göteborg`}
                </a>
              </li>
              <li>
                <FaPhoneAlt size={25} style={{ fill: "white" }} /> &nbsp;
                {`0707-3232 70`}
              </li>
            </ul>
          </Col>
          <Col className="d-none d-lg-block">
            <div className="mx-auto text-white ">
              <h4>{`We Are DoThisNow!`}</h4>
            </div>
          </Col>
          <Col xs={12} sm={6} md={5} lg={4}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagramSquare size={30} style={{ fill: "white" }} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookSquare size={30} style={{ fill: "white" }} />
            </a>
            <a href="https://localhost:3000" target="_blank" rel="noreferrer">
              <FaGlobe size={30} style={{ fill: "white" }} />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
