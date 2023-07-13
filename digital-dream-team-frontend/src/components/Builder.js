import React, { useState, useContext, useEffect, useReducer } from "react";
import { Row, ListGroup, ListGroupItem, Card, Form, Button, Col, CardGroup, Modal, Container } from "react-bootstrap";
import BuilderIdentity from "./builderComponents/BuilderIdentity";
import Data from "./testObj/obj.json";
import ResumeAccolade from "./builderComponents/ResumeAccolade";
import Project from "./builderComponents/Project";
import Job from "./builderComponents/Job";
import ResumeContext from "./contexts/ResumeContext";
import { useNavigate } from "react-router-dom";


function Builder() {
  //builder output struct
  let temp_output = Data.empty

  const navigate = useNavigate();
  //issue probably here in temp output
  const [builderInfo, setBuilderInfo] = useState(temp_output)
  const [runUse, setRunUse] = useState(true)
  const[useEdit, setUseEdit] = useState(false)
  let { addResume, editResume, resumes } = useContext(ResumeContext);

  //show error
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //update from data in useEffect
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (runUse){
      if (resumes.length > 0 ){
        let resume = resumes[0]

        let identity = resume.identity
        let skills = resume.skills
        let jobs = resume.jobs
        let educations = resume.education    
        let projects = resume.project
        let certs = resume.certification
        let res = {
          "identity": identity,
          "skills" : skills,
          "jobs" : jobs,
          "projects" : projects,
          "educations" : educations,
          "certifications" : certs,
          "_id" : resume._id
        }
        console.log("res", res)

        setBuilderInfo(res)
        setUseEdit(true)
        setRunUse(false)
      }
    }
  },[runUse, resumes])



  //first enter does not add anything
  function setSkills(e) {
    e.preventDefault()//prevent double input
    const formData = new FormData(e.target),
                formDataObj = Object.fromEntries(formData.entries())
    //console.log(builderInfo.skills)

    //may consolidate all setBuilders into one function call
    setBuilderInfo(
      builderInfo =>{
        return {
             ...builderInfo,
             skills : [...builderInfo.skills, formDataObj.skill]
        }
     }
    )
    //console.log(builderInfo.skills)
    e.target.reset();
  }

  function mapSkills(){
    if (!builderInfo.skills) {
      return <></>
    }
    //console.log(builderInfo)
    return builderInfo.skills.map((skill) => {
      return <ListGroupItem><Card><Button>X {skill}</Button></Card></ListGroupItem>
    })
  }


  function setIdentity(e){
    let mkey = e.target.name.toLowerCase()
    let val = e.target.value
    let tempIdentity = builderInfo.identity
    tempIdentity[mkey] = val
    setBuilderInfo(
      builderInfo => {
        return {
             ...builderInfo,
            identity : tempIdentity
        }
     }
    )
    //console.log(builderInfo)
  }


  function updateJob(e, index){
    //update specific one
    let temp = builderInfo.jobs[index]
    temp[e.target.name] = e.target.value
    
    //replace it in jobs
    let jobsTemp = builderInfo.jobs
    jobsTemp[index] = temp

    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            jobs : jobsTemp
        }
      }
    )


  }

  function updateProject(e, index){
    //update which
    let temp = builderInfo.projects[index]
    temp[e.target.name] = e.target.value

    //replace it in proj
    let projTemp = builderInfo.projects
    projTemp[index] = temp
 
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            projects : projTemp
        }
      }
    )
  }
  
  function updateAccomJob(temp){
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            jobs : temp
        }
      }
    )
  }
  function updateAccomProj(temp){
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            projects : temp
        }
      }
    )
  }

  function updateAccolades(e,index, data){
    let mkey = e.target.name.toLowerCase()
    let val = e.target.value
    let temp = builderInfo[data][index]//its like builderinfo.certifications
      //data form of a cert : {cert, provider, date}
    
    temp[mkey] = val //sets individual texts


    setBuilderInfo(
      builderInfo => {
        return {
             ...builderInfo,
            data : temp
        }
     }
    )
    //console.log(builderInfo)
  }

  function newJob(e){
    let temp = builderInfo.jobs
    temp.push({
      "title" : "",
      "company": "",
      "startdate" : "",
      "enddate" : "",
      "accomplishments" : []
    })
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            jobs : temp
        }
      }
    )
    e.preventDefault()

  }
  function newProject(e){
    let temp = builderInfo.projects
    temp.push({
      "title" : "",
      "startdate" : "",
      "enddate" : "",
      "accomplishments" : []
    })
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            projects : temp
        }
      }
    )
    e.preventDefault()
  }

  function newEducation(e){
    let temp = builderInfo.educations

    temp.push({
      "school": "",
      "degree" : "",
      "date" : ""
    })
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            educations : temp
        }
      }
    )
    e.preventDefault()
  }

  function removeItem(array, type){
    let temp = builderInfo
    temp[type] = array
    setBuilderInfo(temp
    )
  }

  function newCertification(e){
    let temp = builderInfo.certifications
    temp.push({
      "certification" : "",
      "provider" : "",
      "date" : ""
    })
    setBuilderInfo(
      builderInfo => {
        return {
              ...builderInfo,
            certifications : temp
        }
      }
    )
    e.preventDefault()
  }
  function outputResume(e){

    if (useEdit){
      console.log("output build from edit",builderInfo)
      
      editResume(builderInfo).then(response => {
        if (response) {
          navigate("/generator")
        } else{
          setShow(true)
        }
      })
      e.preventDefault()
    } else{
      addResume(builderInfo).then(response => {
        if (response) {
          navigate("/generator")
        } else{
          setShow(true)
        }
      })
    }
    e.preventDefault()

    
  }

  return (
      <div>
        <style type="text/css">
          {`
          .list-group-item-container {
            background-color: #D9D9D9;
          }
          `}
      </style>
        <ListGroup>
          <ListGroupItem variant="container">
            <BuilderIdentity identity={builderInfo.identity}
                              updateIdentity={setIdentity} />
          </ListGroupItem>

          <ListGroupItem variant="container">

              <Row><Col sm={3}>
                <Form onSubmit={(e) => setSkills(e)}><Form.Label>Skills</Form.Label><Form.Control placeholder="Enter skills here"  type="text" name="skill"/></Form>
              </Col></Row>
              <CardGroup>{mapSkills()}</CardGroup>
          </ListGroupItem>

          <ListGroupItem variant="container">
            <Button className="m-2" onClick={(e) => newJob(e)}>+ Job</Button>
            <Job item={builderInfo.jobs}
                        updateAccomJob={updateAccomJob}
                        updateJob={updateJob} 
                        removeItem={removeItem}/>
          </ListGroupItem>
          <ListGroupItem variant="container">
            <Button className="m-2" onClick={(e) => newProject(e)}>+ Project</Button>
            <Project item={builderInfo.projects}
                        updateAccomProj={updateAccomProj}
                        updateProject={updateProject} 
                        removeItem={removeItem}/>
          </ListGroupItem>

          <ListGroupItem variant="container">
            <Button className="m-2" onClick={(e) =>newEducation(e)}>+ Education</Button>
            <ResumeAccolade accolades={builderInfo.educations}
              which={{a: "school", b: "degree", type: "educations"}}
              updateAccolades={updateAccolades}
              removeItem={removeItem}
            />
          </ListGroupItem>
          <ListGroupItem variant="container">
            <Button className="m-2" onClick={(e) => newCertification(e)}>+ Certifications</Button>
            <ResumeAccolade accolades={builderInfo.certifications}
              which={{a: "certification", b: "provider", type: "certifications"}}
              updateAccolades={updateAccolades}
              removeItem={removeItem}
            />
          </ListGroupItem>
        </ListGroup>
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Missing Fields in Resume</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please fill out as much as you can
            </Modal.Body>
          </Modal>
          </>
          <Container className='d-flex justify-content-center'>
          <Button size="lg" className="mt-2 mb-4" onClick={(e) => outputResume(e)}>Submit</Button>
          </Container>
      </div>
  )
}

export default Builder;