import express from 'express';
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/sign-up", authController.createUser);
authRouter.post("/login", authController.login)
// authRouter.post("/", validationMiddleware(LoginDTO), authController.login);

export default authRouter;