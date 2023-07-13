import React from "react";
import {  Card, Row, Col, Form } from "react-bootstrap";


function BuilderIdentity(props) {
  /*
  "identity": {
    "first" : "",
    "last" : "",
    "address" : "",
    "title",
    "phone" : "",
    "email" : "",
    "portfoliosite" : "",
    "linkedin" : ""
  } */

  let identityState = props.identity
  //on field update, update state?
  
  function identityInfo(title){
    return <Card.Body>
        <Form.Group as={Row} className="mb-3" >
          <Col><Form.Text  sm={2}>{title}</Form.Text></Col>
          <Col sm={8}>
            <Form.Control name={title} defaultValue={identityState[title.toLowerCase()]}/>
          </Col>
        </Form.Group>
    </Card.Body>
  }

    return (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form onChange={e=>props.updateIdentity(e)} >
                  <Form.Group as={Row} className="mb-3" >
                    <Col><Form.Text  sm={2}>{"First Name"}</Form.Text></Col>
                    <Col sm={8}>
                      <Form.Control name="first" defaultValue={identityState.first} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" >
                    <Col><Form.Text  sm={2}>{"Last Name"}</Form.Text></Col>
                    <Col sm={8}>
                      <Form.Control name="last" defaultValue={identityState.last}/>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" >
                    <Col><Form.Text  sm={2}>{"Title"}</Form.Text></Col>
                    <Col sm={8}>
                      <Form.Control name="title" defaultValue={identityState.title}/>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Form onChange={e=>props.updateIdentity(e)}><Card>{identityInfo("Address")}</Card>
            <Card>{identityInfo("Phone")}</Card>
            <Card>{identityInfo("Email")}</Card>
            <Card>{identityInfo("LinkedIn")}</Card></Form>
          </Col>
        </Row>
    )
}

export default BuilderIdentity;

/**
 <ListGroup>
            <ListGroupItem>{identityInfo("Address")}</ListGroupItem>
            <ListGroupItem>{identityInfo("Phone")}</ListGroupItem>
            <ListGroupItem>{identityInfo("Email")}</ListGroupItem>
            <ListGroupItem>{identityInfo("LinkedIn")}</ListGroupItem>
          </ListGroup>
 */