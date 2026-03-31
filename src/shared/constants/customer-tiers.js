export const CUSTOMER_TIERS = [
  {
    tier_id: 1,
    tier_name: "Starter",
    cashback_percent: 10,
    range_from: 0,
    range_to: 100
  },
  {
    tier_id: 2,
    tier_name: "Bronze",
    cashback_percent: 12,
    range_from: 100,
    range_to: 200
  },
  {
    tier_id: 3,
    tier_name: "Silver",
    cashback_percent: 14,
    range_from: 200,
    range_to: 300
  },
  {
    tier_id: 4,
    tier_name: "Gold",
    cashback_percent: 16,
    range_from: 300,
    range_to: 400
  },
  {
    tier_id: 5,
    tier_name: "Platinum",
    cashback_percent: 18,
    range_from: 400,
    range_to: 500
  },
  {
    tier_id: 6,
    tier_name: "Signature",
    cashback_percent: 20,
    range_from: 500,
    range_to: 999999
  }
];

export function resolveCustomerTier(totalEarned) {
  const normalizedTotalEarned = Number(totalEarned);

  if (Number.isNaN(normalizedTotalEarned)) {
    return CUSTOMER_TIERS[0];
  }

  return (
    CUSTOMER_TIERS.find(
      (tier) =>
        normalizedTotalEarned >= tier.range_from &&
        normalizedTotalEarned < tier.range_to
    ) || CUSTOMER_TIERS[CUSTOMER_TIERS.length - 1]
  );
}
