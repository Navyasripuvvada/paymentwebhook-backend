import express from 'express';
import cors from "cors";
import paymentroutes from "./routes/paymentroutes"
const app=express();
app.use(express.json());
app.use(cors({origin:"https://webhooh-frontend.netlify.app/"}));
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/payment",paymentroutes);
export default app;