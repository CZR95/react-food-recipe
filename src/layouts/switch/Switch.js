import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const SwitchRecType = (props) => {
  const css_switchActive =
    "text-center bg-primary text-white border border-primary py-1 ";
  const css_switchNonactive =
    "text-center bg-light text-primary border border-primary py-1 ";

  return (
    <Container>
      <Row className="rounded-pill bg-gray">
        <Col
          className={
            props.type == "expenses"
              ? css_switchActive + " rounded-pill-left"
              : css_switchNonactive + " rounded-pill-left"
          }
          onClick={() => props.switchRecType("expenses")}
        >
          <span>Expenses</span>
        </Col>
        <Col
          className={
            props.type == "revenue"
              ? css_switchActive + " rounded-pill-right"
              : css_switchNonactive + " rounded-pill-right"
          }
          onClick={() => props.switchRecType("revenue")}
        >
          <span>Revenue</span>
        </Col>
      </Row>
    </Container>
  );
};
