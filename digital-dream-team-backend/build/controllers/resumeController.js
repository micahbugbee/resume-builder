"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCall = exports.deleteResume = exports.editResume = exports.addResume = exports.getOneResume = exports.getAllResumes = void 0;
const resume_1 = require("../models/resume");
const auth_1 = require("../services/auth");
const openai_1 = require("openai");
const getAllResumes = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let resumeList = await resume_1.Resume.find({ userId: user.id }).exec();
    res.status(200).json(resumeList);
};
exports.getAllResumes = getAllResumes;
const getOneResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let resume = await resume_1.Resume.findById(itemId);
    res.status(200).json(resume);
};
exports.getOneResume = getOneResume;
//working
const addResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    //req.body is blank on first go around
    let identity = req.body.identity; //obj
    let skills = req.body.skills; //array
    let jobs = req.body.jobs; //[obj]
    let projects = req.body.projects; //[obj]
    let educations = req.body.educations; //[obj]
    let certs = req.body.certifications; //[obj]
    const newResume = new resume_1.Resume({
        identity: identity,
        skills: skills,
        jobs: jobs,
        project: projects,
        education: educations,
        certification: certs,
        userId: user.id,
    });
    try {
        await newResume.save();
        res.status(201).json(newResume);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
exports.addResume = addResume;
const editResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    const updatedResume = new resume_1.Resume({
        // Add resume model data
        _id: itemId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills,
        job: req.body.jobs,
        project: req.body.projects,
        education: req.body.educations,
        certification: req.body.certifications,
        userId: user.id,
    });
    await resume_1.Resume.findByIdAndUpdate(itemId, { $set: updatedResume });
    res.status(200).json(updatedResume);
};
exports.editResume = editResume;
const deleteResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let result = await resume_1.Resume.findByIdAndDelete(itemId);
    res.status(200).json(result);
};
exports.deleteResume = deleteResume;
const apiCall = async (req, res, next) => {
    //bad api key
    console.log("need api key");
    const configuration = new openai_1.Configuration({
        apiKey: "replace with api key"
    });
    const openai = new openai_1.OpenAIApi(configuration);
    console.log(req.body);
    let resume = req.body.resume;
    let app = req.body.application;
    if (app !== "" && resume !== "") {
        try {
            console.log("Ran");
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `You are a professional resume writer and are working to choose what information to include on a resume.\nThe following is a job application :\n{${app}}\n\nand the information for a resume \n{${resume}}\nout of this information what is most relevant to the job application. \nyou should always include at least 2 jobs, 2 projects, a degree and any relevent certifications. If there are fewer than required jobs, projects, degrees or certifications, leave blank those data.\noutput should be of the form {\n  \"identity\": { \"first\" : \"\", \"last\" : \"\", \"phone\" : \"\", \"title\" : \"\",\"email\" : \"\", \"linkedin\" : \"\"},\n  \"skills\" : [],\n  \"jobs\" : [ { \"title\" : \"\", \"company\": \"\", \"startdate\" : \"\", \"enddate\" : \"\",\"accomplishments\" : []}],\n  \"projects\" : [{ \"title\" : \"\", \"startdate\" : \"\", \"enddate\" : \"\",\"accomplishments\" : [] }],\n  \"educations\" : [{\"school\": \"\",\"degree\" : \"\", \"date\" : \"\"}],\n  \"certifications\" :[{ \"certification\" : \"\",\"provider\" : \"\",\"date\" : \"\"}]\n}\n`,
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
            });
            //respond with generated resume
            res.status(200).json(response.data.choices[0]);
        }
        catch (err) {
            console.log("Openai has thrown an error: ", err);
        }
    }
    res.status(500).send("error, you shouldnt be seeing this");
};
exports.apiCall = apiCall;
