import React from 'react';
import '../css/Home.css';

const Home = () => {

    return (
        <div>
            <h1>Resume Builder</h1>
            <div className='home-container'>
                <div className='home-text'>
                    <p>Resume Builder helps match the skills on your resume to jobs you are applying for. With the help of ChatGPT's OpenAI API, Resume Builder will transform your resume in seconds!   </p>
                    <ol>
                        <li>Visit the <em>Builder Page</em> and enter your resume information.</li>
                        <li>Find a posting for a job you want, and paste the job description into the <em>Generate Page.</em></li>
                        <li>Your resume will automatically be rewritten to match the job description. Edit and save your new resume in seconds!</li>
                    </ol>
                </div>
                <img className='home-img' alt='clipboard with resume list' src='resumePhoto.jpg'></img>
            </div>
        </div>
    );
};

export default Home;