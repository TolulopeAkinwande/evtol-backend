import { db } from "../config/db";
import { CreateMedicationDto, UpdateMedicationDto } from "../dto/medication.dto";
import { CustomError } from "../utils/customError.error";
import { generateRandomCode } from "../utils/general";

export default class MedicationService { 
    async createMedication(data: CreateMedicationDto) {
        const code = generateRandomCode(5);
        const medication = db.medication.create({
            data: {
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                weight: data.weight,
                image: data.image,
                code: code
            }
        })
        return medication; 
    }

    async updateMedication(medicationId: number, data: UpdateMedicationDto) {
        let medication = await db.medication.findUnique({
            where: { id: medicationId },
        });

        if (!medication) throw new CustomError(400, 'Medication not found');

        medication = await db.medication.update({
            where: { id: medicationId },
            data: { ...data }
        });

        return medication;
    }

    async getMedications() {
        const medications = await db.medication.findMany();
        return medications;
    }

    async getSingleMedication(medicationId: number) {
        const medication = await db.medication.findUnique({
            where: { id: medicationId },
        });

        if (!medication) throw new CustomError(400, 'Medication not found');

        return medication;
    }
}