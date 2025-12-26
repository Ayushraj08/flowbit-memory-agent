import { Invoice } from "../types/invoice";
import { InvoiceOutput } from "../types/output";
import { recallMemory } from "./recallMemory";
import { applyMemory } from "./applyMemory";
import { decideAction } from "./decideAction";
import { AuditEntry } from "../types/audit";

export function processInvoice(
  invoice: Invoice,
  allInvoices: Invoice[]
): InvoiceOutput {
  const auditTrail: AuditEntry[] = [];

  // 1️⃣ RECALL
  const context = recallMemory(invoice, allInvoices);
  auditTrail.push({
    step: "recall",
    timestamp: new Date().toISOString(),
    details: context.hasMemory
      ? "Relevant vendor memory recalled."
      : "No prior memory found for this vendor."
  });

  // 2️⃣ APPLY
  const applied = applyMemory(invoice, context);
  auditTrail.push({
    step: "apply",
    timestamp: new Date().toISOString(),
    details: applied.reasoning.join(" ")
  });

  // 3️⃣ DECIDE (confidence depends on memory strength)
  const decision = decideAction(
    context.hasMemory ? invoice.confidence : invoice.confidence * 0.6,
    applied,
    context
  );
  auditTrail.push({
    step: "decide",
    timestamp: new Date().toISOString(),
    details: decision.reasoning
  });

  return {
    normalizedInvoice: invoice.fields,
    proposedCorrections: applied.proposedCorrections,
    requiresHumanReview: decision.requiresHumanReview,
    reasoning: decision.reasoning,
    confidenceScore: decision.finalConfidence,
    memoryUpdates: [],
    auditTrail
  };
}
