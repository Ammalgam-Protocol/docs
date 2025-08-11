---
sidebar_position: 10
---

# Over-Saturation Penalty

The penalty system in the saturation library is designed to incentivize proper risk management. It
not only aims to fairly compensate LPs during various states of borrow and saturation utilization,
but also prevents cascading liquidations. Therefore, a dynamic risk pricing system is required to
create a self-balancing mechanism that maintains the protocol health.

## Time-based penalty accrual

The protocol calculates penalty accrual using a time-based system. The
[accruePenalties](https://docs.ammalgam.xyz/docs/developer-guide/contracts/libraries/Saturation.sol/library.Saturation#accruepenalties)
function in Saturation.sol takes a `duration` parameter that is defined as the `delta` between the
current time and the last time penalty was accrued. See the call stack in `AmmalgamPair.sol`:
`accrueSaturationPenaltiesAndInterest -> mintPenalties -> accruePenalties`.

## Penalty threshold

Penalties only start accruing when the aggregate saturation exceeds 85%
(`START_SATURATION_PENALTY_RATIO_IN_MAG2 = 85`). The system tracks saturation across all positions
in aggregate. When calculating the total saturation in penalty, see `calcTotalSatAfterLeafInclusive`
in Saturation.sol, the threshold leaf is checked against the highest set leaf.

When `thresholdLeaf > highestSetLeaf` it means that the leaf corresponding to the 85% saturation
threshold is higher than any leaf containing positions. Since `highestSetLeaf` represents the
highest leaf with any saturation, this means that the aggregate saturation across all positions has
not reached the 85% threshold. In other words, the liquidation of all positions at any given point
in the tree has not reached the 85% saturation threshold.

On the other hand, if all positions in a tranche have reached/surpassed the 85% saturation
threshold, `maxLeaf > thresholdLeaf`, then the system loops through the leaves between
`thresholdLeaf` and `maxLeaf` and adds up all of the saturation (`satInLAssets`). The sum of all
the saturation is then returned as the `satInLAssetsInPenalty`, which will be used to calculate the
penalty rate.

## Penalty rate calculation

Penalty formula:
```math
penaltyRate = ((1 - u_0) × f_{interest}(u_1) × totalDeposits) / (saturationInPenalty)\
```

ref: [calcSaturationPenaltyRatePerSecondInWads](https://docs.ammalgam.xyz/docs/developer-guide/contracts/libraries/Saturation.sol/library.Saturation#calcsaturationpenaltyratepersecondinwads) in Saturation.sol

The penalty rate calculation is a dynamic risk pricing system. The rate will change based on
`borrow utilization` and `saturation utilization`. The motivation of this design is to ensure that
LPs are properly compensated and protocol health is maintained. The relationship of the utilization
metrics to penalty rate is as follows:

- Borrow utilization: lower utilization -> higher penalty rate.
- Saturation utilization: higher utilization -> higher penalty rate.

The formula above defines this relationship by using (1 - u_0), where
`u_0 = current borrow utilization` that results in a scaling factor. For example:

1. $u_0 = 10\%$ -> $(1 - 10\%) = 90\%$ scaling factor
2. $u_0 = 90\%$ -> $(1 - 90\%) = 10\%$ scaling factor

**Economic Incentives**

The inverse relationship of borrow utilization with penalty rate is essentially because the protocol
needs to balance between two objectives:

1. Discourage over-saturation of liquidation risk in any given tranche.

- `Low` borrow utilization and `high` saturation utilization = high penalty rate

2. Maintain system stability by preventing cascading liquidations.

- `High` borrow utilization and `high` saturation utilization = relatively lower penalty rate

_Lower borrow utilization_

When borrow utilization is low (e.g. $u_0 = 10\%$), this means:

- 90\% of deposited liquidity is sitting idle, earning no interest.
- Lots of liquidity available to absorb the impact if a position is liquidated.

Under the above conditions, if positions in aggregate become over-saturated, they are creating risk
in an environment with lots of idle liquidity. Since liquidations are less of a concern, goal #1
becomes more important, where a higher penalty rate can be charged to ensure that the LPs are
properly compensated for the risks created. This relatively high penalty rate will also discourage
further increases in aggregate saturation.

_Higher borrow utilization_

Conversely, if the borrow utilization is high (e.g. $u_0 = 90\%$), this means:

- Only 10\% of liquidity is sitting idle, meaning LPs are earning plenty of interest from the 90\%
  borrow utilization.
- Not a lot of liquidity available to absorb liquidations

At these high borrow utilization levels, LPs are already properly compensated from the earned
interests, goal #2 becomes more important. The protocol needs to prioritize maintaining system
stability over penalizing high aggregate saturation. It is critical to prevent cascading
liquidations rather than charging a higher penalty rate.

The relationship of `borrow utilization` and `saturation utilization` with penalty rate described
above can be visualized in the desmos below:

<iframe src="https://www.desmos.com/calculator/ewa7ha8fpw?embed"
  frameBorder="0"
  allowFullScreen
  width="100%"
  height="600"
></iframe>

## Summary

In summation, the penalty system serves various purposes:

1. Risk management: incentivizes borrowers to restructure debt to create healthy saturation levels,
   by making all positions in over-saturated tranches expensive.
2. LP protection: properly compensates LPs when they are unable to withdraw.
3. System stability: dynamic risk pricing to prevent cascading liquidations.
