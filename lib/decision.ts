export function getRecommendation(alignmentScore: number) {
  if (alignmentScore >= 75) return "Proceed";
  if (alignmentScore >= 50) return "Consider";
  return "Reject";
}

export function calculateAlignmentScore(
  expectedReturn: number,
  timeCost: number,
  layerImpact: number
) {
  const roi = expectedReturn <= 0 ? 0 : Math.min(100, (expectedReturn / Math.max(timeCost, 1)) * 10);
  const impact = Math.min(100, Math.max(0, layerImpact * 20));
  return Math.round(roi * 0.6 + impact * 0.4);
}
