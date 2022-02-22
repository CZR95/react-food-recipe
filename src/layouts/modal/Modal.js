import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

export const ModalCenter = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const SuccessModal = (props) => {
  // <SuccessModal
  // show={this.state.successModalShow}
  // onHide={() => this.setState({ successModalShow: false })}
  // />
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="show-grid">
        <Container fluid className="text-center m-2">
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="3x"
                className="mb-3 text-success"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Success</h4>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <p>Added Successful</p>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <Button
                variant="success"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export const FailedModal = (props) => {
  // <FailedModal
  // show={this.state.failedModalShow}
  // onHide={() => this.setState({ failedModalShow: false })}
  // />
  let errMsg = props.errMsg == null ? "" : props.errMsg;

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="show-grid">
        <Container fluid className="text-center m-2">
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="3x"
                className="mb-3 text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Failed</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{errMsg}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="danger"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export const EditRecordModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="show-grid">
        <Container fluid className="text-center m-2">
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faEdit}
                size="2x"
                className="mb-3 text-primary"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Update Record</h4>
            </Col>
          </Row>
          <hr />
          <Form className="font-weight-bold text-right">
            <Form.Group as={Row} controlId="formPlaintextId">
              <Form.Label column sm="4">
                ID
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  value={props.value.record_id}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextDate">
              <Form.Label column sm="4">
                Date
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="date"
                  placeholder="Date"
                  defaultValue={props.value.date}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextBaseAmount">
              <Form.Label column sm="4">
                Base Amount
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  placeholder="Base Amount"
                  defaultValue={props.value.base_amount}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextAdjustAmount">
              <Form.Label column sm="4">
                Adjust Amount
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  placeholder="Adjust Amount"
                  defaultValue={props.value.adjust_amount}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextCategory">
              <Form.Label column sm="4">
                Category
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="Category"
                  defaultValue={props.value.category}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextSubcategory">
              <Form.Label column sm="4">
                Subcategory
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="Subcategory"
                  defaultValue={props.value.subcategory}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextRemark">
              <Form.Label column sm="4">
                Remark
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="Remark"
                  defaultValue={props.value.remark}
                />
              </Col>
            </Form.Group>
          </Form>
          <br />
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Update
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export const DeleteRecordModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="show-grid">
        <Container fluid className="text-center m-2">
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="2x"
                className="mb-3 text-danger"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Delete</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Are you sure want to delete this item?</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export const ConfirmModal = (props) => {
  // <SuccessModal
  // show={this.state.successModalShow}
  // onHide={() => this.setState({ successModalShow: false })}
  // />

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header> */}

      <Modal.Body className="show-grid">
        <Container fluid className="text-center m-2">
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faTasks}
                size="2x"
                className="mb-3 text-warning"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Confirmation</h4>
            </Col>
          </Row>
          <hr />
          {/* Body */}
          <Form.Group as={Row} controlId="formPlaintextDate">
            <Form.Label column sm="4">
              Date
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="date"
                placeholder="Date"
                readOnly
                defaultValue={props.date}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextCategory">
            <Form.Label column sm="4">
              Category
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Category"
                readOnly
                defaultValue={props.category}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextSubcategory">
            <Form.Label column sm="4">
              Subcategory
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Subcategory"
                readOnly
                defaultValue={props.subcategory}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextRemark">
            <Form.Label column sm="4">
              Remark
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Remark"
                readOnly
                defaultValue={props.remark}
              />
            </Col>
          </Form.Group>
          <Form.Row className="text-center mb-2 ">
            <Col>
              <span>Name</span>
            </Col>
            <Col>
              <span>Share Amount</span>
            </Col>
            <Col>
              <span>Amount</span>
            </Col>
            <Col>
              <span>Adjust</span>
            </Col>
            <Col>
              <span>Total</span>
            </Col>
          </Form.Row>

          {props.data.map((value, index) => (
            <Form.Row className="text-center py-1">
              <Col>
                <p>{value.name}</p>
              </Col>
              <Col>
                <p>{value.shareBill}</p>
              </Col>
              <Col>
                <p>{value.amount}</p>
              </Col>
              <Col>
                <p>{value.adjust}</p>
              </Col>
              <Col>
                <p>{value.total}</p>
              </Col>
            </Form.Row>
          ))}

          {/* {props.data.map((value, index) => (
            <Form.Row className="text-center py-1">
              <Col>
                <p>{value.name}</p>
              </Col>
              <Col>
                <p>{parseFloat(value.shareBill) + parseFloat(value.amount)}</p>
              </Col>
              <Col>
                <p>{value.adjust}</p>
              </Col>
              <Col>
                <p>{value.total}</p>
              </Col>
            </Form.Row>
          ))} */}
          <hr />

          {/* Button */}
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={props.onHide}
                className="rounded-pill width-100p"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                onClick={props.actionSubmit}
                className="rounded-pill width-100p"
              >
                <span className={"text-white"}>Submit</span>
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
