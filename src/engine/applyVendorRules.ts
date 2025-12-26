import { Invoice } from "../types/invoice";
import { RecallContext } from "../types/recallContext";
import { ApplyResult } from "../types/applyResult";

export function applyVendorRules(
  invoice: Invoice,
  context: RecallContext
): ApplyResult {
  const proposedCorrections: string[] = [];
  const reasoning: string[] = [];
  let confidenceDelta = 0;

  // Supplier GmbH — serviceDate from Leistungsdatum
  if (
    invoice.vendor === "Supplier GmbH" &&
    context.rawSignals.includes("SERVICE_DATE_PRESENT") &&
    !invoice.fields.serviceDate
  ) {
    proposedCorrections.push("Fill serviceDate from Leistungsdatum");
    reasoning.push(
      "Vendor Supplier GmbH commonly provides service date as 'Leistungsdatum' in raw text."
    );
    confidenceDelta += 0.1;
  }

  // Parts AG — VAT included
  if (
    invoice.vendor === "Parts AG" &&
    context.rawSignals.includes("VAT_INCLUDED")
  ) {
    proposedCorrections.push(
      "Recalculate tax and gross totals (VAT already included)"
    );
    reasoning.push(
      "Parts AG invoices often include VAT in totals; recalculation avoids overestimation."
    );
    confidenceDelta += 0.15;
  }

  // Freight & Co — Freight SKU mapping
  if (
    invoice.vendor === "Freight & Co" &&
    context.rawSignals.includes("FREIGHT_SERVICE")
  ) {
    proposedCorrections.push(
      "Map line item description to SKU = FREIGHT"
    );
    reasoning.push(
      "Freight & Co uses descriptive terms (Seefracht/Shipping) that map to SKU FREIGHT."
    );
    confidenceDelta += 0.1;
  }

  return {
    normalizedFields: invoice.fields,
    proposedCorrections,
    reasoning,
    confidenceDelta
  };
}
