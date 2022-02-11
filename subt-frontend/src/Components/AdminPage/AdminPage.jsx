import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./AdminPage.css";


    function AdminPage() {
        const [users, setUsers] = useState([]);
        const usersCollectionRef = collection(db, "users");

        useEffect(() => {
            const getUsers = async () => {
                const data = await getDocs(usersCollectionRef);
                setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            };

            getUsers();
        }, []);

        return (
            <div id="adminpage-background">
              <div className="adminpage-opacity text-white align-items-center d-flex">
              <Container className="job-container align-self-center m-5" fluid>
          <Row className="mx-auto">
              <Col className="todo overflow-auto" sm={12} md={6}>
                <h1 className="text-white text-center">{`ANVÄNDARE`}</h1>
            {users.map((user) => {
                return (
                    <Row className="mb-4">
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
                              <Card.Text className="text-nowrap">{user.email}</Card.Text>
                            </Col>
                            <Col>
                              <Card.Text className="text-nowrap">
                                {user.password}
                              </Card.Text>
                            </Col>
                            <Col className="d-none d-xl-block d-lg-block d-sm-block d-md-none">
                              <Card.Text className="text-nowrap">{user.role}</Card.Text>
                            </Col>
                          </Row>
            
                          <Button
                            className="card-btn mt-3 p-0"
                            /* onClick={() => {
                              setJobinfo({
                                title: card.title,
                                location: card.location,
                                schoolName: card.schoolName,
                                class: card.class,
                                date: card.date,
                                timeStart: card.timeStart,
                                timeEnd: card.timeEnd,
                                text: card.text,
                              });
                              setShow(true);
                              if (windowDimensions.width < 768) {
                                setIsMobile(true);
                              }
                            }} */
                          >{`Ändra`}</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                );
            })}
            </Col>
            </Row>
            </Container>
            </div>
            </div>

        )}

export default AdminPage;