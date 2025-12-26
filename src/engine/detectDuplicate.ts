import { Invoice } from "../types/invoice";

export function detectDuplicate(
  invoice: Invoice,
  allInvoices: Invoice[]
): boolean {
  return allInvoices.some((other) => {
    if (other.invoiceId === invoice.invoiceId) return false;

    return (
      other.vendor === invoice.vendor &&
      other.fields.invoiceNumber === invoice.fields.invoiceNumber &&
      Math.abs(
        new Date(other.fields.invoiceDate).getTime() -
          new Date(invoice.fields.invoiceDate).getTime()
      ) < 3 * 24 * 60 * 60 * 1000
    );
  });
}
