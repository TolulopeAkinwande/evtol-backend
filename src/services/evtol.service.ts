import { db } from "../config/db";
import { CreateEvtolDto, UpdateEvtolDto } from "../dto/evtol.dto";

export default class EvtolService {
    async createEvtol(dto: CreateEvtolDto) {
        return await db.evtol.create({
            data: {
            serialNumber: dto.serialNumber,
            model: dto.model,
            weightLimit: dto.weightLimit,
            state: dto.state,
            batteryCapacity: dto.batteryCapacity,
            },
        });
    }
      
    async updateEvtol(id: number, dto: UpdateEvtolDto) {
        return await db.evtol.update({
            where: { id },
            data: {
            serialNumber: dto.serialNumber,
            model: dto.model,
            weightLimit: dto.weightLimit,
            state: dto.state,
            batteryCapacity: dto.batteryCapacity,
            },
        });
    }

    async deleteEvtol(id: number) {
        await db.evtol.delete({
            where: { id },
        });
        
        return { success: true, message: 'EVTOL deleted successfully' };
    }

    async selectEvtolForOrder(medicationOrderWeight: number) {
        // Step 1: Retrieve all eVTOLs in IDLE state with sufficient battery
        const availableEVTOLs = await db.evtol.findMany({
            where: {
            state: 'idle',
            batteryCapacity: { gte: 25 }, // Battery must be ≥ 25%
            weightLimit: { gte: medicationOrderWeight }, // Must handle the weight
            },
            orderBy: [
            { batteryCapacity: 'desc' }, // Prefer highest battery
            { weightLimit: 'asc' } // Prefer optimal weight match
            ]
        });

        if (availableEVTOLs.length === 0) {
            throw new Error('No available eVTOL meets the criteria');
        }

        // Step 2: Select the best eVTOL
        const selectedEVTOL = availableEVTOLs[0];

        // Step 3: Update the state to LOADING (Atomic Transaction)
        await db.evtol.update({
            where: { id: selectedEVTOL.id },
            data: { state: 'loading' }
        });

        return selectedEVTOL;
    }
}