import { db } from "../db/sqlite";
import { CorrectionMemory } from "./correctionMemory";

export function getCorrectionMemory(vendor: string): CorrectionMemory[] {
  return db
    .prepare(
      `SELECT * FROM correction_memory WHERE vendor = ? ORDER BY confidence DESC`
    )
    .all(vendor) as CorrectionMemory[];
}