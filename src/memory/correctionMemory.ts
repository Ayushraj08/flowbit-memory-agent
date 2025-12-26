export type CorrectionMemory = {
    id?: number;
    vendor: string;
    condition: string;     // e.g. "vatIncluded=true"
    action: string;        // e.g. "recalculateTaxFromGross"
    confidence: number;
    reinforcedCount: number;
  };
  
