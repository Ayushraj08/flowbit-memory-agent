import { VendorMemory } from "../memory/vendorMemory";
import { CorrectionMemory } from "../memory/correctionMemory";
import { PurchaseOrder } from "./purchaseOrder";
import { DeliveryNote } from "./deliveryNote";

export type RecallContext = {
    vendorMemories: VendorMemory[];
    correctionMemories: CorrectionMemory[];
    matchingPOs: PurchaseOrder[];
    matchingDNs: DeliveryNote[];
    isPossibleDuplicate: boolean;
    rawSignals: string[];
    hasMemory: boolean;
  };
  
