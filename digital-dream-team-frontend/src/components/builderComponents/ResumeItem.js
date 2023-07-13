import React, {useState} from "react";
import {Form,Row, Container,  ListGroup, ListGroupItem,  Col, Button, InputGroup } from "react-bootstrap";


function ResumeItem(props) {

  let [jobProj, setJobProj] = useState(props.item)

  //map each individual project/job with it's accomplishments, add a blank acomplishment to bottom
  function jobsAndAccomps(){
    if(!jobProj){
      return <></>
    }
    return jobProj.map(jp => {

      <Container>
        <ListGroup>
          <ListGroupItem >
            <Form onChange={(e)=>props.updateJobProj(e, props.which)}>
              <Row>
                <Col md={5}><Form.Control placeholder="title" defaultValue={jp.title} name="title"/></Col>
                {props.which === "jobs" && <Col md={3}><Form.Control placeholder="Company"defaultValue={jp.company} name="company"/></Col>}
                <Col md={2}><Form.Control placeholder="Start"defaultValue={jp.start} name="startdate"/></Col>
                <Col md={2}><Form.Control placeholder="End" defaultValue={jp.end} name="enddate"/></Col>
              </Row>
            </Form>
          </ListGroupItem>
        </ListGroup>

        {bullets(jp)}

        <Row><Col sm={{span:8, offset:4}}>
          <Form onSubmit={(e) => addAccomplishment(e, jp, props.which)}>
            <InputGroup>
              <Form.Control placeholder="Accomplishments" name="accomplishment"/>
              <Button type="submit">+</Button>
            </InputGroup>
          </Form>
        </Col></Row>
      </Container>
    })
  }
  function bullets(jp){
    
    if (!jp.accomplishment) {
      return <></>
    }
    let accom = jp.accomplishment
    return accom.map(bullet =>{
      return (
        <Row><Col sm={{span:8, offset:4}}>
            <Form onSubmit={(e) => removeAcc(e, props.which)}>
              <InputGroup>
                <Form.Control defaultValue={bullet} name="accomplishment"/>
                <Button type="submit">-</Button>
              </InputGroup>
            </Form>
        </Col></Row> 
      )
    })
  }

  function addAccomplishment(e, parent, which){
    props.updateAccomplishments(e, which)
    if (bullets === undefined){
      //setBullets([e.target[0].value])
    }else{
      //setBullets([...bullets, e.target[0].value])
    }
    e.preventDefault()
    e.target.reset()
  }

  function removeAcc(e, which){
    props.removeAccomplishment(e, which)
    if (bullets.length() === 1){
      //setBullets([])
    }else{
      let index = bullets.indexOf(e.target[0].value)//should get text in form control
      if (index !== -1){
        //let temp = bullets.splice(index,1)
        //setBullets(temp)
      }
    }
    e.preventDefault()
    e.target.reset()
  }

  return (
      <div>
        {jobsAndAccomps()}
        <ListGroup>
          <ListGroupItem >
            <Form onChange={(e)=>props.updateJobProj(e, props.which)}>
              <Row>
                <Col md={5}><Form.Control placeholder="title" name="title"/></Col>
                {props.which === "jobs" && <Col md={3}><Form.Control placeholder="Company" name="company"/></Col>}
                <Col md={2}><Form.Control placeholder="Start" name="startdate"/></Col>
                <Col md={2}><Form.Control placeholder="End" name="enddate"/></Col>
              </Row>
            </Form>
            </ListGroupItem>
        </ListGroup>
        <Row><Col sm={{span:8, offset:4}}>
          <Form onSubmit={(e) => addAccomplishment(e, {"":""}, props.which)}>
            <InputGroup>
              <Form.Control placeholder="Accomplishments" name="accomplishment"/>
              <Button type="submit">+</Button>
            </InputGroup>
          </Form>
        </Col></Row>
    </div>
  )
}

export default ResumeItem;