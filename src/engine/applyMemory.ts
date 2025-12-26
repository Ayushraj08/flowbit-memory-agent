import { Invoice } from "../types/invoice";
import { RecallContext } from "../types/recallContext";
import { ApplyResult } from "../types/applyResult";
import { applyVendorRules } from "./applyVendorRules";
import { applyPOMatching } from "./applyPOMatching";

export function applyMemory(
  invoice: Invoice,
  context: RecallContext
): ApplyResult {
  const vendorResult = applyVendorRules(invoice, context);
  const poResult = applyPOMatching(invoice, context);

  return {
    normalizedFields: invoice.fields,
    proposedCorrections: [
      ...vendorResult.proposedCorrections,
      ...poResult.proposedCorrections
    ],
    reasoning: [...vendorResult.reasoning, ...poResult.reasoning],
    confidenceDelta:
      vendorResult.confidenceDelta + poResult.confidenceDelta
  };
}
