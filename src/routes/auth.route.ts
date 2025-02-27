import express from 'express';
import AuthController from "../controllers/auth.controller";
import dtoValidationMiddleware from '../middlleware/validation.middleware';
import { CreateUserDto, LoginDto } from '../dto/auth.dto';

const controller = new AuthController();
const router = express.Router();

router.post('/sign-up', dtoValidationMiddleware(CreateUserDto, 'body'), controller.createUser);
router.post('/login', dtoValidationMiddleware(LoginDto, 'body'), controller.login);

export default router;