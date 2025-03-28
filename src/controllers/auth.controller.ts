import { AuthService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
// import { CreateUserDto, LoginDto } from "../dto/auth.dto";
import { createUserDto, LoginDto } from "../dto/auth.dto";

export default class AuthController {
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
                messsage: `OPT has been successfully sent to your email @ ${user.email}`,
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