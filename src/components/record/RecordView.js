import React, { Component } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import { SwitchRecType } from "../../layouts/switch/Switch";

import {
  amountDisplayConverter,
  getDayOfWeek,
  getCurrentYear,
  getCurrentMonth,
} from "../../global/GlobalFunction";

import {
  EditRecordModal,
  DeleteRecordModal,
  FailedModal,
  SuccessModal,
} from "../../layouts/modal/Modal";

class RecordView extends Component {
  state = {
    userList: [],
    recordList: [],
    categoryList: [],
    inputUserName: "",
    inputDate: "",
    recordType: "All",
    recordData: {},
    totalExpenses: 0,
    totalRevenue: 0,
    grandTotal: 0,
    editRecordModal: false,
    deleteRecordModal: false,
  };

  css = {
    containerStyle1: "border-2-gray rounded p-3",
    divStyle1: "py-2 px-3",
    inputStyle1: "width-100p",
    switchCatTypeActive: "text-center btn-blue py-1 border-2-blue rounded-pill",
    switchCatTypeNonactive:
      "text-center btn-white py-1 border-2-gray rounded-pill",
  };

  componentDidMount() {
    this.apiGetUserList();
    this.apiGetRecordList();
  }

  render() {
    let date = this.state.inputDate;
    console.log("aaaa" + getCurrentMonth());
    return (
      <div>
        <br />
        <EditRecordModal
          show={this.state.editRecordModal}
          value={this.state.recordData}
          category={this.state.categoryList}
          onHide={() => this.setState({ editRecordModal: false })}
        />

        <DeleteRecordModal
          show={this.state.deleteRecordModal}
          onHide={() => this.setState({ deleteRecordModal: false })}
        />

        <Container className={this.css.containerStyle1}>
          <Row>
            <Col>{/* <h5>Search</h5>
              <hr /> */}</Col>
          </Row>
          {/*<div className="d-flex flex-row height-20vh">
             <div className="d-flex flex-column width-25p scroll"></div>

            <div className="d-flex flex-column width-75p pl-3 "> */}
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>User</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="All"
                  onChange={this.switchUser}
                >
                  {this.layoutUserList()}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="All"
                  onChange={this.switchRecordType}
                >
                  <option>All</option>
                  <option>Expenses</option>
                  <option>Revenue</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="month"
                  defaultValue={this.state.inputDate}
                  onBlur={this.setInputDate}
                />
              </Form.Group>
            </Form.Row>
            <input
              variant="primary"
              type="button"
              value="Search"
              className="rounded-pill bg-primary text-white border-none py-1 width-20p"
              onClick={this.apiGetRecordList}
            />
          </Form>
          {/* </div> 
          </div>*/}
        </Container>
        <br />
        <Container>
          <Row>
            <Col className={this.css.containerStyle1 + " mr-2"}>
              <h5>Revenue</h5>
              <span>{amountDisplayConverter(this.state.totalRevenue)}</span>
            </Col>

            <Col className={this.css.containerStyle1 + " mx-1"}>
              <h5>Expenses</h5>
              <span>{amountDisplayConverter(this.state.totalExpenses)}</span>
            </Col>

            <Col className={this.css.containerStyle1 + " ml-2"}>
              <h5>Total</h5>
              <span>{amountDisplayConverter(this.state.grandTotal)}</span>
            </Col>
          </Row>
        </Container>
        <br />

        <Container className={this.css.containerStyle1}>
          <Row>
            <Col>
              <h5>Records</h5>
              <hr />
            </Col>
          </Row>
          <div className="d-flex flex-column scroll height-70vh">
            {this.layoutRecordList()}
          </div>
        </Container>
      </div>
    );
  }

  // Layout function
  layoutUserList = () => {
    return this.state.userList.map((value, index) => (
      // <div>
      //   <input
      //     type="radio"
      //     name="user"
      //     value={value.name}
      //     //checked={value.checked}
      //     onClick={() => this.switchUser(value.name)}
      //   />
      //   <label key={index}>{value.name}</label>
      //   <br />
      //   <hr />
      // </div>
      <option>{value.name}</option>
    ));
  };

