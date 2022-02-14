import { Button, Card, Col, Row } from "react-bootstrap";
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const usersCollectionRef = collection(db, "users");

  const handleShow = () => setShow((current) => !current);
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
    return () => data();
  };

  useEffect(() => {
    if (isLoading) {
      getUsers();
    }
  });

  const renderUsers = (card, index) => {
    return (
      <Row className="mb-4" key={index}>
        <Col className="text-black" xs={12}>
          <Card className="card-display">
            <Card.Body className="d-flex flex-column ">
              <Row>
                <Col className="d-none d-xl-block">{`Email`}</Col>
                <Col>{`Lösenord`}</Col>
                <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">{`Roll`}</Col>
              </Row>
              <Row>
                <Col className="d-none d-xl-block">
                  <Card.Text className="text-nowrap">{card.email}</Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-nowrap">{card.password}</Card.Text>
                </Col>
                <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">
                  <Card.Text className="text-nowrap">{card.role}</Card.Text>
                </Col>
              </Row>

              <Button
                className="card-btn mt-3 p-0"
                onClick={() => {
                  setItemIndex(index);
                  setShow(true);
                }}
              >{`Ändra`}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Row className="mx-auto">
      {!show ? (
        <>
          <Col
            xs={12}
            style={{
              width: "60vw",
              margin: "auto",
            }}
          >
            <h1 className="text-white text-center">{`ANVÄNDARE`}</h1>
          </Col>
          <Col className="todo-profile" sm={12}>
            {users.map(renderUsers)}
          </Col>
        </>
      ) : (
        <Col>
          {show && itemIndex !== undefined ? (
            <div
              className="text-white todo-profile d-flex"
              style={{ textShadow: "1px 1px black" }}
            >
              <div className="m-auto">{`Här kan det finnas data ${users[itemIndex].email}`}</div>
              <Button onClick={() => handleShow()}>{`stäng`}</Button>
            </div>
          ) : (
            <></>
          )}
        </Col>
      )}
    </Row>
  );
};
export default UserList;
