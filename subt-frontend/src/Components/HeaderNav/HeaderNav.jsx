import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useUserAuth } from "../../context/UserAuthContext";
import "./HeaderNav.css";

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((current) => !current);
  const { logOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

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

  return (
    <Container fluid id="navbar" className="mt-3">
      <Row className="m-auto text-center">
        {windowDimensions.width < 768 ? (
          <div>
            <div className="d-flex justify-content-end">
              {isOpen ? (
                <></>
              ) : (
                <GiHamburgerMenu
                  size={40}
                  className="hamburger"
                  onClick={handleOpen}
                />
              )}
            </div>
            <div className="d-flex justify-content-end">
              {isOpen ? (
                <div className="hamburger-open">
                  <Col className="flex-column hamburger-items">
                    <Col
                      className="d-flex justify-content-end"
                      style={{ padding: "10px 10px 0 0" }}
                    >
                      <ImCross
                        size={25}
                        className="hamburger"
                        onClick={handleOpen}
                      />
                    </Col>
                    <Col>
                      <a href="/main">{`Hem`}</a>
                    </Col>
                    <Col>
                      <a href="/profile">{`Profil`}</a>
                    </Col>
                    <Col>
                      <a href="/about">{`Om oss`}</a>
                    </Col>
                    <Col>
                      <a href="/contact">{`Kontakt`}</a>
                    </Col>
                    <Col>
                      <Button
                        className="p-0 text-white"
                        style={{
                          textDecoration: "none",
                          fontSize: "18px",
                          border: "none",
                        }}
                        variant="link"
                        onClick={() => handleLogout()}
                      >{`Logga ut`}</Button>
                    </Col>
                  </Col>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <Col xs={10} lg={8} className="d-flex m-auto">
            <Col>
              <Nav.Link href="/main">{`Hem`}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="/profile">{`Profil`}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="/about">{`Om oss`}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="/contact">{`Kontakt`}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link onClick={() => handleLogout()}>{`Logga ut`}</Nav.Link>
            </Col>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default HeaderNav;
