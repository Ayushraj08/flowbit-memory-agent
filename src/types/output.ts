import { InvoiceFields } from "./invoice";
import { AuditEntry } from "./audit";

export type InvoiceOutput = {
  normalizedInvoice: InvoiceFields;
  proposedCorrections: string[];
  requiresHumanReview: boolean;
  reasoning: string;
  confidenceScore: number;
  memoryUpdates: string[];
  auditTrail: AuditEntry[];
};
