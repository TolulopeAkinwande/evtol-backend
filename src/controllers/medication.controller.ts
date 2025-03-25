import { CreateMedicationDto, UpdateMedicationDto } from "../dto/medication.dto";
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

        public updateMedication = async (
            req: Request,
            res: Response,
            next: Function
        ): Promise<void> => {
            try {
                const data: UpdateMedicationDto = req.body
                const medication = await this.medicationService.updateMedication(parseInt(req.params.id), data);
                res.status(201).json({
                    error: false, 
                    messsage: 'medication updated successfully',
                    data: medication,
                });
            }catch (error) {
                next(error);
            };
        }
    
        public getMedications = async (
            req: Request,
            res: Response,
            next: Function
        ): Promise<void> => {
            try {
                const medications = await this.medicationService.getMedications();
                res.status(200).json({
                    error: false, 
                    messsage: 'medications fetched successfully',
                    data: medications,
                });
            }catch (error) {
                next(error);
            };
        }
    
        public getSingleMedication = async (
            req: Request,
            res: Response,
            next: Function
        ): Promise<void> => {
            try {
                const medication = await this.medicationService.getSingleMedication(parseInt(req.params.id));
                res.status(200).json({
                    error: false, 
                    messsage: 'medications fetched successfully',
                    data: medication,
                });
            }catch (error) {
                next(error);
            };
        }
}