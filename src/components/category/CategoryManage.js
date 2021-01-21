import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import axios from "axios";

import { SuccessModal, FailedModal } from "../../layouts/modal/Modal";
import { SwitchRecType } from "../../layouts/switch/Switch";

class ExpensesType extends Component {
  state = {
    categoryList: [],
    subcategoryList: [],
    viewCategory: "",
    inputCategory: "",
    inputSubcategory: "",
    categoryType: "subcategory",
    successModalShow: false,
    failedModalShow: false,
    recordType: "expenses"
  };

  css = {
    containerStyle1: "border-2-gray rounded p-3",
    divStyle1: "py-2 px-3",
    inputStyle1: "width-100p",
    switchCatTypeActive: "text-center btn-blue py-1 border-2-blue rounded-pill",
    switchCatTypeNonactive: "text-center btn-white py-1 border-2-gray rounded-pill",
  } 

  componentDidMount() {
    this.apiGetCategoryList(this.state.recordType)
  }

  render() {
    return (
      <div>
        <br />
        <SuccessModal show={this.state.successModalShow} onHide={() => this.setState({successModalShow: false})} />

        <FailedModal show={this.state.failedModalShow} onHide={() => this.setState({failedModalShow: false})} />

        <SwitchRecType type={this.state.recordType} switchRecType={this.switchRecordType}/>

        <br />        
        <Container>
          <Row>
            {this.state.recordType === "expenses" ? 
              <h4>Expenses Category</h4> :
              <h4>Revenue Category</h4>}
          </Row>
        </Container>

        <Container className={this.css.containerStyle1}>
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
                {this.layoutCategoryDatalist()}                
              </datalist>
            </Col>
          </Row>
        
          {this.layoutSubcategoryDatalist()}
                    
        </Container>

        <br/>
        <Container>
          <Row>
            {this.state.recordType === "expenses" ? 
              <h4>Add Expenses Category</h4> :
              <h4>Add Revenue Category</h4>}
          </Row>
        </Container>

        <Container className={this.css.containerStyle1}>
          <Row>
            <Col sm={3} md={3} lg={3}>
              <div className={this.state.categoryType === "category" ?
               this.css.switchCatTypeActive : this.css.switchCatTypeNonactive} onClick={() => this.switchCategoryType("category")}>
                <span>Category</span>
              </div>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <div className={this.state.categoryType === "subcategory" ?
               this.css.switchCatTypeActive : this.css.switchCatTypeNonactive} onClick={() => this.switchCategoryType("subcategory")}>
                <span>Subcategory</span>
              </div>
            </Col>
          </Row>
         
          {this.state.categoryType === "subcategory" ? 
          this.layoutAddSubcategoryForm() : this.layoutAddCategoryForm()}
          
        </Container>
      </div>
    );
  }

  // layout function
  layoutAddCategoryForm = () => {
    return(
      <div>
        <Row>
          <Col className={this.css.divStyle1}>
            <input
              type="text"
              placeholder="Category"
              className={this.css.inputStyle1}
              onBlur={this.setInputCategory}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2} md={2} lg={3}>
            <input
              type="submit"
              className={this.css.inputStyle1}
              onClick={this.btnSubmit}
            />
          </Col>
        </Row>
      </div>
    )
  }

  layoutAddSubcategoryForm = () => {
    return(
      <div>
        <Row>
          <Col className={this.css.divStyle1}>
            <input
              type="text"
              list="category"
              placeholder="Category"
              className={this.css.inputStyle1}
              onBlur={this.setInputCategory}
            />
            <datalist id="category">
              {this.layoutCategoryDatalist()}
            </datalist>
          </Col>
        </Row>
        <Row>
          <Col className={this.css.divStyle1}>
            <input
              type="text"
              placeholder="Subcategory"
              className={this.css.inputStyle1}
              onBlur={this.setInputSubcategory}
            />    
          </Col>
        </Row>
        <Row>
          <Col sm={2} md={2} lg={3}>
            <input
              type="submit"
              className={this.css.inputStyle1}
              onClick={this.btnSubmit}
            />
          </Col>
        </Row>
      </div>
    )
  }

  layoutCategoryDatalist = () => {
    return this.state.categoryList.map((value, index) => (
      <option key={index} value={value.name}></option>
    ))
  };

  layoutSubcategoryDatalist = () => {
    return this.state.subcategoryList.map((value, index) => (
      <li key={index}>{value.name}</li>
    ));
  };
  // Layout function end

  // API function
  apiGetCategoryList = (type) => {
    
    console.log("type: " + type);
    axios
    .get(process.env.REACT_APP_API_GET_CATEGORY_LIST+ "?type=" + type)
    .then((response) => {

      if (response.data.message == "success") {
        this.setState({ categoryList: response.data.data });
      }
    });
  }

  apiGetSubcategoryList = (event) => {
    // GET expenses/revenue subcategory list
    console.log("eventCategory: " + event.target.value);
    let eventCategory = event.target.value;
    let type = this.state.recordType;

    if (eventCategory !== "" && this.state.viewCategory !== eventCategory) {
      this.setState({ viewCategory: eventCategory });

      let url = process.env.REACT_APP_API_GET_SUBCATEGORY_LIST + "?category=" + eventCategory + "&type=" + type
      console.log("URL: " + url);
      axios
      .get(url)
      .then((response) => {
  
        if (response.data.message === "success") {
          this.setState({ subcategoryList: response.data.data });
        }
      });
    }    
  };

  apiPostAddCategory = () => {
    // POST add new category Expenses/Revenue
    let category = this.state.inputCategory
    let type = this.state.recordType

    axios.post(process.env.REACT_APP_API_POST_CREATE_CATEGORY, {
      category: category,
      type: type
    })
    .then((response) => {
      if (response.data.message === "success") {
        console.log("set successModalShow true")
        this.setState({successModalShow: true})
      } else {
        console.log("set failedModalShow true")
        this.setState({failedModalShow: true})
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.data);
      this.setState({failedModalShow: true})
    });
  }

  apiPostAddSubcategory = () => {
    // POST expenses add new subcategory
    let category = this.state.inputCategory
    let subcategory = this.state.inputSubcategory
    let type = this.state.recordType

    axios.post(process.env.REACT_APP_API_POST_CREATE_SUBCATEGORY, {
      category: category,
      subcategory: subcategory,
      type: type,
    })
    .then((response) => {
      if (response.data.message === "success") {
        console.log("set successModalShow true")
        this.setState({successModalShow: true})
      } else {
        console.log("set failedModalShow true")
        this.setState({failedModalShow: true})
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({failedModalShow: true})
    });
  }
  // API function end

  switchRecordType = (type) => {
    console.log("type: " + type);
    if (this.state.recordType !== type) {
      console.log("switch record type");
      this.setState({ recordType: type});
      this.apiGetCategoryList(type)
    }
  }

  // Update state value
  btnSubmit = () => {
    console.log("btn submit click")
      if (this.state.categoryType === "category") {
        this.apiPostAddCategory()
      } else if (this.state.categoryType === "subcategory") {
        this.apiPostAddSubcategory()
      }
  };

  btnClearAll = () => {};

  switchCategoryType = (categoryType) => {
    console.log("switchCategoryType: " + categoryType);
    this.setState({ categoryType: categoryType });
  };

  setInputCategory = (event) => {
    console.log("inputCategory: " + event.target.value);
    this.setState({ inputCategory: event.target.value });
  };

  setInputSubcategory = (event) => {
    console.log("inputSubcategory: " + event.target.value);
    this.setState({ inputSubcategory: event.target.value });
  };
  // Update state value end
}

export default ExpensesType;
