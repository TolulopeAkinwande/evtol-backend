import { CreateEvtolDto, UpdateEvtolDto } from "../dto/evtol.dto";
import EvtolService from "../services/evtol.service";
import { Request, Response, NextFunction } from "express";

export default class EvtolController {
    private evtolService: EvtolService = new EvtolService();

    public createEvtol = async (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> => {
        try {
            const data: CreateEvtolDto = req.body
            const evtol = await this.evtolService.createEvtol(data);
            res.status(201).json({
                error: false, 
                messsage: 'evtol created successfully',
                data: evtol,
            });
        }catch (error) {
            next(error);
        };
    }

    public updateEvtol = async (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> => {
        try {
            const data: UpdateEvtolDto = req.body
            const evtol = await this.evtolService.updateEvtol(parseInt(req.params.id), data);
            res.status(201).json({
                error: false, 
                messsage: 'evtol updated successfully',
                data: evtol,
            });
        }catch (error) {
            next(error);
        };
    }
}