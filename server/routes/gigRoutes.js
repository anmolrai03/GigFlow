import express from 'express';
import {getAllGigsController, postGigController} from '../controllers/gigController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get("/", getAllGigsController);
router.post("/" ,authMiddleware, postGigController);

export default router;