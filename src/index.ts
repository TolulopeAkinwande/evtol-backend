import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import authRouter from "./routes/auth.routes";
import medicationRouter from "./routes/medication.route";
// import errorMiddleWare from "./middleware/error.middleware";

dotenv.config();
const portEnv = process.env.PORT;

if(!portEnv) {
    console.error("error: port is not defined in doten file");
    process.exit(1)
}

const PORT:  number = parseInt(portEnv, 10);
if (isNaN(PORT)) {
    console.error(`ERROR: PORT is not a number in .env file $`)
    process.exit(1);
}

const app = express();
const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/medication', medicationRouter);

// app.use(errorMiddleWare);

app.listen(PORT, ()=> {
    console.error(`Server is running on Port ${PORT}`)
})