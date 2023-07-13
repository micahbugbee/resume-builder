import React, { useContext } from 'react';
import '../css/Home.css';
import ResumeContext from './contexts/ResumeContext';
import {Button, Card, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Profile = () => {

    let { resumes } = useContext(ResumeContext);
    let lastResume = resumes.length - 1;
    let { identity, education, certification, jobs, skills } = resumes[lastResume];

    return (
        <div className='profile-card'>
            <Card className='mb-2' style={{ width: '36rem' }}>
                <Card.Body className='mb-0'>
                    <Card.Title style={{ color: 'gray' }} className='display-6 d-flex justify-content-center mb-3'>{identity.first} {identity.last} &#9989;</Card.Title>
                    <ListGroup className="list-group-flush"><strong>Contact Info</strong>
                        <ListGroup.Item>Email: {identity.email}</ListGroup.Item>
                        <ListGroup.Item>Phone: {identity.phone}</ListGroup.Item>
                        <ListGroup.Item>Address: {identity.address}</ListGroup.Item>
                    </ListGroup>
                    <hr></hr>
                    <ListGroup className="list-group-flush"><strong>Education</strong>
                        {education.map(education => {
                            return <ListGroup.Item>{education.school}, {education.degree}</ListGroup.Item>
                        })}
                    </ListGroup>
                    <hr></hr>
                    <ListGroup className="list-group-flush"><strong>Certification</strong>
                        {certification.map(certification => {
                            return <ListGroup.Item>{certification.certification}, {certification.provider}</ListGroup.Item>
                        })}
                    </ListGroup>
                    <hr></hr>
                    <ListGroup className="list-group-flush"><strong>Work Experience</strong>
                        {jobs.map(job => {
                            return <ListGroup.Item>{job.title}, {job.company}</ListGroup.Item>
                        })}
                    </ListGroup>
                    <hr></hr>
                    <ListGroup className="list-group-flush"><strong>Skills</strong>
                        {skills.map(skill => {
                            return <ListGroup.Item>{skill}</ListGroup.Item>
                        })}
                    </ListGroup>
                    <hr></hr>
                </Card.Body>
                <Card.Body className="m-0 d-flex justify-content-center align-items-center">
                    <Button variant="primary"><Link to="/builder" className="nav-link">Edit Your Resume</Link></Button>
                </Card.Body>
            </Card>
        </div>
      );
};

export default Profile;