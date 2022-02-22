import React, { Component } from "react";
import axios from "axios";
// import { useAsync } from "react-async";
import Constant from "../../global/Constant.json";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import * as Global from "../../global/GlobalUtil";
import * as GlobalAPI from "../../global/GlobalAPI";

import { SuccessModal, FailedModal } from "../../layouts/modal/Modal";

class Settlement extends Component {
  state = {
    recipeList: [],
    recipeTypeList: [],

    // default value
    searchForm: {
      recipeType: "",
    },

    modalCreateForm: {
      modalShow: false,
      recipe: {},
    },

    modalViewForm: {
      modalShow: false,
      recipeId: 0,
      editType: "",
      name: "",
    },

    modalEditForm: {
      modalShow: false,
      recipe: {},
    },

    modalDeleteForm: {
      modalShow: false,
      recipe: {},
    },

    successModalShow: false,
    failedModalShow: false,
  };

  componentDidMount() {
    this.apiGetRecipeList();
    this.apiGetRecipeTypeList();
  }

  render() {
    return (
      <div>
        <br />
        {/* Modal */}
        <SuccessModal
          show={this.state.successModalShow}
          onHide={() => this.setState({ successModalShow: false })}
        />
        <FailedModal
          show={this.state.failedModalShow}
          errMsg={this.state.modalFailedErrMsg}
          onHide={() => this.setState({ failedModalShow: false })}
        />

        {this.layoutModalView()}
        {this.layoutModalEdit()}
        {this.layoutModalDelete()}
        {this.layoutModalCreate()}

        <Container fluid className="">
          <Row>
            <Col sm="1" className="">
              <Form.Group controlId="">
                <Form.Control
                  size="sm"
                  type="text"
                  list="recipeType"
                  placeholder="Recipe Type"
                  value={this.state.searchForm.recipeType}
                  onChange={(event) =>
                    this.setSearchForm(Constant.recipeType, event.target.value)
                  }
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col sm="auto" className="px-1">
              <Button
                variant="primary"
                size="sm"
                onClick={() => this.apiGetRecipeList()}
              >
                Search
              </Button>
            </Col>

            <Col sm="auto" className="">
              <Button
                className="float-right"
                variant="primary"
                size="sm"
                onClick={() =>
                  this.setState({
                    modalCreateForm: {
                      ...this.state.modalCreateForm,
                      modalShow: true,
                    },
                  })
                }
              >
                Add New Recipe
              </Button>
            </Col>
          </Row>
        </Container>

        <br />

        <Container fluid className="">
          <Row xs={1} md={3} className="g-4">
            {this.state.recipeList.map((value, index) => (
              <Col>
                <Card
                  onClick={() =>
                    this.setState(
                      {
                        modalViewForm: {
                          ...this.state.modalViewForm,
                          modalShow: true,
                          recipe: value,
                        },
                      },
                      () =>
                        console.log(
                          "modalViewForm: " +
                            JSON.stringify(this.state.modalViewForm)
                        )
                    )
                  }
                >
                  <Image />
                  <Card.Img variant="top" fluid src={value.imgURL} />
                  <Card.Body>
                    <Card.Title>{value.name}</Card.Title>
                    <Card.Text>{value.description}</Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            ))}
          </Row>
        </Container>

        <datalist id="recipeType">
          {Global.getLayoutDatalist(this.state.recipeTypeList)}
        </datalist>
      </div>
    );
  }

