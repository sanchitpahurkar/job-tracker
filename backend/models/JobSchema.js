import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {type: String, required: true},
    jobTitle: {type: String, required: true},
    applicationURL: {type: String},
    applicationStatus: {type: String, required: true},
    dateOfApplication: {type: Date, required: true},
    resume: {type: String}
});

const Job = mongoose.model('Job', JobSchema);

export default Job;