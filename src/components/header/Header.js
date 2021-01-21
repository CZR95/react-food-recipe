import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="">
        <Container className="fluid">
          <Col as={Link} to="/record/add">
            <span className="">Record Add</span>
          </Col>
          <Col as={Link} to="/category/manage">
            <span className="">Manage Category</span>
          </Col>
          <Col as={Link} to="/record/view">
            <span className="">View Record</span>
          </Col>
          <Col as={Link} to="/warrant">
            <span className="">Warrant</span>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Header;
