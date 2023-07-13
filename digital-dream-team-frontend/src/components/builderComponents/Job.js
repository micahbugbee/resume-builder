import React, {useReducer, useState} from "react";
import {Form,Row, Container, ListGroup, ListGroupItem, Col, Button, InputGroup } from "react-bootstrap";


function Job(props){

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


  let Jobs = props.item

  function removeJob(e, item, type){
    let indexAcc = Jobs.findIndex(function(acc){
      return acc === item
    })
    
    let temp = Jobs.splice(indexAcc, 1)

    props.removeItem(temp,type)
    e.preventDefault()
    e.target.reset()
    forceUpdate()
  }

  //map each individual project/job with it's accomplishments, add a blank acomplishment to bottom
  function jobsAndAccomps(){
    return Jobs.map((jp, index) => {

      return (<Container>
        <ListGroup>
          <ListGroupItem >
            <Form onSubmit={(e, jp) => removeJob(e, jp, "jobs")} onChange={(e)=>props.updateJob(e, index)}>
              <Row>
                <InputGroup>
                  <Col md={4}><Form.Control placeholder="title" defaultValue={jp.title} name="title"/></Col>
                  <Col md={3}><Form.Control placeholder="Company"defaultValue={jp.company} name="company"/></Col>
                  <Col md={2}><Form.Control placeholder="Start"defaultValue={jp.startdate} name="startdate"/></Col>
                  <Col md={2}><Form.Control placeholder="End" defaultValue={jp.enddate} name="enddate"/></Col>
                  <Button type="submit">-</Button>
                 </InputGroup>
              </Row>
            </Form>
          </ListGroupItem>
        </ListGroup>

        {bullets(jp)}

        <Row><Col sm={{span:8, offset:4}}>
          <Form onSubmit={(e) => addAccomplishment(e, jp)}>
            <InputGroup>
              <Form.Control placeholder="Accomplishments" name="accomplishment"/>
              <Button type="submit">+</Button>
            </InputGroup>
          </Form>
        </Col></Row>
      </Container>)
    })
  }
  function bullets(jp){
    if (!jp.accomplishments) {
      return <></>
    }
    let accom = jp.accomplishments
    return accom.map(bullet =>{
      return (
        <Row><Col sm={{span:8, offset:4}}>
            <Form onSubmit={(e, bullet) => removeAcc(e, bullet, jp)}>
              <InputGroup>
                <Form.Control defaultValue={bullet} name="accomplishment"/>
                <Button type="submit">-</Button>
              </InputGroup>
            </Form>
        </Col></Row> 
      )
    })
  }

  //find index of job, add new accom to accom array, 
  //then replace existing job in Jobs array, then push whole thing and replace it in the state
  function addAccomplishment(e, jp){

    if (jp.accomplishments === undefined){
      jp.accomplishments = []
    }
    
    jp.accomplishments.push(e.target[0].value)//cannot read properties of undefines
    let temp = Jobs

    let index = temp.findIndex(function(job){
      return job.title === jp.title
    })
    temp[index] = jp
    //setJob(temp)
    props.updateAccomJob(temp)

    e.preventDefault()
    e.target.reset()
    forceUpdate()
  }

  function removeAcc(e, accom, jp){

    let indexAcc = jp.accomplishment.findIndex(function(acc){
      return acc === accom
    })
    jp.accomplishment.splice(indexAcc, 1)
    let temp = Jobs

    let index = temp.findIndex(function(job){
      return job.title === jp.title
    })

    temp[index] = jp
    props.updateAccomJob(temp)
    e.preventDefault()
    e.target.reset()
    forceUpdate()

  }

  return (
      <div>
        {jobsAndAccomps()}
    </div>
  )
}

export default Job