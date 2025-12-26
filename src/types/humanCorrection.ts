export type FieldCorrection = {
    field: string;
    from: any;
    to: any;
    reason: string;
  };
  
  export type HumanCorrection = {
    invoiceId: string;
    vendor: string;
    corrections: FieldCorrection[];
    finalDecision: "approved" | "rejected";
  };
  