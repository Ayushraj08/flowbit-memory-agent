import fs from "fs";
import path from "path";
import { PurchaseOrder } from "../types/purchaseOrder";
import { DeliveryNote } from "../types/deliveryNote";

export function loadPurchaseOrders(): PurchaseOrder[] {
  const filePath = path.join(__dirname, "../../data/purchase_orders.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function loadDeliveryNotes(): DeliveryNote[] {
  const filePath = path.join(__dirname, "../../data/delivery_notes.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
