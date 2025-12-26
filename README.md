# 🧠 Flowbit Memory Agent  
**Learned Memory Layer for Invoice Automation**

---

## 📌 Overview

**Flowbit Memory Agent** implements a **memory-driven AI agent layer** for invoice automation systems.

Instead of treating every invoice as a new, isolated document, the system **learns from past human corrections and vendor-specific behavior** and applies those learnings to future invoices.

> **Scope clarification:**  
> As per the assignment, **invoice extraction is assumed to be complete**.  
> This project focuses strictly on **learning, memory, decision logic, confidence evolution, and explainability** — **not OCR or ML model training**.

---

## 🎯 Problem Statement

In real-world invoice processing:

- Vendors follow recurring formats and conventions  
- Human corrections repeat across invoices  
- Traditional systems do **not retain or reuse** this knowledge  

### As a result:

- The same issues are flagged repeatedly  
- Automation rates stagnate  
- Human effort is wasted on known patterns  

---

## ✅ Solution Summary

This project introduces a **Learned Memory Layer** that sits **on top of invoice extraction** and enables the system to:

- Recall relevant past learnings  
- Apply vendor- and pattern-specific corrections  
- Decide whether to **auto-apply**, **suggest**, or **escalate**  
- Learn continuously from human resolutions  
- Remain **fully explainable and auditable**  

---

## 🧱 System Architecture
```
┌─────────────────────┐
│ Extracted Invoice │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Recall Memory │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Apply Memory │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Decision Engine │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Learn & Persist │
└─────────┬───────────┘
          ↓
┌──────────────────────────────────┐
│ Explainable Output + Audit Trail │
└──────────────────────────────────┘
```
All logic runs in **Node.js** using **TypeScript (strict mode)** with **persistent memory storage (SQLite)**.

---

## 🧠 Memory Types Implemented

### 1️⃣ Vendor Memory

Stores **vendor-specific patterns**, including:

- Label mappings  
  *(e.g. `Leistungsdatum` → `serviceDate`)*  
- VAT inclusion behavior  
- Currency conventions  
- Description → SKU mappings  
  *(e.g. `Seefracht` → `FREIGHT`)*  

**Purpose:**  
Enable **consistent normalization** for future invoices from the same vendor.

---

### 2️⃣ Correction Memory

Learns from **repeated human corrections**, such as:

- VAT recalculation from gross totals  
- Quantity mismatches resolved via delivery notes  
- Correct PO selection when multiple candidates exist  

**Purpose:**  
Reduce **repeated manual corrections** across similar invoices.

---

### 3️⃣ Resolution Memory

Tracks how discrepancies were resolved:

- Approved  
- Rejected  
- Overridden  

**Purpose:**  
Prevent incorrect patterns from dominating and **reinforce only successful learnings**.

---

## 🔁 Core Processing Loop

Each invoice passes through a **deterministic processing pipeline**:

---

### 1️⃣ Recall

- Retrieves **vendor** and **correction memory**
- Matches purchase orders and delivery notes
- Detects possible duplicates
- Extracts relevant raw-text signals

---

### 2️⃣ Apply

- Suggests field normalizations
- Proposes corrective actions
- Adjusts confidence based on historical success

---

### 3️⃣ Decide

Actions are selected based on **confidence thresholds**:

- **Auto-apply** → High confidence  
- **Suggest** → Medium confidence  
- **Escalate for human review** → Low confidence or detected duplicates  

---

### 4️⃣ Learn

After human input:

- Reinforces successful memory patterns
- Decays or weakens failed patterns
- Records all changes in the audit trail

---

## 📊 Confidence Model

Confidence is tracked as a **numeric score between `0.0` and `1.0`**.

### Reinforced when:
- Human approves a suggested correction
- Vendor-specific patterns repeat successfully

### Decayed when:
- A suggested correction is rejected
- Conflicting evidence appears

---

### ✅ Design Guarantees

- No single incorrect learning can dominate the system
- Confidence evolves **gradually and safely**
- Trust is built over time through validated outcomes

---

## 🔍 Explainability & Audit Trail

Every invoice produces a fully explainable output. The system provides transparency into the "thought process" behind every action, including:

* **Memory Recall:** What historical data was retrieved.
* **Correction Logic:** Why a specific correction was suggested.
* **Decision Rationale:** Why a final action was taken.
* **Confidence Shift:** How confidence levels evolved during processing.
* **Knowledge Acquisition:** What new memory was stored for future use.

### Audit Log Schema
Each step is logged using a standardized JSON structure:

```json
{
  "step": "recall | apply | decide | learn",
  "timestamp": "ISO-8601-String",
  "details": "Descriptive text of the internal logic"
}
```
> This ensures the system remains Auditable, Debuggable, and Enterprise-ready.

## 📤 Output Contract (Guaranteed)

For every invoice, the system outputs:

```json
{
  "normalizedInvoice": { "...": "..." },
  "proposedCorrections": [ "..." ],
  "requiresHumanReview": true,
  "reasoning": "Why memory was applied and decisions were taken",
  "confidenceScore": 0.0,
  "memoryUpdates": [ "..." ],
  "auditTrail": [ ... ]
}
```
> This contract is strictly followed in all demo runs.

## 🧪 Demonstration of Learning (Key Requirement)

The demo explicitly shows **learning over time**:

### Invoice #1
- Issues detected  
- Human correction applied  
- Memory stored  
- Conservative decision (human review)

### Invoice #2 (same vendor / pattern)
- Memory recalled  
- Fewer flags  
- Smarter suggestions  
- Higher confidence  
- Reduced need for human review  

✅ This directly satisfies the **most important requirement of the assignment**.

---

## 🛠 Tech Stack

- **Language:** TypeScript (strict mode)  
- **Runtime:** Node.js  
- **Persistence:** SQLite (memory persists across runs)  
- **Approach:** Heuristic-based (no ML training)  
- **Focus:** Learning, explainability, correctness  

---

## 📌 Design Principles

- Deterministic & explainable (no black-box ML)  
- Memory-first decision making  
- Human-in-the-loop by default  
- Confidence reinforcement + decay  
- Safe automation over aggressive auto-application  

---

## 📝 Notes on UI / Frontend

UI and visualization are **not required** for this assignment and are treated as **optional enhancements**.

The core system is fully functional and demonstrable using:

- CLI execution  
- JSON outputs  
- Logged audit trails  

---

## 📎 How to Run the Demo

```bash
npm install
npm run demo
```
## 🎬 Demo Video

The submission includes a demo video showing:

- Initial invoice processing  
- Human correction application  
- Memory persistence  
- Improved behavior on subsequent invoices  

---

## ✅ Conclusion

This project demonstrates how a **memory-driven AI agent** can significantly improve invoice automation by:

- Learning from real-world corrections  
- Adapting to vendor-specific behavior  
- Remaining explainable and auditable  
- Increasing automation confidence over time  

---
## 👨‍💻 Author

**Ayush Raj**  
AI Systems • Automation • Agent Design  

📧 **Email:** rajaayushwow0@gmail.com  
🔗 **LinkedIn:** https://www.linkedin.com/in/ayussh-raj

---
