import { RecallContext } from "../types/recallContext";
import { ApplyResult } from "../types/applyResult";
import { DecisionResult } from "../types/decisionResult";

export function decideAction(
  baseConfidence: number,
  applyResult: ApplyResult,
  context: RecallContext
): DecisionResult {
  let finalConfidence = baseConfidence + applyResult.confidenceDelta;

  // ✅ Reinforce confidence if learned memory exists
  if (context.hasMemory) {
    finalConfidence += 0.05; // small but meaningful reinforcement
  }

  // Cap confidence safely
  finalConfidence = Math.min(1, finalConfidence);

  // 🚨 Duplicates always escalate
  if (context.isPossibleDuplicate) {
    return {
      requiresHumanReview: true,
      decision: "escalate",
      finalConfidence,
      reasoning:
        "Invoice appears to be a duplicate based on vendor, invoice number, and date proximity. Escalated to prevent duplicate processing."
    };
  }

  // ✅ High confidence → auto-apply
  if (finalConfidence >= 0.85) {
    return {
      requiresHumanReview: false,
      decision: "auto-apply",
      finalConfidence,
      reasoning:
        context.hasMemory
          ? "High confidence reinforced by learned vendor memory and consistent historical patterns. Safe to auto-apply corrections."
          : "High confidence based on consistent signals. Safe to auto-apply corrections."
    };
  }

  // ⚠️ Medium confidence → suggest
  if (finalConfidence >= 0.6) {
    return {
      requiresHumanReview: true,
      decision: "suggest",
      finalConfidence,
      reasoning:
        "Moderate confidence. Suggested corrections align with known patterns but require human verification."
    };
  }

  // ❌ Low confidence → escalate
  return {
    requiresHumanReview: true,
    decision: "escalate",
    finalConfidence,
    reasoning:
      "Low confidence. Insufficient or conflicting historical evidence to safely apply corrections automatically."
  };
}
