import { Container, Col, Row, Card, Button } from "react-bootstrap";
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
      <div key={index} className="m-5" style={{ textAlign: "left" }}>
        <Row>
          <Col>
            <h4>{`Email`}</h4>
          </Col>
          <Col>
            <h4>{` ${info.email}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Användarnamn`}</h4>
          </Col>
          <Col>
            <h4>{`${info.username}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Bankkonto`}</h4>
          </Col>
          <Col>
            <h4>{`${info.bankAccount}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Född`}</h4>
          </Col>
          <Col>
            <h4>{`${info.age}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>{`Telefon`}</h4>
          </Col>
          <Col>
            <h4>{`${info.phone}`}</h4>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div id="profile-background">
      <div className="profile-opacity text-white d-flex flex-column justify-content-center">
        <Container className="text-center align-self-center" fluid>
          <Row className="section-row first-row mx-auto">
            <Col className="align-self-center">
              <h1 style={{ fontSize: "60px" }}>{`Välkommen!`}</h1>
            </Col>
            <Col className="align-self-center"></Col>
          </Row>
          <Row className="section-row mx-auto">
            <Col className="">{tempInfo.map(renderName)}</Col>
            <Col className="h-100">{tempInfo.map(renderInfo)}</Col>
          </Row>
          <Row className="section-row mx-auto">
            <Col className="justify-content-end">
              {/* <Button variant="primary">{`Inställningar`}</Button>
              <Button variant="primary" className="mx-1">{`Statistik`}</Button> */}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Profile;
