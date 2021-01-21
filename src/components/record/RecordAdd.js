import React, { Component } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";

import { SuccessModal, FailedModal } from "../../layouts/modal/Modal";
import { SwitchRecType } from "../../layouts/switch/Switch";

class RecordAdd extends Component {
  state = {
    categoryList: [],
    subcategoryList: [],
    userList: [],
    userShareBillList: [],

    inputDate: "",
    inputAmount: "",
    inputAdjustAmount: "",
    inputCategory: "",
    inputSubcategory: "",
    inputRemark: "",
    inputPersonNum: 1,
    inputShareBill: "0",

    successModalShow: false,
    failedModalShow: false,

    recordType: "expenses",
    grandTotal: 0,

    billPerPerson: 0,
    totalShareBill: 0,
  };

  css = {
    containerStyle1: "border-2-gray rounded p-3",
    divStyle1: "py-2 px-3",
    inputStyle1: "width-100p",
    btnSubmit: "width-100p rounded-pill btn-green border-none py-1",
    btnReset: "width-100p rounded-pill btn-blue py-1",
    btnClear: "width-100p rounded-pill btn-yellow border-none py-1",
  };

  componentDidMount() {
    this.apiGetCategoryList(this.state.recordType);
    this.apiGetUserList();
  }

  render() {
    console.log("aaa " + process.env.REACT_APP_API_URL);

    if (this.state.inputDate === "") {
      var date = new Date();
      var month =
        (date.getMonth() + 1).toString().length == 1
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day =
        date.getDate().toString().length == 1
          ? "0" + date.getDate()
          : date.getDate();

      var todayDate = date.getFullYear() + "-" + month + "-" + day;
      console.log("todayDate:" + todayDate);
      this.setState({ inputDate: todayDate });
    }

    return (
      <div>
        <br />
        <SuccessModal
          show={this.state.successModalShow}
          onHide={() => this.setState({ successModalShow: false })}
        />

        <FailedModal
          show={this.state.failedModalShow}
          errMsg={this.state.modalFailedErrMsg}
          onHide={() => this.setState({ failedModalShow: false })}
        />

        <SwitchRecType
          type={this.state.recordType}
          switchRecType={this.switchRecordType}
        />

        <br />

        <Container className={this.css.containerStyle1}>
          <Row>
            <Col className="">
              <h5>Calculator</h5>
              <hr />
            </Col>
          </Row>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.inputDate}
                  //onChange={this.setInputDate}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.inputDate}
                  //onChange={this.setInputDate}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  list="category"
                  placeholder="Category"
                  onBlur={this.apiGetSubcategoryList}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control
                  type="text"
                  list="subcategory"
                  placeholder="Subcategory"
                  //onChange={this.setInputDate}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Remark"
                  id="remark"
                  name="remark"
                  //onChange={this.setInputDate}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Person</Form.Label>
                <Form.Control as="select" onChange={this.setInputPersonNum}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Share Bill</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.state.inputShareBill}
                  onChange={this.setInputShareBill}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Total Share Bill</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={this.state.totalShareBill}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Bill/Person</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={this.state.billPerPerson}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <br />
            <Form.Row className="text-center mb-2 ">
              <Col>
                <span>Name</span>
              </Col>
              <Col>
                <span>Bill/Person</span>
              </Col>
              <Col>
                <span>Self Bill</span>
              </Col>
              <Col>
                <span>Adjust</span>
              </Col>
              <Col>
                <span>Total</span>
              </Col>
            </Form.Row>
            {this.layoutUserShareBill()}
          </Form>
        </Container>

        <br />
        <Container className={this.css.containerStyle1}>
          <div className="d-flex flex-row height-60vh">
            <div className="d-flex flex-column width-25p scroll">
              {this.layoutUserList()}
            </div>

