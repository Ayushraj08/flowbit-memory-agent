export type DeliveryNoteLineItem = {
    sku: string;
    qtyDelivered: number;
  };
  
  export type DeliveryNote = {
    dnNumber: string;
    vendor: string;
    poNumber: string;
    date: string;
    lineItems: DeliveryNoteLineItem[];
  };
  