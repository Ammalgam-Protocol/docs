---
sidebar_position: 2
---

# DLEX: Smart Order Routing & Execution

The Decentralized Lending Exchange is at the core of Ammalgam's execution and settlement architecture. It integrates AMM trading mechanics and lending functions within a unified liquidity layer.

DLEX governs the behavior of Dual Purpose Pools (DP Pools), coordinating swap execution, loan origination, and interest accrual without relying on external oracle feeds or fragmented liquidity sources. The Smart Order Routing engine inside DLEX automatically selects the most efficient execution path across DP Pools. By concentrating liquidity within multipurpose pools and minimizing fragmentation, DLEX significantly reduces routing overhead, increases capital inefficiency, and reduces price impact relative to traditional AMMs.

Legacy DeFi architectures treat trading and lending as isolated systems, requiring users to manually bridge between pools and protocols to achieve leveraged, hedged, or yield-optimized strategies.

DLEX combines trading and lending into a single execution layer, so capital can move more easily and strategies don't have to be split across platforms. Users can combine or layer different financial strategies (e.g., lending, LPing, borrowing, hedging) within a single system. The absence of oracles or external data feeds keeps the system more secure, more efficient, and fully decentralized without giving up execution quality or lending flexibility.

When a trade is initiated, DLEX evaluates the pool's current reserve balances, active borrow positions, and lending rates to execute the transaction in a manner that optimizes both swap pricing and capital deployment.

- Swaps are executed directly against DP Pools where the protocol dynamically adjusts internal accounting for both the trading and lending sides of the pool.
- Borrowers source liquidity from the same pools that provide trading depth, and DLEX ensures that borrowing rates and trading slippage adjust according to pool conditions in real time.