            <div className="d-flex flex-column width-75p pl-3 ">
              {/* {this.state.switchRecType == "revenue" ? 
                this.layoutRevenueForm() : 
                this.layoutExpensesForm()} */}
              <Row>
                <Col>
                  {this.state.recordType == "revenue" ? (
                    <h4>Revenue</h4>
                  ) : (
                    <h4>Expenses</h4>
                  )}

                  <hr />
                </Col>
              </Row>
              <Row>
                <Col className={this.css.divStyle1}>
                  <input
                    type="date"
                    value={this.state.inputDate}
                    className={this.css.inputStyle1}
                    onChange={this.setInputDate}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={this.css.divStyle1}>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={this.state.inputAmount}
                    className={this.css.inputStyle1}
                    onChange={this.setInputAmount}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={this.css.divStyle1}>
                  <input
                    type="number"
                    placeholder="Adjust Amount"
                    value={this.state.inputAdjustAmount}
                    className={this.css.inputStyle1}
                    onChange={this.setInputAdjustAmount}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={this.css.divStyle1}>
                  <input
                    type="text"
                    list="category"
                    placeholder="Category"
                    className={this.css.inputStyle1}
                    onBlur={this.apiGetSubcategoryList}
                  />
                  <datalist id="category">
                    {this.layoutCategoryDataList()}
                  </datalist>
                </Col>
              </Row>
              <Row>
                <Col className={this.css.divStyle1}>
                  <input
                    type="text"
                    list="subcategory"
                    placeholder="Subcategory"
                    // value={this.state.expSubType}
                    className={this.css.inputStyle1}
                    onBlur={this.setInputSubcategory}
                  />
                  <datalist id="subcategory">
                    {this.layoutSubcategoryDatalist()}
                  </datalist>
                </Col>
              </Row>
              <Row>
                <Col className={this.css.divStyle1}>
                  <input
                    type="text"
                    placeholder="Remark"
                    id="remark"
                    name="remark"
                    className={this.css.inputStyle1}
                    onBlur={this.setInputRemark}
                  />
                </Col>
              </Row>
              <Row className="pt-2">
                <Col>
                  <input
                    type="button"
                    value="Submit"
                    className={this.css.btnSubmit}
                    onClick={this.apiPostAddRecord}
                  />
                </Col>
                <Col>
                  <input
                    type="button"
                    value="Clear"
                    className={this.css.btnClear}
                    onClick={this.btnClear}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Container>
        <br />
      </div>
    );
  }

  // Layout function
  layoutUserList = () => {
    return this.state.userList.map((value, index) => (
      <div>
        <input
          type="checkbox"
          value={value.name}
          checked={value.checked}
          onClick={() => this.updateUserListCheckbox(value.name, value.checked)}
        />
        <label key={index}>{value.name}</label>
        <br />
        <hr />
      </div>
    ));
  };

  layoutCategoryDataList = () => {
    return this.state.categoryList.map((value, index) => (
      <option key={index} value={value.name}></option>
    ));
  };

  layoutSubcategoryDatalist = () => {
    return this.state.subcategoryList.map((value, index) => (
      <option key={index} value={value.name}></option>
    ));
  };

  layoutUserShareBill = () => {
    return this.state.userShareBillList.map((value, index) => (
      <Form.Row className="text-center py-1">
        <Col>
          <Form.Control placeholder="Name" />
        </Col>
        <Col>
          <Form.Control
            placeholder="Share Bill"
            value={value.shareBill}
            readOnly
          />
        </Col>
        <Col>
          <Form.Control placeholder="Self Bill" />
        </Col>
        <Col>
          <Form.Control placeholder="Adjust" />
        </Col>
        <Col>
          {/* <FontAwesomeIcon icon={faClone} size="1x" className="mt-2 mx-2" /> */}
          <Form.Control
            placeholder="Total"
            readOnly
            value={value.shareBill + value.selfBill}
          />
        </Col>
      </Form.Row>
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

  apiGetSubcategoryList = (event) => {
    console.log("API apiGetSubcategoryList start");
    console.log("eventCategory: " + event.target.value);
    let eventCategory = event.target.value;
    let type = this.state.recordType;

    if (eventCategory !== "" && this.state.inputCategory !== eventCategory) {
      this.setState({
        inputCategory: eventCategory,
        expSubcat: "",
        subcategoryList: [],
      });

      let url =
        process.env.REACT_APP_API_GET_SUBCATEGORY_LIST +
        "?category=" +
        eventCategory +
        "&type=" +
        type;
      console.log("URL: " + url);
      axios.get(url).then((response) => {
        if (response.data.message == "success") {
          this.setState({ subcategoryList: response.data.data });
        }
      });
    }
  };

  apiGetUserList = () => {
    // GET user list
    axios.get(process.env.REACT_APP_API_GET_USER_LIST).then((response) => {
      if (response.data.message == "success") {
        let userObject = {};
        let array = [];
        response.data.data.forEach((value, index) => {
          userObject = {
            userId: value.user_id,
            name: value.name,
            checked: false,
          };
          console.log(userObject);

          this.setState({ userList: this.state.userList.concat(userObject) });
        });

        console.log("userList: " + this.state.userList);
      }
      console.log("userList: " + this.state.userList);
    });
  };

  apiPostAddRecord = () => {
    // POST expenses add new record
    let error = false;
    let errMsg = "";

    let userId = [];
    let userIdObject = {};
    let date = this.state.inputDate;
    let recordType = this.state.recordType;
    let baseAmount = this.state.inputAmount;
    let adjustAmount = this.state.inputAdjustAmount;
    let categoryId = 0;
    let subcategoryId = 0;
    let remark = this.state.inputRemark;

    this.state.userList.forEach((value, index) => {
      if (value.checked) {
        console.log("checked: " + value.checked);
        userIdObject = { userId: value.userId };
        userId = userId.concat(userIdObject);
      }
    });

    // Get categoryId
    for (let value of this.state.categoryList) {
      console.log(value.category_id);
      if (value.name === this.state.inputCategory) {
        categoryId = value.category_id;
        break;
      }
    }

    // Get subcategoryId
    for (let value of this.state.subcategoryList) {
      console.log(value.subcategory_id);
      if (value.name === this.state.inputSubcategory) {
        subcategoryId = value.subcategory_id;
        break;
      }
    }

    console.log(JSON.stringify(this.state.categoryList));
    console.log("subcategory: " + JSON.stringify(this.state.subcategoryList));

    console.log("userId: " + JSON.stringify(userId));
    console.log("date: " + date);
    console.log("recordType: " + recordType);
    console.log("baseAmount: " + baseAmount);
    console.log("adjustAmount: " + adjustAmount);
    console.log("categoryId: " + categoryId);
    console.log("subcategoryId: " + subcategoryId);
    console.log("remark: " + remark);

    if (userId.length == 0) {
      error = true;
      errMsg = "Empty user";
    }

    if (error) {
      this.setState({ failedModalShow: true, modalFailedErrMsg: errMsg });
    } else {
      axios
        .post(process.env.REACT_APP_API_POST_CREATE_RECORD, {
          date: date,
          userId: userId,
          type: recordType,
          baseAmount: baseAmount,
          adjustAmount: adjustAmount,
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          remark: remark,
        })
        .then((response) => {
          if (response.data.message === "success") {
            console.log("set successModalShow true");
            this.setState({ successModalShow: true });
          } else {
            console.log("set failedModalShow true");
            this.setState({ failedModalShow: true });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error.data);
          this.setState({ failedModalShow: true });
        });
    }
  };
  // API function end

  // Update state value
  btnClear = () => {
    console.log("click clear");
    this.setState({
      inputCategory: "",
      inputSubcategory: "",
      inputNote: "",
    });
  };

  switchRecordType = (type) => {
    console.log("type: " + type);
    if (this.state.recordType != type) {
      console.log("switch record type");
      this.setState({ recordType: type });
      this.apiGetCategoryList(type);
    }
  };

  updateUserListCheckbox = (name, checked) => {
    // Copy state
    let userList = [...this.state.userList];

    // Find index
    const index = userList.findIndex((value) => value.name == name);

    // Update value
    // {copy array object, key: new_value}
    userList[index] = { ...userList[index], checked: !checked };

    // Should use JSON.stringify() to print array object value in console.log
    console.log("eventUserName: " + JSON.stringify(userList));
    console.log("eventchecked: " + checked);

    this.setState({ userList: userList });
  };

  setInputDate = (event) => {
    console.log("eventDate: " + event.target.value);
    this.setState({ inputDate: event.target.value });
  };

  setInputAmount = (event) => {
    console.log("eventAmount: " + event.target.value);
    this.setState({ inputAmount: event.target.value });
  };

  setInputAdjustAmount = (event) => {
    console.log("eventAdjustAmount: " + event.target.value);
    this.setState({ inputAdjustAmount: event.target.value });
  };

  setInputSubcategory = (event) => {
    console.log("eventSubcategory: " + event.target.value);
    this.setState({ inputSubcategory: event.target.value });
  };

  setInputRemark = (event) => {
    console.log("eventRemark: " + event.target.value);
    this.setState({ inputRemark: event.target.value });
  };

  setInputPersonNum = (event) => {
    console.log("eventPersonNum: " + event.target.value);

    this.calculateBillPerPerson(event.target.value, "personNum");
  };

  setInputShareBill = (event) => {
    console.log("eventShareBill: " + event.target.value);

    this.calculateBillPerPerson(event.target.value, "shareBill");
  };

  setUserShareBillList = (event) => {
    console.log("setUserShareBillList: " + event.target.value);

    let num = event.target.value;
    let array = [];

    let object = {
      name: "",
      shareBill: 0,
      selfBill: 0,
      total: 0,
    };

    for (var i = 0; i < parseInt(num); i++) {
      console.log("while: " + i);
      array.push(object);
    }

    console.log(JSON.stringify(array));

    this.setState({ userShareBillList: array });
  };

  calculateBillPerPerson = (value, type) => {
    let shareBill = type === "shareBill" ? value : this.state.inputShareBill;
    let personNum = type === "personNum" ? value : this.state.inputPersonNum;

    let userShareBillList = [...this.state.userShareBillList];
    let shareBillArray = shareBill.trim().split(" ");
    let billPerPerson = 0;
    let totalShareBill = 0;

    console.log("calculateGrandTotal: " + shareBillArray);

    for (let value of shareBillArray) {
      totalShareBill = parseFloat(totalShareBill) + parseFloat(value);
    }

    billPerPerson = parseFloat(totalShareBill) / parseInt(personNum);
    console.log("billPerPerson: " + billPerPerson);

    // Redo the userShareBillList
    if (userShareBillList.length != personNum) {
      let object = {
        id: 0,
        name: "",
        billPerPerson: 0,
        selfBill: 0,
        total: 0,
      };

      if (userShareBillList.length > personNum) {
        userShareBillList.splice(-1, 1);
      }

      while (userShareBillList.length < personNum) {
        userShareBillList.push(object);
      }
    }

    for (var i = 0; i < parseInt(personNum); i++) {
      console.log("while: " + i);
    }

    // Replace shareBill to new billPerPerson
    for (let i = 0; i < userShareBillList.length; i++) {
      userShareBillList[i] = {
        ...userShareBillList[i],
        id: i,
        shareBill: billPerPerson,
      };
    }

    console.log(JSON.stringify(userShareBillList));

    this.setState({
      billPerPerson: billPerPerson,
      inputShareBill: shareBill,
      inputPersonNum: personNum,
      totalShareBill: totalShareBill,
      userShareBillList: userShareBillList,
    });
    console.log("totalShareBill: " + totalShareBill);
  };
  // Update state value end
}

export default RecordAdd;
