import { CreateMedicationDto } from "../dto/createMedication.dto";
import MedicationService from "../services/medication.service";
import { Request, Response, NextFunction } from "express";

export default class medicationController {
    private medicationService: MedicationService = new MedicationService();

    public createMedication= async (
            req: Request,
            res: Response,
            next: Function
        ): Promise<void> => {
            try {
                const data: CreateMedicationDto = req.body
                const medication = await this.medicationService.createMedication(data);
                res.status(201).json({
                    error: false, 
                    messsage: `medication created successfully`
                });
            }catch (error) {
                next(error);
            };
        }
}