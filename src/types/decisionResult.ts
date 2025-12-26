export type DecisionResult = {
    requiresHumanReview: boolean;
    decision: "auto-apply" | "suggest" | "escalate";
    reasoning: string;
    finalConfidence: number;
  };
  