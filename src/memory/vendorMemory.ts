export type VendorMemory = {
    id?: number;
    vendor: string;
    pattern: string;        // e.g. "Leistungsdatum"
    targetField: string;    // e.g. "serviceDate"
    confidence: number;     // 0 → 1
    usageCount: number;
    lastUsedAt: string;
  };
  