import mongoose from 'mongoose';
import Job from "../models/JobSchema.js";

export const getJob = async (req, res) => {
    
}

export const getAllJobs = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const jobs = await Job.find({ owner: userId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createJob = async (req, res) => {
    try {
        const { company, jobtitle, jobctc, application_link, status, date, resume } = req.body || {};

        if (!company || !jobtitle || !status || !date) {
            return res.status(400).json({ message: 'Missing required fields: company, jobtitle, status, date' });
        }

        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const job = new Job({
            company,
            jobTitle: jobtitle,
            jobctc: jobctc,
            applicationURL: application_link || undefined,
            applicationStatus: status,
            dateOfApplication: date ? new Date(date) : undefined,
            resume,
            owner: userId
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

        if (!id) return res.status(400).json({ message: 'Missing job id' });
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid job id' });
        }

        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // only owner can delete
        if (!req.userId || job.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'Forbidden: not the owner' });
        }

        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

