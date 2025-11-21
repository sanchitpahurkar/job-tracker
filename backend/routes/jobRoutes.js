import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getAppliedJobs } from "../controllers/jobController.js";

const jobRouter = Router();

// get requests
jobRouter.get('/', getAllJobs);
jobRouter.get('/applied', getAppliedJobs);

// post requests
jobRouter.post('/create', createJob);

// delete route
jobRouter.delete('/:id', deleteJob);

export default jobRouter;
