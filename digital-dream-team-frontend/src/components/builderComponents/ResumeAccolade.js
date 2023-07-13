import React, {useReducer} from "react";
import { Form,Button, ListGroup, ListGroupItem, Col, Row, InputGroup } from "react-bootstrap";


function ResumeAccolade(props) {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  let accolades = props.accolades
  let bigA = props.which.a.charAt(0).toUpperCase()+ props.which.a.slice(1)
  let bigB = props.which.b.charAt(0).toUpperCase()+ props.which.b.slice(1)


  function removeAccolade(e, item, type){
    let indexAcc = accolades.findIndex(function(acc){
      return acc === item
    })
    
    let temp = accolades.splice(indexAcc, 1)

    props.removeItem(temp,type)
    e.preventDefault()
    e.target.reset()
    forceUpdate()
  }

  function listAccolades(){
    return accolades.map((accolade, index) =>{
      let a = ((accolade.certification !== undefined) ? accolade.certification : accolade.school)
      let b = ((accolade.certification !== undefined) ? accolade.provider : accolade.degree)
      return (<ListGroupItem>
        <Form onSubmit={(e, accolade) => removeAccolade(e, accolade, props.which.type)} onChange={(e) => props.updateAccolades(e, index, props.which.type)} >
          <Row>
            <InputGroup>
            <Col><Form.Control placeholder={bigA}  type="text" defaultValue={a} name={props.which.a}/></Col>
          <Col><Form.Control placeholder={bigB}  type="text" defaultValue={b} name={props.which.b}/></Col>
          <Col md={3}><Form.Control  placeholder="date acquired"  defaultValue={accolade.date} type="text" name="date"/></Col>
          <Button type="submit">-</Button>
          </InputGroup>
          
          </Row>
          
          </Form>
        </ListGroupItem>)
    })
  }

  return (
      <div>
        <ListGroup>
        {listAccolades()}
        </ListGroup>
    </div>
  )
}

export default ResumeAccolade;