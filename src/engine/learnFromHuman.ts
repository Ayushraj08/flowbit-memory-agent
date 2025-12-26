import { HumanCorrection } from "../types/humanCorrection";
import { db } from "../db/sqlite";

export function learnFromHuman(correction: HumanCorrection) {
  if (correction.finalDecision !== "approved") return;

  for (const c of correction.corrections) {

    // ─────────────────────────────────────
    // 1️⃣ Vendor Memory: Leistungsdatum → serviceDate
    // ─────────────────────────────────────
    if (c.reason.toLowerCase().includes("leistungsdatum")) {
      const existing = db.prepare(`
        SELECT confidence, usageCount
        FROM vendor_memory
        WHERE vendor = ? AND pattern = ? AND targetField = ?
      `).get(correction.vendor, "Leistungsdatum", "serviceDate") as any;

      if (existing) {
        db.prepare(`
          UPDATE vendor_memory
          SET confidence = MIN(confidence + 0.05, 0.95),
              usageCount = usageCount + 1,
              lastUsedAt = ?
          WHERE vendor = ? AND pattern = ? AND targetField = ?
        `).run(
          new Date().toISOString(),
          correction.vendor,
          "Leistungsdatum",
          "serviceDate"
        );
      } else {
        db.prepare(`
          INSERT INTO vendor_memory
          (vendor, pattern, targetField, confidence, usageCount, lastUsedAt)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          correction.vendor,
          "Leistungsdatum",
          "serviceDate",
          0.7,
          1,
          new Date().toISOString()
        );
      }
    }

    // ─────────────────────────────────────
    // 2️⃣ VAT Included Correction Memory
    // ─────────────────────────────────────
    if (c.reason.toLowerCase().includes("vat")) {
      const existing = db.prepare(`
        SELECT confidence, reinforcedCount
        FROM correction_memory
        WHERE vendor = ? AND condition = ?
      `).get(correction.vendor, "VAT_INCLUDED") as any;

      if (existing) {
        db.prepare(`
          UPDATE correction_memory
          SET confidence = MIN(confidence + 0.05, 0.95),
              reinforcedCount = reinforcedCount + 1
          WHERE vendor = ? AND condition = ?
        `).run(correction.vendor, "VAT_INCLUDED");
      } else {
        db.prepare(`
          INSERT INTO correction_memory
          (vendor, condition, action, confidence, reinforcedCount)
          VALUES (?, ?, ?, ?, ?)
        `).run(
          correction.vendor,
          "VAT_INCLUDED",
          "RECALCULATE_TOTALS",
          0.75,
          1
        );
      }
    }

    // ─────────────────────────────────────
    // 3️⃣ Freight SKU Mapping
    // ─────────────────────────────────────
    if (c.reason.toLowerCase().includes("freight")) {
      const existing = db.prepare(`
        SELECT confidence, usageCount
        FROM vendor_memory
        WHERE vendor = ? AND targetField = ?
      `).get(correction.vendor, "lineItems.sku") as any;

      if (existing) {
        db.prepare(`
          UPDATE vendor_memory
          SET confidence = MIN(confidence + 0.05, 0.95),
              usageCount = usageCount + 1,
              lastUsedAt = ?
          WHERE vendor = ? AND targetField = ?
        `).run(
          new Date().toISOString(),
          correction.vendor,
          "lineItems.sku"
        );
      } else {
        db.prepare(`
          INSERT INTO vendor_memory
          (vendor, pattern, targetField, confidence, usageCount, lastUsedAt)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          correction.vendor,
          "Seefracht|Shipping",
          "lineItems.sku",
          0.7,
          1,
          new Date().toISOString()
        );
      }
    }
  }
}
