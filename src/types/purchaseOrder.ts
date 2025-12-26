export type PurchaseOrderLineItem = {
    sku: string;
    qty: number;
    unitPrice: number;
  };
  
  export type PurchaseOrder = {
    poNumber: string;
    vendor: string;
    date: string;
    lineItems: PurchaseOrderLineItem[];
  };
  