import { Invoice } from "../types/invoice";
import { RecallContext } from "../types/recallContext";
import { ApplyResult } from "../types/applyResult";

export function applyPOMatching(
  invoice: Invoice,
  context: RecallContext
): ApplyResult {
  const proposedCorrections: string[] = [];
  const reasoning: string[] = [];
  let confidenceDelta = 0;

  if (!invoice.fields.poNumber && context.matchingPOs.length === 1) {
    proposedCorrections.push(
      `Assign PO number ${context.matchingPOs[0].poNumber}`
    );
    reasoning.push(
      "Only one matching PO found for vendor within date range and item match."
    );
    confidenceDelta += 0.2;
  }

  return {
    normalizedFields: invoice.fields,
    proposedCorrections,
    reasoning,
    confidenceDelta
  };
}
