---
sidebar_position: 10
---

# Penalization of over-saturated positions

The penalty system in the saturation library is designed to incentivize proper risk management. It aims to fairly compensate LPs during various states of borrow and saturation utilization. Therefore, a dynamic risk pricing system is required to create a self-balancing mechanism that maintains the protocol health.

## Time-based penalty accrual

The protocal calculates penalty accrual using a time based system. `accruePenalties` function in Saturation.sol take a a `duration` parameter that is defined as the `delta` between the current time and the last time penalty was accrued. See the call stack in `AmmalgamPair.sol`: `accrueSaturationPenaltiesAndInterest -> mintPenalties -> accruePenalties`.

## Penalty threshold

Penalties only starts accruing when a position saturation exceeds 85% (START_SATURATION_PENALTY_RATIO_IN_MAG2 = 85). When calculating the total saturation in penalty, see `calcTotalSatAfterLeafInclusive` in Saturation.sol, the threshold leaf is checked against the maxLeaf.

When `threasholdLeaf > maxLeaf` it means that the leaf that corresponds to a penalty threshold of 85% saturation is higher than any leaf containing a position. Since `maxLeaf` is defined as `tree.highestSetLeaf`, this means that no position has been set to a leaf that is higher than the threshold leaf. In other words, no position has reached the 85% saturation threshold.

On the other hand, if the a position has reached/surpasses the 85% saturation threshold, (`maxLeaf > thresholdLeaf`), then we loop through the leaves between `thresholdLeaf` and `maxLeaf` and add up all of the saturation (`satInLAssets`). The sum of all the saturation is then returned as the `satInLAssetsInPenalty`, which will be used to calculate the penalty rate.

## Penalty rate calculation

```
Penalty formula:

penaltyRate = ((1 - u₀) × f_interest(u₁) × totalDeposits) / (saturationInPenalty)

ref: ` calcSaturationPenaltyRatePerSecondInWads` in Saturation.sol
```

The penalty rate calculation is a dynamic risk pricing system. The rate will change based on `borrow utilization` and `saturation utilization`. The motivation of this design is to ensure that LPs are properly compensated and protocol health is maintained. The relationship of the utilization metrics to penalty rate is as follows:

- Borrow utilization: lower utilization -> higher penalty rate.
- Saturation utilization: higher utilization -> higher penalty rate.

The formula above defines this relationship by using (1 - u₀), where `u₀ = current borrow utilization` that results in a scaling factor. For example:

1. u₀ = 10% -> (1 - 10%) = 90% scaling factor
2. u₀ = 90% -> (1 - 90%) = 10% scaling factor

**Economic incentive**

The inverse relationship of borrow utilization with penalty rate is due to the motivation of ensuring that LPs are property compensated from an opportunity cost perspective and also maintaining protocal health. It essentially needs to balance between two objectives:

1. Discourage over-saturated positions (high penalty rate)
2. Maintain system stability by preventing cascading liquidation. (low penalty rate)

*Lower borrow utilizaiton*

When borrow utilization is low (e.g. u₀ = 10%), this means:
- 90% of deposited liquidity is sitting idle, earning no interest.
- Lots of liquidity available to absorb the impact if a position is liquidated.

Under the above conditions, if someone creates an over-saturated position, they are creating risk in an environment with lots of idle liquidity. Since liquidations are less of a concern goal #1 becomes more important, where a higher penalty rate can be charged to ensure that the LPs are properly compensated for the risks created. This relatively high interest rate will also discourage over-saturated positions.

*Higher borrow utilization*

Conversely, if the borrow utilization is high (e.g. u₀ = 90%), this means:
- Only 10% of liquidity is sitting idle, meaning LPs are earning plenty of interests from the 90% borrow utilization.
- Not a lot of liquidity available to absorb liquidations

At these high borrow utilization levels, LPs are already properly compensated from the earned interests, goal #2 becomes more important. The protocol needs to prioritize maintaining system stability over punishing over-saturated positions. It is critical to prevent cascading liquidations than charging a higher penalty rate.

The relationship of `borrow utiliztion` and `saturation utilitzation` with penalty rate described above can be visualized in the desmos below:

<iframe src="https://www.desmos.com/calculator/ewa7ha8fpw"
  frameBorder="0"
  allowFullScreen
  width="100%"
  height="600"
></iframe>

## Summary

In summation, the penalty system serves various purposes:
1. Risk management: forces borrowers to maintain healthy saturation levels, by making over-saturated positions increasingly expensive over-time.
2. LP protection: compensate LPs for increased risk relative to available liquidity.
3. System stability: dynamic risk pricing to prevent cascading liquidations.
