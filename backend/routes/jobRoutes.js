import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllJobs, createJob, deleteJob } from "../controllers/jobController.js";

const jobRouter = Router();

// get requests (protected)
jobRouter.get('/', authMiddleware, getAllJobs);

// post requests (protected)
jobRouter.post('/create', authMiddleware, createJob);

// delete route (protected)
jobRouter.delete('/:id', authMiddleware, deleteJob);

export default jobRouter;
