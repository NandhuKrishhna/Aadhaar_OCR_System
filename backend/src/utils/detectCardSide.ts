export const detectCardSide = (text: string): "front" | "back" | "invalid" => {
    const clean = text.replace(/\s+/g, ' ').toLowerCase();

    const hasAadhaarNum = /\d{4} \d{4} \d{4}/.test(clean);
    const hasDob = /dob|date of birth|birth/i.test(clean); // Looser matching
    const hasGender = /\bmale\b|\bfemale\b/i.test(clean);
    const hasGovt = /government\s*of\s*india|governmentofindia/i.test(clean); // Allow joined words

    const hasAddress = /c\/o|s\/o|d\/o|w\/o/i.test(clean); // Common address prefixes
    const hasPincode = /\b\d{6}\b/.test(clean);

    const isFrontLikely = hasAadhaarNum && hasGovt && (hasDob || hasGender);
    const isBackLikely = hasAddress && hasPincode;

    if (isFrontLikely && !isBackLikely) return "front";
    if (isBackLikely && !isFrontLikely) return "back";

    return "invalid";
};
