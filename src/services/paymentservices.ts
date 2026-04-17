import { pool } from "../config/db";

export interface Order {
  name : string 
  amount : number
 
}
export interface OrderResponse{
  order_id:string,
  status:string
}


export const createOrderService = async (data:Order):Promise<OrderResponse>=> {
  const {name,amount}=data;
  const order_id = "order_" + Date.now();
  await pool.query(
    "INSERT INTO paymentdetails(order_id, name, amount, status) VALUES($1,$2,$3,$4)",
    [order_id, name, amount, "INITIATED"]
  );
  startPaymentWindow(order_id);

  return { order_id, status: "INITIATED" };
};
export const getOrderStatusService = async (order_id: string) => {
  const result = await pool.query(
    "SELECT * FROM paymentdetails WHERE order_id=$1",
    [order_id]
  );

  return result.rows[0];
};

export const handleWebhookService = async (order_id: string) => {
  const result = await pool.query(
    "UPDATE paymentdetails SET status=$1 WHERE order_id=$2 RETURNING *",
    ["SUCCESS", order_id]
  );

  return result.rows[0];
};
const startPaymentWindow = (order_id: string) => {
  setTimeout(async () => {
    await pool.query(
      "UPDATE paymentdetails SET status=$1 WHERE order_id=$2",
      ["PENDING", order_id]
    );
  }, 8000);
  setTimeout(async () => {
    await WebhookCall(order_id);
  }, 8000);
};
const WebhookCall = async (order_id: string) => {
  await fetch("http://localhost:3000/api/payment/webhook/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id,
    }),
  });

  console.log("Webhook triggered for SUCCESS");
};