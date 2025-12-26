import fs from "fs";
import path from "path";
import { processInvoice } from "./engine/processInvoice";
import { Invoice } from "./types/invoice";

console.log("🚀 Flowbit Memory Agent starting...\n");

const invoices: Invoice[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../data/invoices_extracted.json"),
    "utf-8"
  )
);

const output = processInvoice(invoices[0], invoices);

console.log(JSON.stringify(output, null, 2));
