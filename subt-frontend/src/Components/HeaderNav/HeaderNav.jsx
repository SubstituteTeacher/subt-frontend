import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "@firebase/firestore";
import "./HeaderNav.css";

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((current) => !current);
  const { logOut, user } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [userListInfo, setuserListInfo] = useState([]);

  const getUsersList = async () => {
    const getPostsFromFirebase = [];
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    querySnapshot.forEach((doc) => {
      getPostsFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    setuserListInfo(getPostsFromFirebase);
    setLoading(false);
    return () => querySnapshot();
  };

  useEffect(() => {
    if (loading === true && !!user.email) {
      getUsersList();
    }
  });

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
                    {!!userListInfo.length ? (
                      <>
                        {userListInfo[0].role === "admin" ? (
                          <Col>
                            <a href="/admin">{`Admin`}</a>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
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
              <span>
                <Nav.Link href="/main">{`Hem`}</Nav.Link>
              </span>
            </Col>
            {!!userListInfo.length ? (
              <>
                {userListInfo[0].role === "admin" ? (
                  <Col>
                    <span>
                      <Nav.Link href="/admin">{`Admin`}</Nav.Link>
                    </span>
                  </Col>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <Col>
              <span>
                <Nav.Link href="/profile">{`Profil`}</Nav.Link>
              </span>
            </Col>
            <Col>
              <span>
                <Nav.Link href="/about">{`Om oss`}</Nav.Link>
              </span>
            </Col>
            <Col>
              <span>
                <Nav.Link href="/contact">{`Kontakt`}</Nav.Link>
              </span>
            </Col>
            <Col>
              <span>
                <Nav.Link onClick={() => handleLogout()}>{`Logga ut`}</Nav.Link>
              </span>
            </Col>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default HeaderNav;
