import fs from "fs";
import path from "path";
import { Invoice } from "../types/invoice";
import { processInvoice } from "../engine/processInvoice";
import { loadAndLearnCorrections } from "../engine/loadHumanCorrections";
import { initDB } from "../db/sqlite";

// ✅ MUST come first
initDB();

const invoices: Invoice[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../../data/invoices_extracted.json"),
    "utf-8"
  )
);

console.log("\n▶️ RUN 1 — BEFORE LEARNING (INV-A-001)");
console.log(JSON.stringify(processInvoice(invoices[0], invoices), null, 2));

console.log("\n🧠 APPLYING HUMAN CORRECTIONS (LEARNING)...");
loadAndLearnCorrections();

console.log("\n▶️ RUN 2 — AFTER LEARNING (INV-A-002)");
console.log(JSON.stringify(processInvoice(invoices[1], invoices), null, 2));
