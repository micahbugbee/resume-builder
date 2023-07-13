
import React, { useContext, useState,useEffect } from "react";
import {  Card, Form, Button, CardGroup, Row } from "react-bootstrap";
import Data from "./testObj/obj.json"
import Printable from "./generatorComponents/Printable";
import ResumeContext from "./contexts/ResumeContext";
import { FaSpinner } from 'react-icons/fa';

import { PDFDownloadLink } from '@react-pdf/renderer';

function Generator(){
  let { resumes, apiCall } = useContext(ResumeContext);

  //let testResume = Data.example
  //print resume should be Data.empty
  const [printResume, setPrintResume] = useState(Data.empty)
  const [runUse, setRunUse] = useState(true)
  //const [showLoading, setShowLoading] = useState(false)

  //testing uncomment later
  
  useEffect(() => {
    if (runUse){
      if (resumes.length > 0 ){
        let genRes = {
          "identity": resumes[0].identity,
          "skills": resumes[0].skills,
          "jobs" : resumes[0].jobs,
          "projects" : resumes[0].project,
          "educations" :  resumes[0].education,
          "certifications" : resumes[0].certification
        }
        //console.log("genres",genRes)
        setPrintResume(genRes)
        setRunUse(false)
      }
    }
  })

  //ayyyy sync
  function promptWrapper(e){
    e.preventDefault()
    proompt(e)
  }
  async function proompt(e){
    //setShowLoading(true)
    await apiCall(printResume, e.target[0].value)
      .then((response) => {

        console.log(response.text)
        let jres = JSON.parse(response.text)
        let res = {
          "identity": printResume.identity,
          "skills": jres.skills,
          "jobs" : jres.jobs,
          "projects" : jres.projects,
          "educations" :  jres.educations,
          "certifications" : jres.certifications
        }
        setPrintResume(res)
        //setShowLoading(false)
      })
  }
//<FaSpinner />
  return (
    <div>
      <CardGroup>
        <Row style={{width : "100%"}}><Card className="mb-3" >
          <Form  onSubmit={(e) => promptWrapper(e)}>
            <Form.Group  style={{width : "100%"}}className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Application information</Form.Label>
              <Form.Control name="application" as="textarea" rows={5} placeholder="Paste the job application here"/>
              <Button  type="submit">Generate</Button>
            </Form.Group>
          </Form>
        </Card></Row>
        
        <Row style={{width : "100%"}}><Card className="mb-3"><Printable
        resume={printResume}/></Card></Row>
      </CardGroup>
     
    </div>
  )
}

export default Generator

/*
 <PDFDownloadLink document={<Printable resume={printResume}/>} fileName="resume.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink> */