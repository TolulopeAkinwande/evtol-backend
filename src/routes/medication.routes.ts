import express from 'express';
import MedicationController from '../controllers/medication.controller';
import dtoValidationMiddleware from '../middleware/validation.middleware';
import { CheckoutDto, CreateMedicationDto, UpdateMedicationDto } from '../dto/medication.dto';

const controller = new MedicationController();
const router = express.Router();

router.post('/create', dtoValidationMiddleware(CreateMedicationDto, 'body'), controller.createMedication);
router.post('/update/:id', dtoValidationMiddleware(UpdateMedicationDto, 'body'), controller.updateMedication);
router.get('/get-all', controller.getMedications);
router.get('/get-single/:id', controller.getSingleMedication);
router.post('/checkout', dtoValidationMiddleware(CheckoutDto, 'body'), controller.checkout);

export default router;