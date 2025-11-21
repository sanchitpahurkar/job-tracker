import mongoose from "mongoose";
import Job from "../models/JobSchema.js";

export const getJob = async (req, res) => {
    
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createJob = async (req, res) => {
    try {
        const { company, jobtitle, application_link, status, date, resume } = req.body || {};

        // validate required fields expected by schema
        if (!company || !jobtitle || !status || !date) {
            return res.status(400).json({ message: 'Missing required fields: company, jobtitle, status, date' });
        }

        const job = new Job({
            company,
            jobTitle: jobtitle,
            applicationURL: application_link || undefined,
            applicationStatus: status,
            dateOfApplication: date ? new Date(date) : undefined,
            resume
        });

        await job.save();

        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id || req.body._id;
        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const appliedjobs = await Job.find({ applicationStatus: 'applied' });
        res.status(200).json(appliedjobs);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}