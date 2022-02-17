import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Card,
  Nav,
  Collapse,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { useUserAuth } from "../../../context/UserAuthContext";
import "./ProfileSettings.css";

const ProfileSettings = (props) => {
  const [open, setOpen] = useState("");

  const headers = {
    id: "",
    firstname: "Namn",
    surname: "Efternamn",
    age: "Födelseår",
    email: "Email",
    phone: "Telefon",
    bankAccount: "Kontonummer",
    bank: "Bank",
    adress: "Address",
    zipCode: "Postnummer",
    city: "Stad",
    username: "Användarnamn",
    sex: "Kön",
  };

  const [currentUser, setCurrentUser] = useState({
    id: "",
    firstname: "",
    surname: "",
    age: "",
    email: "",
    phone: "",
    bankAccount: "",
    bank: "",
    adress: "",
    zipCode: "",
    city: "",
    username: "",
    sex: "",
  });

  const [updateUserInfo, setUpdateUserInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUserAuth();

  const getUserInfo = async () => {
    const getPostsFromFirebase = [];
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("id", "==", props.props))
    );
    querySnapshot.forEach((doc) => {
      getPostsFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setCurrentUser({
      id: getPostsFromFirebase[0]?.id ?? "",
      firstname: getPostsFromFirebase[0]?.firstname ?? "",
      surname: getPostsFromFirebase[0]?.surname ?? "",
      age: getPostsFromFirebase[0]?.age ?? "",
      email: getPostsFromFirebase[0]?.email ?? "",
      phone: getPostsFromFirebase[0]?.phone ?? "",
      bankAccount: getPostsFromFirebase[0]?.bankAccount ?? "",
      bank: getPostsFromFirebase[0]?.bank ?? "",
      adress: getPostsFromFirebase[0]?.adress ?? "",
      zipCode: getPostsFromFirebase[0]?.zipCode ?? "",
      city: getPostsFromFirebase[0]?.city ?? "",
      username: getPostsFromFirebase[0]?.username ?? "",
      sex: getPostsFromFirebase[0]?.sex ?? "",
    });
    setLoading(false);
    return () => querySnapshot();
  };

  useEffect(() => {
    if (loading && user.uid) {
      getUserInfo();
    }
  });

  const updateUser = async () => {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      firstname: currentUser.firstname,
      surname: currentUser.surname,
      age: currentUser.age,
      phone: currentUser.phone,
      bankAccount: currentUser.bankAccount,
      bank: currentUser.bank,
      adress: currentUser.adress,
      zipCode: currentUser.zipCode,
      city: currentUser.city,
      username: currentUser.username,
      sex: currentUser.sex,
    });
    setUpdateUserInfo(false);
  };

  useEffect(() => {
    if (updateUserInfo) {
      updateUser();
    }
  });

  const setData = (index, data) => {
    switch (index) {
      case "Namn":
        setCurrentUser({
          ...currentUser,
          firstname: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Efternamn":
        setCurrentUser({
          ...currentUser,
          surname: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Födelseår":
        setCurrentUser({
          ...currentUser,
          age: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Email":
        setCurrentUser({
          ...currentUser,
          email: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Telefon":
        setCurrentUser({
          ...currentUser,
          phone: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Kontonummer":
        setCurrentUser({
          ...currentUser,
          bankAccount: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Bank":
        setCurrentUser({
          ...currentUser,
          bank: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Address":
        setCurrentUser({
          ...currentUser,
          adress: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Postnummer":
        setCurrentUser({
          ...currentUser,
          zipCode: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Stad":
        setCurrentUser({
          ...currentUser,
          city: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Användarnamn":
        setCurrentUser({
          ...currentUser,
          username: data,
        });
        setUpdateUserInfo(true);
        break;
      case "Kön":
        setCurrentUser({
          ...currentUser,
          sex: data,
        });
        setUpdateUserInfo(true);
        break;
      default:
        return;
    }
  };

  const newData = (header, val) => {
    let data;
    return (
      <div className="d-flex" style={{ borderBottom: "solid 1px" }}>
        <Col className="align-self-end mb-1">
          <Form>
            <Form.Group className="">
              <Form.Control
                placeholder={`${header}: ${val}`}
                onChange={(e) => {
                  data = e.target.value;
                }}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col className="align-self-end text-end mb-1">
          <Button
            variant="primary"
            onClick={() => {
              setData(header, data);
              setOpen("");
            }}>{`Spara`}</Button>
          &nbsp;
          <Button
            variant="secondary"
            onClick={() => setOpen("")}>{`Stäng`}</Button>
        </Col>
      </div>
    );
  };

  const renderRows = () => {
    return (
      <>
        {Object.entries(headers).map((val, index) => {
          return (
            <Row key={index}>
              {index > 0 ? (
                <>
                  <Col xs={3} className="p-0">
                    <h5>{`${val[1]}`}</h5>
                  </Col>
                  <Col className="p-0">
                    <h5>{`${Object.entries(currentUser)[index][1]}`}</h5>
                  </Col>
                  <Col xs={2} className="text-end p-0">
                    <Nav.Link
                      className="edit-btn"
                      aria-controls={index}
                      aria-expanded={open}
                      onClick={() => {
                        setOpen(index);
                      }}>
                      <h5>{`Redigera`}</h5>
                    </Nav.Link>
                  </Col>
                  <Collapse className="p-0" id={index} in={open === index}>
                    <div>
                      {newData(
                        Object.entries(headers)[index][1],
                        Object.entries(currentUser)[index][1]
                      )}
                    </div>
                  </Collapse>
                </>
              ) : (
                <></>
              )}
            </Row>
          );
        })}
      </>
    );
  };

  return (
    <Container
      className="text-center h-75"
      fluid
      style={{ textShadow: "2px 2px black" }}>
      <Row className="mx-auto h-100 align-content-center">
        <Card className="information-card">
          <Card.Header className="text-center">
            <h2 className="text-white">{`Allmänna kontoinställningar`}</h2>
          </Card.Header>
          <div className="solid">
            <Card.Body className="text-white" style={{ textAlign: "left" }}>
              {renderRows()}
            </Card.Body>
          </div>
        </Card>
      </Row>

      {/*
        <Button
          variant="primary"
          onClick={() => {
            navigate("/profile");
          }}>{`Tillbaka`}</Button>
        */}
    </Container>
  );
};
export default ProfileSettings;
