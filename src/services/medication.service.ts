import { db } from "../config/db";
import { CreateMedicationDto } from "../dto/createMedication.dto";
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

    
}