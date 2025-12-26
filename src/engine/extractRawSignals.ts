export function extractRawSignals(rawText: string): string[] {
    const signals: string[] = [];
  
    if (/Leistungsdatum/i.test(rawText)) signals.push("SERVICE_DATE_PRESENT");
    if (/MwSt\. inkl\.|Prices incl\. VAT/i.test(rawText))
      signals.push("VAT_INCLUDED");
    if (/Skonto/i.test(rawText)) signals.push("DISCOUNT_TERMS");
    if (/Seefracht|Shipping/i.test(rawText)) signals.push("FREIGHT_SERVICE");
  
    return signals;
  }
  