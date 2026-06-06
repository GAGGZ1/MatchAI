function calculateBusinessScore(
  currentUser,
  candidate
) {
  let score = 0;

  // Common Interests
  const commonInterests =
    candidate.interests?.filter(
      interest =>
        currentUser.interests?.includes(
          interest
        )
    ).length || 0;
  score += commonInterests * 10;

  // Location Match
  if (
    candidate.city === currentUser.city
  ) {
    score += 20;
  }

  if (
    candidate.state === currentUser.state
  ) {
    score += 10;
  }

  // Children preference
  if (
    candidate.wantsChildren ===
    currentUser.wantsChildren
  ) {
    score += 20;
  }

  // Relocation preference
  if (
    candidate.openToRelocate ===
    currentUser.openToRelocate
  ) {
    score += 15;
  }

  // Family Preference
  if (
    candidate.familyType ===
    currentUser.familyType
  ) {
    score += 15;
  }

  // Religion Match
  if (
    candidate.religion &&
    currentUser.religion &&
    candidate.religion === currentUser.religion
  ) {
    score += 15;
  }

  // Marital Status Match
  if (
    candidate.maritalStatus &&
    currentUser.maritalStatus &&
    candidate.maritalStatus === currentUser.maritalStatus
  ) {
    score += 10;
  }

  // Relationship Goal Match
  if (
    candidate.relationshipGoal &&
    currentUser.relationshipGoal &&
    candidate.relationshipGoal === currentUser.relationshipGoal
  ) {
    score += 20;
  }

  // Common Languages
  const commonLanguages =
    candidate.languagesKnown?.filter(
      lang =>
        currentUser.languagesKnown?.includes(lang)
    ).length || 0;
  score += commonLanguages * 5;

  // Education Match
  if (
    candidate.highestEducation &&
    currentUser.highestEducation &&
    candidate.highestEducation === currentUser.highestEducation
  ) {
    score += 10;
  }

  // Profession/Career Match
  if (
    candidate.profession &&
    currentUser.profession &&
    candidate.profession.toLowerCase() === currentUser.profession.toLowerCase()
  ) {
    score += 5;
  }

  // Deal Breakers Check (negative score)
  if (candidate.dealBreakers && currentUser.dealBreakers) {
    const hasCommonDealBreaker = currentUser.dealBreakers.some(
      breaker => candidate.dealBreakers.includes(breaker)
    );
    if (hasCommonDealBreaker) {
      score = Math.max(0, score - 50);
    }
  }

  // Personality Compatibility (if personality data exists)
  if (candidate.personality && currentUser.personality) {
    const personalityDifference =
      Math.abs(candidate.personality.introvert - currentUser.personality.introvert) +
      Math.abs(candidate.personality.career - currentUser.personality.career) +
      Math.abs(candidate.personality.adventure - currentUser.personality.adventure);
    
    // Lower difference = higher compatibility
    const personalityScore = Math.max(0, 30 - (personalityDifference * 1.5));
    score += personalityScore;
  }

  // Pets preference
  if (
    candidate.openToPets ===
    currentUser.openToPets
  ) {
    score += 5;
  }

  return Math.min(score, 100);
}

module.exports = {
  calculateBusinessScore,
};