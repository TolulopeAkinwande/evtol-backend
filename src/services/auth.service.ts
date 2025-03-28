import { user } from "@prisma/client";
import { createUserDto, LoginDto } from "../dto/auth.dto";
import { comparePassword, hashPassword } from "../utils/password.utils";
import { CustomError } from "../utils/customError.error";
import jwt from "jsonwebtoken";
import { db } from "../config/db";

export class AuthService {
    async createUser(data: createUserDto): Promise<user> {
        const isUserExist = await db.user.findFirst({
            where: {
                email: data.email,
            }
        });
        if(isUserExist){
            throw new CustomError(409, "oops, email already taken")
        }
        const user = await db.user.create({
            data: {
                email: data.email,
                password: await hashPassword(data.password),
                firstName: data.firstName,
                lastName: data.lastName,
                role: "user",
                phoneNumber: data.phoneNumber
            },
        })
        return user;
    }
    
    async login(data: LoginDto): Promise<{ accessToken: string; refreshToken: string;}> {
        const user = await db.user.findFirst({
            where: {
                email: data.email,
            }
        })
        if (!user) {
            throw new CustomError(400, " oops in-correct details");
        }
        
        const ispasswordValid = await comparePassword(data.password, user.password);
        if (!ispasswordValid) {
            throw new CustomError(401, "invalid datails");
        }

        const fullname = user.firstName + ' ' + user.lastName;
        const accessToken = this.generateAccessToken(user.id, fullname, user.role);

        const refreshToken = this.generateRefreshToken(
            user.id,
            fullname,
            user.role
        );
        return { accessToken, refreshToken };
    }
    // generateAccessToken(userId: number, name: string, role: string): string {
    //     return jwt.sign({id: userId, name, role}, process.env.JWT_SECRET!, {expiresIn: '1h'});
    // };
    generateAccessToken(userId: number, name: string, role: string): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        return jwt.sign({ id: userId, name, role }, secret, { expiresIn: '1h' });
    };
    

    generateRefreshToken(userId: number, name: string, role: string): string {
        return jwt.sign({id: userId, name, role}, process.env.JWT_SECRET!, {expiresIn: '1h'});
    };

}