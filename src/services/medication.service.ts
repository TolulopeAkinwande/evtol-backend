import { db } from "../config/db";
import { CheckoutDto, CreateMedicationDto, UpdateMedicationDto } from "../dto/medication.dto";
import {CustomError} from "../utils/customError.error";
import { generateRandomCode } from "../utils/general";
import EvtolService from "./evtol.service";

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

    async checkout(userId: number, dto: CheckoutDto) {
        // Retrieve all medications that are included in the cart
        const medicationIds = dto.items.map(item => item.id);
        const medications = await db.medication.findMany({
        where: { id: { in: medicationIds } },
        });

        // Ensure all medications exist
        if (medications.length !== dto.items.length) {
            throw new CustomError(400, 'Some medications were not found.');
        }

        // Calculate total order amount and weight, and prepare order items data
        let totalAmount = 0;
        let totalWeight = 0;
        const orderItemsData = dto.items.map(item => {
            const medication = medications.find(med => med.id === item.id);
            if (!medication) {
                throw new CustomError(400, `Medication with id ${item.id} not found.`);
            }

            const itemAmount = medication.price * item.quantity;
            const itemWeight = medication.weight * item.quantity;

            totalAmount += itemAmount;
            totalWeight += itemWeight;

            return {
                medicationId: medication.id,
                quantity: item.quantity,
                amount: itemAmount,
            };
        });

        const evtolService = new EvtolService();
        const selectedEvtol = await evtolService.selectEvtolForOrder(totalWeight);

        // Create the order with its associated order items
        const order = await db.order.create({
            data: {
                userId,
                totalAmount,
                totalWeight,
                evtolId: selectedEvtol.id,
                items: {
                    create: orderItemsData,
                },
            },
        });

        // Return a success message and the created order details
        return { success: true, order };
    }
}