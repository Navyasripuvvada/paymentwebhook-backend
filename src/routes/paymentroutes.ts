import express from "express";
import {
  createOrderController,
  getOrderStatusController,
  webhookController,
} from "../controller/paymentcontroller";

const router = express.Router();

router.post("/create-order", createOrderController);
router.get("/status/:order_id", getOrderStatusController);
router.post("/webhook/payment", webhookController);

export default router;