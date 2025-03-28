import express from 'express';
import AuthController from "../controllers/auth.controller";
import dtoValidationMiddleware from '../middleware/validation.middleware';
import { createUserDto, LoginDto } from '../dto/auth.dto';
// import { CreateUserDto, LoginDto } from '../dto/auth.dto';

const controller = new AuthController();
const router = express.Router();

router.post('/sign-up', dtoValidationMiddleware(createUserDto, 'body'), controller.createUser);
router.post('/login', dtoValidationMiddleware(LoginDto, 'body'), controller.login);

export default router;