  // Layout function
  layoutModalView = () => {
    if (this.state.modalViewForm.modalShow === true) {
      let recipe = this.state.modalViewForm.recipe;

      recipe = {
        ...recipe,
        recipeType: Global.getNameByIndex(
          this.state.recipeTypeList,
          recipe.recipeTypeId
        ),
      };

      console.log("Recipe: " + JSON.stringify(recipe));

      return (
        <Modal
          size="lg"
          backdrop="true"
          animation="true"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalViewForm.modalShow}
        >
          <Modal.Header>
            <Modal.Title className="text-center">{recipe.name}</Modal.Title>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              // className="text-secondary"
              onClick={() =>
                this.setState({
                  modalViewForm: {
                    ...this.state.modalViewForm,
                    modalShow: false,
                  },
                })
              }
            />
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Row>
              <Col>
                <Image fluid src={recipe.imgURL} />
              </Col>
            </Row>

            <Row>
              <Col>
                <span style={{ "white-space": "pre-line" }}>
                  {recipe.description}
                </span>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col>
                <h4>Ingredients</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <span style={{ "white-space": "pre-line" }}>
                  {recipe.ingredient}
                </span>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Cooking Instructions</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <span style={{ "white-space": "pre-line" }}>
                  {recipe.instruction}
                </span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  modalViewForm: {
                    ...this.state.modalViewForm,
                    modalShow: false,
                  },
                })
              }
            >
              Close
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  modalViewForm: {
                    ...this.state.modalViewForm,
                    modalShow: false,
                  },
                  modalEditForm: {
                    ...this.state.modalEditForm,
                    modalShow: true,
                    recipe: recipe,
                  },
                })
              }
            >
              Edit Recipe
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                this.setState({
                  modalDeleteForm: {
                    ...this.state.modalDeleteForm,
                    modalShow: true,
                    recipe: recipe,
                  },
                })
              }
            >
              Delete Recipe
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return <></>;
    }
  };

  layoutModalCreate = () => {
    if (this.state.modalCreateForm.modalShow === true) {
      let recipe = this.state.modalCreateForm.recipe;

      console.log("Recipe: " + JSON.stringify(recipe));

      return (
        <Modal
          size="lg"
          backdrop="true"
          animation="true"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalCreateForm.modalShow}
        >
          <Modal.Header>
            <Modal.Title className="text-center">Add New Recipe</Modal.Title>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              // className="text-secondary"
              onClick={() =>
                this.setState({
                  modalCreateForm: {
                    ...this.state.modalCreateForm,
                    modalShow: false,
                    recipe: {},
                  },
                })
              }
            />
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Row>
              <Col>
                <h4>Recipe Title</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Recipe Title"
                  value={recipe.name}
                  onChange={(event) =>
                    this.setModalCreateForm(Constant.name, event.target.value)
                  }
                ></Form.Control>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col>
                <h4>Image URL</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image fluid src={recipe.imgURL} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-15vh"
                  placeholder="Image URL"
                  value={recipe.imgURL}
                  onChange={(event) => {
                    this.setModalCreateForm(
                      Constant.imgURL,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Recipe Type</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  list="recipeType"
                  placeholder="Recipe Type"
                  value={recipe.recipeType}
                  onChange={(event) => {
                    this.setModalCreateForm(
                      Constant.recipeType,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Description</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-15vh"
                  placeholder="Description"
                  value={recipe.description}
                  onChange={(event) => {
                    this.setModalCreateForm(
                      Constant.description,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col>
                <h4>Ingredients</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-15vh"
                  placeholder="Ingredient"
                  value={recipe.ingredient}
                  onChange={(event) => {
                    this.setModalCreateForm(
                      Constant.ingredient,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Cooking Instructions</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-40vh"
                  placeholder="Instruction"
                  value={recipe.instruction}
                  onChange={(event) => {
                    this.setModalCreateForm(
                      Constant.instruction,
                      event.target.value
                    );
                  }}
                ></Form.Control>
                {/* <span style={{ "white-space": "pre-line" }}>
                  {recipe.instruction}
                </span> */}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  modalCreateForm: {
                    ...this.state.modalCreateForm,
                    modalShow: false,
                    recipe: {},
                  },
                })
              }
            >
              Cancel
            </Button>

            <Button variant="primary" onClick={() => this.apiPostRecipe()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return <></>;
    }
  };

  layoutModalEdit = () => {
    if (this.state.modalEditForm.modalShow === true) {
      let recipe = this.state.modalEditForm.recipe;

      console.log("Recipe: " + JSON.stringify(recipe));

      return (
        <Modal
          size="lg"
          backdrop="true"
          animation="true"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalEditForm.modalShow}
        >
          <Modal.Header>
            <Modal.Title className="text-center">Add New Recipe</Modal.Title>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              // className="text-secondary"
              onClick={() =>
                this.setState({
                  modalEditForm: {
                    ...this.state.modalEditForm,
                    modalShow: false,
                    recipe: {},
                  },
                })
              }
            />
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Row>
              <Col>
                <h4>Recipe Title</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Recipe Title"
                  value={recipe.name}
                  onChange={(event) =>
                    this.setModalEditForm(Constant.name, event.target.value)
                  }
                ></Form.Control>
              </Col>
            </Row>

            <hr />
            <Row>
              <Col>
                <h4>Image URL</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image fluid src={recipe.imgURL} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-15vh"
                  placeholder="Image URL"
                  value={recipe.imgURL}
                  onChange={(event) => {
                    this.setModalEditForm(Constant.imgURL, event.target.value);
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Recipe Type</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  list="recipeType"
                  placeholder="Recipe Type"
                  value={recipe.recipeType}
                  onChange={(event) => {
                    this.setModalEditForm(
                      Constant.recipeType,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Description</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-15vh"
                  placeholder="Description"
                  value={recipe.description}
                  onChange={(event) => {
                    this.setModalEditForm(
                      Constant.description,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col>
                <h4>Ingredients</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-15vh"
                  placeholder="Ingredient"
                  value={recipe.ingredient}
                  onChange={(event) => {
                    this.setModalEditForm(
                      Constant.ingredient,
                      event.target.value
                    );
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col>
                <h4>Cooking Instructions</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  // style={{ height: recipe.scrollHeight + "px" }}
                  className="height-40vh"
                  placeholder="Instruction"
                  value={recipe.instruction}
                  onChange={(event) => {
                    this.setModalEditForm(
                      Constant.instruction,
                      event.target.value
                    );
                  }}
                ></Form.Control>
                {/* <span style={{ "white-space": "pre-line" }}>
                  {recipe.instruction}
                </span> */}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  modalEditForm: {
                    ...this.state.modalEditForm,
                    modalShow: false,
                    recipe: {},
                  },
                })
              }
            >
              Cancel
            </Button>

            <Button variant="primary" onClick={() => this.apiPutRecipe()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return <></>;
    }
  };

  layoutModalDelete = () => {
    if (this.state.modalDeleteForm.modalShow === true) {
      let recipe = this.state.modalDeleteForm.recipe;

      console.log("Delete Recipe: " + JSON.stringify(recipe));

      return (
        <Modal
          size="sm"
          backdrop="true"
          animation="true"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalDeleteForm.modalShow}
        >
          <Modal.Header>
            <Modal.Title className="text-center">Delete Recipe</Modal.Title>
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              // className="text-secondary"
              onClick={() =>
                this.setState({
                  modalDeleteForm: {
                    ...this.state.modalDeleteForm,
                    modalShow: false,
                  },
                })
              }
            />
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Row>
              <Col>
                <p>Are you sure to delete?</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  modalDeleteForm: {
                    ...this.state.modalDeleteForm,
                    modalShow: false,
                  },
                })
              }
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={() => this.apiDeleteRecipe()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return <></>;
    }
  };

  // Layout function end

  // API function
  apiGetRecipeList = async () => {
    let searchForm = this.state.searchForm;
    let recipeTypeId = Global.getIndexByName(
      this.state.recipeTypeList,
      searchForm.recipeType
    );

    searchForm = { ...this.state.searchForm, recipeTypeId: recipeTypeId };

    if (recipeTypeId > 0) {
      await GlobalAPI.apiGetRecipeSearch(searchForm).then((response) => {
        this.setState({ recipeList: response._embedded.recipes });
      });
    } else {
      await GlobalAPI.apiGetRecipe().then((response) => {
        //console.log("recipeTypeList: " + JSON.stringify(response._embedded));

        this.setState({ recipeList: response._embedded.recipes }, () => {
          console.log("recipeList: " + JSON.stringify(this.state.recipeList));
        });
      });
    }
  };

  apiGetRecipeTypeList = async () => {
    await GlobalAPI.apiGetRecipeType().then((response) => {
      //console.log("recipeTypeList: " + JSON.stringify(response._embedded));

      this.setState({ recipeTypeList: response._embedded.recipeTypes }, () => {
        console.log(
          "recipeTypeList: " + JSON.stringify(this.state.recipeTypeList)
        );
      });
    });
  };

  apiPostRecipe = async () => {
    let error = false;
    let errMsg = "";

    let recipe = this.state.modalCreateForm.recipe;
    let url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_RECIPE;

    if (Global.isEmpty(recipe.name)) {
      error = true;
      errMsg = "Empty Recipe Title";
    } else if (Global.isEmpty(recipe.imgURL)) {
      error = true;
      errMsg = "Empty Image URL";
    } else if (recipe.recipeTypeId <= 0) {
      error = true;
      errMsg = "Empty Recipe Type";
    } else if (Global.isEmpty(recipe.description)) {
      error = true;
      errMsg = "Empty Description";
    } else if (Global.isEmpty(recipe.ingredient)) {
      error = true;
      errMsg = "Empty Ingredient";
    } else if (Global.isEmpty(recipe.instruction)) {
      error = true;
      errMsg = "Empty Instruction";
    }

    recipe = {
      ...recipe,
      recipeTypeId: Global.getIndexByName(
        this.state.recipeTypeList,
        recipe.recipeType
      ),
    };

    if (error) {
      this.setState({ failedModalShow: true, modalFailedErrMsg: errMsg });
    } else {
      axios
        .post(url, recipe, {
          headers: GlobalAPI.headers,
        })
        .then((response) => {
          this.apiGetRecipeList();
          this.setState(
            {
              modalCreateForm: {
                ...this.state.modalCreateForm,
                modalShow: false,
                recipe: {},
              },
              modalViewForm: {
                ...this.state.modalViewForm,
                modalShow: true,
                recipe: response.data,
              },
            },
            () => this.setState({ successModalShow: true })
          );
        })
        .catch((error) => {
          console.log(error);
          console.log(error.data);
          this.setState({ failedModalShow: true });
        });
    }
  };

  apiPutRecipe = async () => {
    let error = false;
    let errMsg = "";

    let recipe = this.state.modalEditForm.recipe;
    let url =
      process.env.REACT_APP_BASE_URL +
      process.env.REACT_APP_RECIPE +
      "/" +
      recipe.id;

    if (Global.isEmpty(recipe.name)) {
      error = true;
      errMsg = "Empty Recipe Title";
    } else if (Global.isEmpty(recipe.imgURL)) {
      error = true;
      errMsg = "Empty Image URL";
    } else if (recipe.recipeTypeId <= 0) {
      error = true;
      errMsg = "Empty Recipe Type";
    } else if (Global.isEmpty(recipe.description)) {
      error = true;
      errMsg = "Empty Description";
    } else if (Global.isEmpty(recipe.ingredient)) {
      error = true;
      errMsg = "Empty Ingredient";
    } else if (Global.isEmpty(recipe.instruction)) {
      error = true;
      errMsg = "Empty Instruction";
    }

    recipe = {
      ...recipe,
      recipeTypeId: Global.getIndexByName(
        this.state.recipeTypeList,
        recipe.recipeType
      ),
    };

    if (error) {
      this.setState({ failedModalShow: true, modalFailedErrMsg: errMsg });
    } else {
      //console.log("222 recipe: " + JSON.stringify(recipe));
      axios
        .put(url, recipe, {
          headers: GlobalAPI.headers,
        })
        .then((response) => {
          console.log("response: " + JSON.stringify(response));
          this.apiGetRecipeList();
          this.setState(
            {
              modalEditForm: {
                ...this.state.modalEditForm,
                modalShow: false,
              },

              modalViewForm: {
                ...this.state.modalViewForm,
                modalShow: true,
                recipe: response.data,
              },
            },
            () => this.setState({ successModalShow: true })
          );
        })
        .catch((error) => {
          console.log(error);
          console.log(error.data);
          this.setState({ failedModalShow: true });
        });
    }
  };

  apiDeleteRecipe = async () => {
    let error = false;
    let errMsg = "";

    let recipe = this.state.modalDeleteForm.recipe;

    let url =
      process.env.REACT_APP_BASE_URL +
      process.env.REACT_APP_RECIPE +
      "/" +
      recipe.id;

    if (error) {
      this.setState({ failedModalShow: true, modalFailedErrMsg: errMsg });
    } else {
      //console.log("222 recipe: " + JSON.stringify(recipe));
      axios
        .delete(url, recipe, {
          headers: GlobalAPI.headers,
        })
        .then((response) => {
          console.log("response: " + JSON.stringify(response));
          this.apiGetRecipeList();
          this.setState(
            {
              modalViewForm: {
                ...this.state.modalViewForm,
                modalShow: false,
                recipe: response.data,
              },

              modalDeleteForm: {
                ...this.state.modalDeleteForm,
                modalShow: false,
              },
            },
            () => this.setState({ successModalShow: true })
          );
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
  setSearchForm = (type, value) => {
    console.log("setSearchForm");
    console.log("type: " + type);
    console.log("value: " + value);

    this.setState(
      {
        searchForm: {
          ...this.state.searchForm,
          [type]: value,
        },
      },
      () => console.log("searchForm: " + JSON.stringify(this.state.searchForm))
    );
  };

  setModalEditForm = async (type, value) => {
    console.log("setModalEditForm");
    console.log("type: " + type);
    console.log("value: " + value);

    let recipe = { ...this.state.modalEditForm.recipe };

    let newRecipe = { ...recipe, [type]: value };

    this.setState(
      {
        modalEditForm: {
          ...this.state.modalEditForm,
          recipe: newRecipe,
        },
      },
      () => {
        console.log(
          "setModalEditForm: " + JSON.stringify(this.state.modalEditForm)
        );
        return true;
      }
    );
  };

  setModalCreateForm = async (type, value) => {
    console.log("setModalCreateForm");
    console.log("type: " + type);
    console.log("value: " + value);

    let recipe = { ...this.state.modalCreateForm.recipe };

    let newRecipe = { ...recipe, [type]: value };

    this.setState(
      {
        modalCreateForm: {
          ...this.state.modalCreateForm,
          recipe: newRecipe,
        },
      },
      () => {
        console.log(
          "setModalCreateForm: " + JSON.stringify(this.state.modalCreateForm)
        );
        return true;
      }
    );
  };

  // Update state value end
}

export default Settlement;
