import { Col, Container, Nav, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./HeaderNav.css";

const HeaderNav = () => {

  const currentWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  const [windowDimensions, setWindowDimensions] = useState(currentWindowDimensions());
  
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(currentWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container fluid id="navbar" className="mt-3">
      <Row className="m-auto text-center">
        {windowDimensions.width < 768 ? 
        (
        <></>
        ) : (
          <Col xs={8} className="d-flex m-auto">
          <Col>
            <Nav.Link href="/main">{`Hem`}</Nav.Link>
          </Col>
          <Col>
            <Nav.Link href="#pewdiepie">{`pewpew`}</Nav.Link>
          </Col>
          <Col>
            <Nav.Link href="#profile">{`Profil`}</Nav.Link>
          </Col>
          <Col>
            <Nav.Link href="/about">{`Om oss`}</Nav.Link>
          </Col>
          <Col>
            <Nav.Link href="/contact">{`Kontakt`}</Nav.Link>
          </Col>
        </Col>
        )}
      </Row>
    </Container>
  );
};
export default HeaderNav;
