import { db } from "../db/sqlite";
import { VendorMemory } from "./vendorMemory";

export function getVendorMemory(vendor: string): VendorMemory[] {
  return db
    .prepare(
      `SELECT * FROM vendor_memory WHERE vendor = ? ORDER BY confidence DESC`
    )
    .all(vendor) as VendorMemory[];
}
