import { Button, Card, Col, Row } from "react-bootstrap";
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const TaskManager = () => {
  const [reports, setReports] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemIndex, setItemIndex] = useState(0);
  const handleShow = () => setShow((current) => !current);

  const tasksCollectionRef = collection(db, "reports");
  const getReports = async () => {
    const data = await getDocs(tasksCollectionRef);
    setReports(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
    return () => data();
  };

  useEffect(() => {
    if (isLoading) {
      getReports();
    }
  });

  const renderReports = (data, index) => {
    return (
      <Col key={index} className="d-flex text-white">
        {index > 0 ? (
          <>
            <Col xs={4}>
              <h6>{data.taskId}</h6>
            </Col>
            <Col xs={5}>
              <h6>{data.userId}</h6>
            </Col>
            <Col xs={2} className="text-center">
              <h6>{data.reportSick ? "Ja" : ""}</h6>
            </Col>
            <Col xs={1} className="text-center">
              <h6>{data.overtime}</h6>
            </Col>
          </>
        ) : (
          <></>
        )}
      </Col>
    );
  };

  return (
    <>
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
              <h1 className="text-white text-center">{`RAPPORTER`}</h1>
            </Col>
            <Row className="mx-auto h-100 align-content-center">
              <Card className="information-card">
                <Card.Body className="text-white">
                  <Col>asd</Col>
                  <Col
                    className="d-flex"
                    style={{ borderBottom: "solid 1px" }}
                    sm={12}
                  >
                    <Col xs={4}>{`jobb ID`}</Col>
                    <Col xs={5}>{`Användare`}</Col>
                    <Col xs={2} className="text-center">{`Sjukdom`}</Col>
                    <Col xs={1} className="text-center">{`Övertid`}</Col>
                  </Col>
                  <Col xs={12} className="mt-2">
                    {reports.map(renderReports)}
                  </Col>
                </Card.Body>
              </Card>
            </Row>
          </>
        ) : (
          <Col>
            {show && itemIndex !== undefined ? (
              <div
                className="text-white todo-profile d-flex"
                style={{ textShadow: "1px 1px black" }}
              >
                <div className="m-auto">{`Här kan det finnas data`}</div>
                <Button onClick={() => handleShow()}>{`stäng`}</Button>
              </div>
            ) : (
              <></>
            )}
          </Col>
        )}
      </Row>
    </>
  );
};
export default TaskManager;