  layoutRecordList = () => {
    let date = "";
    let displayDate = false;
    return this.state.recordList.map((value, index) => (
      <div className="py-1">
        {date !== value.date ? (date = value.date) : (displayDate = false)}
        {displayDate ? <span>{value.date}</span> : <span></span>}
        <Accordion>
          {console.log(value.date.substring(5, 7))}
          <Card
            className={
              parseInt(value.date.substring(5, 7)) % 2 == 0
                ? "bg-light"
                : "bg-white"
            }
          >
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              <Row>
                <Col md={3} lg={2} className="py-1">
                  <span>{value.date}</span>
                  <br />
                  <span>{getDayOfWeek(value.date)}</span>
                </Col>
                <Col md={6} className="py-1">
                  <span>
                    {value.category} - {value.subcategory}
                  </span>
                  <br />
                  <span>{value.remark}</span>
                </Col>
                <Col className="text-center font-weight-bold py-3">
                  <span
                    className={
                      value.type == "revenue" ? "text-green" : "text-red"
                    }
                  >
                    {value.type == "revenue"
                      ? amountDisplayConverter(value.amount)
                      : amountDisplayConverter(value.amount)}
                  </span>
                </Col>
              </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>
                  <Col md={3} lg={2}>
                    <span>ID: {value.record_id}</span>
                    <br />
                    <span>Settled: {value.settle}</span>
                  </Col>
                  <Col md={6}>
                    <span>
                      {/* Due: {amountDisplayConverter(value.unsettled_amount)} */}
                    </span>
                    <br />
                    <span>Settle by: {value.settle_by}</span>
                  </Col>
                  <Col className="cursor-pointer text-center py-2">
                    <FontAwesomeIcon
                      icon={faPen}
                      size="1x"
                      className="mx-2"
                      onClick={() => this.editRecord(value)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="1x"
                      className="mx-2"
                      onClick={() => this.deleteRecord(value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col></Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    ));
  };
  // Layout function end

  // API function
  apiGetCategoryList = (type) => {
    console.log("type: " + type);
    axios
      .get(process.env.REACT_APP_API_GET_CATEGORY_LIST + "?type=" + type)
      .then((response) => {
        if (response.data.message == "success") {
          this.setState({ categoryList: response.data.data });
        }
      });
  };

  apiGetUserList = () => {
    // GET user list
    axios.get(process.env.REACT_APP_API_GET_USER_LIST).then((response) => {
      if (response.data.message == "success") {
        let userName = response.data.data[0].name;
        console.log("apiGetUserList userName: " + response.data.data[0].name);

        this.setState({
          userList: response.data.data,
          inputUserName: userName,
        });
      }
      console.log("userList: " + JSON.stringify(this.state.userList));
    });
  };

  apiGetRecordList = () => {
    let userId;
    let userName = this.state.inputUserName;
    let recordType = this.state.recordType;
    let date = this.state.inputDate;

    console.log("apiGetRecordList userName: " + userName);

    if (date === "") {
      date = getCurrentYear() + "-" + getCurrentMonth();
    }

    for (let value of this.state.userList) {
      if (value.name === userName) {
        userId = value.user_id;
        break;
      }
    }

    let url =
      process.env.REACT_APP_API_GET_RECORD_LIST +
      "?userId=" +
      userId +
      "&type=" +
      recordType +
      "&date=" +
      date;
    console.log("URL: " + url);

    axios.get(url).then((response) => {
      if (response.data.message == "success") {
        let totalExpenses = 0;
        let totalRevenue = 0;
        let grandTotal = 0;

        for (let value of response.data.data) {
          if (value.type === "expenses") {
            totalExpenses += value.amount;
          } else if (value.type === "revenue") {
            totalRevenue += value.amount;
          }
        }

        grandTotal = totalRevenue + totalExpenses;
        console.log("totalExpenses: " + totalExpenses);
        console.log("totalRevenue: " + totalRevenue);

        this.setState({
          recordList: response.data.data,
          totalExpenses: totalExpenses,
          totalRevenue: totalRevenue,
          grandTotal: grandTotal,
          inputDate: date,
        });
      }
      console.log("recordList: " + this.state.recordList);
    });
  };
  // API function end

  editRecord = (value) => {
    this.setState({ editRecordModal: true, recordData: value });
  };

  deleteRecord = (value) => {
    this.setState({ deleteRecordModal: true, recordData: value });
  };

  setInputDate = (event) => {
    console.log("eventDate: " + event.target.value);
    this.setState({ inputDate: event.target.value });
  };

  switchRecordType = (event) => {
    let type = event.target.value;
    console.log("type: " + type);
    if (this.state.recordType !== type) {
      console.log("switch record type");
      this.setState({ recordType: type });
      //this.apiGetCategoryList(type);
    }
  };

  switchUser = (event) => {
    let userName = event.target.value;
    console.log("userName: " + userName);
    if (this.state.inputUserName !== userName) {
      console.log("switch user");
      this.setState({ inputUserName: userName });
    }
  };
}

export default RecordView;
