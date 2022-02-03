import { Container, Col, Row, Button } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const tempInfo = [
    {
      id: "1234567890",
      firstname: "Bengan",
      surname: "Bengalsson",
      age: "1982-01-01",
      email: "asd@hotmail.com",
      phone: "072-419 22 22",
      bankAccount: "1234-12341112",
      bank: "Glasbanken",
      username: "BengalBengan82",
      password: "asd",
    },
  ];

  const renderName = (person, index) => {
    return (
      <div key={index}>
        <Row>
          <h1 style={{ fontSize: "80px" }}>{`${person.firstname}`}</h1>
          <h1 style={{ fontSize: "80px" }}>{`${person.surname}`}</h1>
        </Row>
      </div>
    );
  };

  const renderInfo = (info, index) => {
    return (
      <div key={index} style={{ textAlign: "left" }}>
        <Row>
          <Col>
            <h4>&nbsp;&nbsp;{`${info.email}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>&nbsp;&nbsp;{`${info.username}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>&nbsp;&nbsp;{`${info.bankAccount}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>&nbsp;&nbsp;{`${info.bank}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>&nbsp;&nbsp;{`${info.age}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>&nbsp;&nbsp;{`${info.phone}`}</h4>
          </Col>
        </Row>
      </div>
    );
  };
  const renderParams = () => {
    return (
      <div style={{ textAlign: "end" }}>
        <Row>
          <Col>
            <h4>{`Email`}&nbsp;&nbsp;</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Användarnamn`}&nbsp;&nbsp;</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Bankkonto`}&nbsp;&nbsp;</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Bank`}&nbsp;&nbsp;</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Född`}&nbsp;&nbsp;</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Telefon`}&nbsp;&nbsp;</h4>
          </Col>
        </Row>
      </div>
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
              <Container fluid>
                <Col>{tempInfo.map(renderName)}</Col>
              </Container>
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
                  <Button>{`Inställningar`}</Button>
                  &nbsp;
                  <Button>{`Statistik`}</Button>
                </Col>
              </Col>
              <Col xs={12} className="d-flex mb-5">
                <Col xs={6}>{renderParams()}</Col>
                <Col xs={6}>{tempInfo.map(renderInfo)}</Col>
              </Col>
              <Col xs={12} className="d-lg-none">
                <Col style={{ textAlign: "center" }}>
                  &nbsp;&nbsp;
                  <Button>{`Inställningar`}</Button>
                  &nbsp;
                  <Button>{`Statistik`}</Button>
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
