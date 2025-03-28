import express from 'express';
import EvtolController from '../controllers/evtol.controller';
import dtoValidationMiddleware from '../middleware/validation.middleware';
import { CreateEvtolDto, UpdateEvtolDto } from '../dto/evtol.dto';

const controller = new EvtolController();
const router = express.Router();

router.post('/create', dtoValidationMiddleware(CreateEvtolDto, 'body'), controller.createEvtol);
router.post('/update/:id', dtoValidationMiddleware(UpdateEvtolDto, 'body'), controller.updateEvtol);

export default router;