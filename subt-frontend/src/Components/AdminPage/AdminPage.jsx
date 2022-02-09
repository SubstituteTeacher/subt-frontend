import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./AdminPage.css";


    function AdminPage() {
        const [users, setUsers] = useState([]);
        const usersCollectionRef = collection(db, "users");
        const bool = false;

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
            {bool ? (
              <></>
            ) : (
              <Col className="todo overflow-auto" sm={12} md={6}>
                <h1 className="text-white text-center">{`ANVÄNDARE`}</h1>
            {users.map((user) => {
                return (
                    <div
                    className="text-white jobinfo-box "
                    style={{ textShadow: "1px 1px black" }}>
                {" "}
                <h4>Email: {user.email}</h4>
                <h4>Password: {user.password}</h4>
                <h4>Role: {user.role}</h4>
                </div>
                );
            })}
            </Col>
                )}
                </Row>
                </Container>
                </div>
                </div>

        )}

export default AdminPage;