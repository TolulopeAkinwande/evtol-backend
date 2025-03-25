import { AuthService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { createUserDto, LoginDto } from "../dto/createUser.dto";

export class AuthController {
    private authService: AuthService = new AuthService();

    public createUser = async (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> => {
        try {
            const data: createUserDto = req.body;
            const user = await this.authService.createUser(data);
            res.status(201).json({
                error: false, 
                messsage: `Account created successfully`,
            });
        }catch (error) {
            next(error);
        };
    }
    public login = async (
        req: Request,
        Res: Response,
        next: NextFunction 
    ): Promise <void> => {
        try {
            const data: LoginDto = req.body;
            const {accessToken, refreshToken } = await this.authService.login(data);
            Res.status(201).json({accessToken, refreshToken});
        }catch(error) {
            next(error);
        }
    };
}    