import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="">
        <Container fluid>
          <Row>
            <Col as={Link} to="/recipe">
              <span className="">Home</span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Header;
