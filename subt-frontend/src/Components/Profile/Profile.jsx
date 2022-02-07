import { Container, Col, Row, Button, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const tempInfo = [
    {
      id: "1234567890",
      firstname: "Bengan",
      surname: "Bengalsson",
      age: "1982-01-01",
      email: "marcus.94.richardson@gmail.com",
      phone: "072-419 22 22",
      bankAccount: "1234-12341112",
      bank: "Glasbanken",
      username: "BengalBengan82",
      password: "asd",
      sex: "Male",
    },
  ];
  const navigate = useNavigate();

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

  const renderName = (person, index) => {
    return (
      <div key={index}>
        <Row style={{ display: "grid", justifyContent: "center" }}>
          <h1
            style={
              windowDimensions.width > 650
                ? { fontSize: "80px" }
                : { fontSize: "50px" }
            }
          >{`${person.firstname}`}</h1>
          <h1
            style={
              windowDimensions.width > 650
                ? { fontSize: "80px" }
                : { fontSize: "50px" }
            }
          >{`${person.surname}`}</h1>
        </Row>
      </div>
    );
  };

  const renderInfo = (info, index) => {
    return (
      <Col className="d-flex" key={index}>
        <Col xs={3} sm={5} lg={3} style={{ textAlign: "end" }}>
          <Col>
            <h4>{`Email`}&nbsp;</h4>
          </Col>
          <Col>
            <h4>{`Användare`}&nbsp;</h4>
          </Col>
          <Col>
            <h4>{`Bankkonto`}&nbsp;</h4>
          </Col>
          <Col>
            <h4>{`Bank`}&nbsp;</h4>
          </Col>
          <Col>
            <h4>{`Född`}&nbsp;</h4>
          </Col>
          <Col>
            <h4>{`Telefon`}&nbsp;</h4>
          </Col>
        </Col>
        <Col xs={9} sm={6} lg={9} style={{ textAlign: "left" }}>
          <Col>
            <h4>&nbsp;{`${info.email}`}</h4>
          </Col>
          <Col>
            <h4>&nbsp;{`${info.username}`}</h4>
          </Col>
          <Col>
            <h4>&nbsp;{`${info.bankAccount}`}</h4>
          </Col>
          <Col>
            <h4>&nbsp;{`${info.bank}`}</h4>
          </Col>
          <Col>
            <h4>&nbsp;{`${info.age}`}</h4>
          </Col>
          <Col>
            <h4>&nbsp;{`${info.phone}`}</h4>
          </Col>
        </Col>
      </Col>
    );
  };

  return (
    <div id="profile-background">
      <div className="profile-opacity text-white align-items-center d-flex">
        <Container
          className="text-center h-75"
          fluid
          style={{ textShadow: "2px 2px black" }}
        >
          <Row className="mx-auto h-100">
            <Col md={12} lg={6} className="align-self-center">
              <Container>{tempInfo.map(renderName)}</Container>
            </Col>
            <Col
              lg={6}
              md={12}
              className="align-self-center d-flex"
              style={{ flexDirection: "column" }}
            >
              <Col xs={12} className="mb-5 d-none d-lg-flex">
                <Col></Col>
                <Col style={{ textAlign: "start" }}>
                  &nbsp;&nbsp;
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/profile/settings");
                    }}
                  >{`Inställningar`}</Button>
                  &nbsp;
                  <Button>{`Statistik`}</Button>
                </Col>
              </Col>
              <Col xs={12} className="d-flex mb-5 overflow-auto">
                <Col className="d-flex">{tempInfo.map(renderInfo)}</Col>
              </Col>
              <Col xs={12} className="d-lg-none">
                <Col style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/profile/settings");
                    }}
                  >{`Inställningar`}</Button>
                  &nbsp;
                  <Button variant="primary">{`Statistik`}</Button>
                </Col>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Profile;
