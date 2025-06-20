---
sidebar_position: 6
---

# Capital Efficiency & Slippage Mitigation

Ammalgam maximizes capital efficiency by combining trading and lending within a unified AMM structure. It uses the constant product formula $X \times Y = K$, with liquidity tracked as $L = \sqrt{K}$.

Each asset serves as both trading liquidity and lending collateral, so liquidity providers can earn swap fees and lending interest from a single position. Borrowers draw capital directly from DP Pools with interest rates that adjust automatically based on real-time utilization.

Rates increase sharply as utilization rises. This encourages deleveraging and rebalancing before liquidity becomes critically low. If reserves drop too far, Ammalgam's Depleted Asset Protection adjusts the invariant curve to preserve swaps and allow the system to recover without external intervention.

Slippage mitigation is built into the lending process. Before approving any loan, the protocol calculates a Slippage-Adjusted Loan-to-Value (LTV) ratio. It estimates how much slippage would occur if the collateral had to be liquidated under current conditions. If the position would cause too much slippage or threaten reserve stability, the loan is blocked. Large positions are tracked across tranches to prevent over-concentration.

By embedding capital efficiency, slippage-aware risk checks, and liquidity protection into the core design, Ammalgam keeps assets productive, users protected, and the system resilient.
