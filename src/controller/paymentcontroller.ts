import {
  createOrderService,
  getOrderStatusService,
  handleWebhookService,Order,OrderResponse
} from "../services/paymentservices";
import { Request,Response } from "express";

export const createOrderController = async (req:Request,res:Response<OrderResponse>) => {
  const {name,amount} = req.body;
  const result = await createOrderService({name, amount});
  res.json(result);
};

export const getOrderStatusController = async (req:Request, res:Response) => {
  const{ order_id } = req.params as { order_id: string };
  const result = await getOrderStatusService(order_id);
   return res.json(result);
};

export const webhookController = async (req: Request, res: Response) => {
  const { order_id } = req.body;

  const result = await handleWebhookService(order_id);

  res.json(result);
};