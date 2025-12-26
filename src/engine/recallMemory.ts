import { Invoice } from "../types/invoice";
import { RecallContext } from "../types/recallContext";
import { loadPurchaseOrders, loadDeliveryNotes } from "./loadReferenceData";
import { extractRawSignals } from "./extractRawSignals";
import { detectDuplicate } from "./detectDuplicate";
import { getVendorMemory, getCorrectionMemory } from "../memory/memoryStore";

export function recallMemory(
  invoice: Invoice,
  allInvoices: Invoice[]
): RecallContext {
  const purchaseOrders = loadPurchaseOrders();
  const deliveryNotes = loadDeliveryNotes();

  const matchingPOs = purchaseOrders.filter(
    (po) => po.vendor === invoice.vendor
  );

  const matchingDNs = deliveryNotes.filter(
    (dn) => dn.vendor === invoice.vendor
  );

  const rawSignals = extractRawSignals(invoice.rawText);
  const isPossibleDuplicate = detectDuplicate(invoice, allInvoices);

  // ✅ ACTUAL MEMORY RECALL
  const vendorMemories = getVendorMemory(invoice.vendor);
  const correctionMemories = getCorrectionMemory(invoice.vendor);

  return {
    vendorMemories,
    correctionMemories,
    matchingPOs,
    matchingDNs,
    isPossibleDuplicate,
    rawSignals,
    hasMemory: vendorMemories.length > 0 || correctionMemories.length > 0
  };
}
