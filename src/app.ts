import express from 'express';
import cors from "cors";
import paymentroutes from "./routes/paymentroutes"
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/payment",paymentroutes);
export default app;