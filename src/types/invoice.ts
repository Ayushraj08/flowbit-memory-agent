export type LineItem = {
    sku: string | null;
    description?: string;
    qty: number;
    unitPrice: number;
  };
  
  export type InvoiceFields = {
    invoiceNumber: string;
    invoiceDate: string;
    serviceDate?: string | null;
    currency?: string | null;
    poNumber?: string | null;
    netTotal: number;
    taxRate: number;
    taxTotal: number;
    grossTotal: number;
    lineItems: LineItem[];
  };
  
  export type Invoice = {
    invoiceId: string;
    vendor: string;
    fields: InvoiceFields;
    confidence: number;
    rawText: string;
  };
  