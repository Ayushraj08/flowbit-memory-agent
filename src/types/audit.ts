export type AuditStep =
  | "recall"
  | "apply"
  | "decide"
  | "learn";

export type AuditEntry = {
  step: AuditStep;
  timestamp: string;
  details: string;
};
