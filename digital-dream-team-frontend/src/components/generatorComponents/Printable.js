

import React from "react";
import {Button } from "react-bootstrap";
//import "../../css/Printable.css"
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Printable(props){
  let resume = props.resume
  let identity = resume.identity
  let skills = resume.skills
  let jobs = resume.jobs
  let projects = resume.projects
  let educations = resume.educations
  let certs = resume.certifications
  let pStyle = { fontWeight:"bold"}
  let letter = [612,791]


  //test 
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  
  function printDocument() {
    let doc = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: 'letter',
      hotfixes: ['px_scaling']
    });
    var htmlElement = document.getElementById('divToPrint');
    var newWindow = window.open();
    //console.log(htmlElement)

    newWindow.document.write(htmlElement.outerHTML);
    
    
  }

  function printHTML(e){
    printDocument()
    e.preventDefault()
  }


  function myHeader(){
    return (
    <div style={{textAlign: "center"}}>
      <div>{identity.first} {identity.last}</div>
      <div>{identity.title}</div>
      <div> {identity.email} | {identity.phone} | {identity.linkedin}</div>
    </div>)
  }
  function mapSkills(){
    return skills.map(skill => {
      return(<li style={{display: "inline"}}> | {skill}</li>
      )
    })
  }
  function mapJobs(){
    return jobs.map(job => {
      return(
        <div>
          <div>
            {job.title} | {job.company}
            <div>
              {job.startdate} {job.enddate}
            </div>
          </div>
          <ul>{mapBullets(job)}</ul>
        </div>
      )
    })
  }
  function mapProjects(){
    return projects.map(proj => {
      return(
        <div>
          <div>
            {proj.title} 
            <div>
              {proj.startdate} {proj.enddate}
            </div>
          </div>
          <ul>{mapBullets(proj)}</ul>
        </div>
      )
    })
  }
  function mapEducation(){
    return educations.map(edu =>{
      return (
        <div>
          {edu.degree} {edu.school} {edu.date}
        </div>
      )
    })
  }
  function mapCertifications(){
    return certs.map(c =>{
      return (
        <div>
          {c.certification} {c.provider} {c.date}
        </div>
      )
    })
  }

  function mapBullets(item){
    return item.accomplishments.map(accom =>{
      return( <li>{accom}</li>)
    })
  }
  return (
   <div >
    <Button onClick={(e) => printHTML(e)}>Print</Button>
    <div id="divToPrint" >
     <div contentEditable="true">
      {myHeader()}
      <p style={pStyle}>Skills</p>
      <ul >{mapSkills()}</ul>
      <p style={pStyle}>Professional Experience</p>
      <div>{mapJobs()}</div>
      <p style={pStyle}>Technical Experience</p>
      <div>{mapProjects()}</div>
      <p style={pStyle}>Education</p>
      <div>{mapEducation()}</div>
      <p style={pStyle}>Certifications</p>
      <div>{mapCertifications()}</div>
    </div>
   </div>
   </div>
  )
}

export default Printable

/*<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{myHeader()}</Text>
      </View>
      <View style={styles.section}>
        <Text><ul >{mapSkills()}</ul></Text>
      </View>
      <View style={styles.section}>
        <Text>{mapJobs()}</Text>
      </View>
      <View style={styles.section}>
        <Text>{mapProjects()}</Text>
      </View>
      <View style={styles.section}>
        <Text>{mapEducation()}</Text>
      </View>
      <View style={styles.section}>
        <Text>{mapCertifications()}</Text>
      </View>
    </Page>
  </Document> */