---
sidebar_position: 6
sidebar_label: "Dual Purpose Pools"
---

# Dual Purpose Pools (DP Pools)
DP Pools eliminate capital inefficiency by fusing lending and trading into a single composable system. Amalgam doesn’t silo liquidity into separate modules for swaps, lending, or margin. Instead, DP Pools allow capital to flow dynamically between these functions depending on user behavior and market conditions.

Each DP Pool is structured as an isolated AMM pair where liquidity can be:
- Lent out to earn interest,
- Deployed for swaps to earn fees, and
- Used as collateral for leveraged positions all at once.

Capital allocation is continuously rebalanced in real time, and market demand for borrowing or trading determines how each side of the pool is used. This makes every LP share inherently multi-functional.

## Providing Liquidity
Luidity providers must deposit a supported pair (e.g. ETH/USDC) into a pool via the Pools tab. Upon deposit:
- Assets are recorded in vaults where they remain non-custodial.
- These vaults represent composable capital that can be lent or traded against.
- There’s no need for external liquidity management or manual rebalancing.

Users may also configure custom strategies in the <strong>DLEX</strong> tab, specifying how their liquidity behaves to earn passively or actively back trades.

## Yield Generation
DP Pools generate yield through several sources to amplify gains:

### Lending Yield
Idle liquidity is algorithmically matched with borrowers, generating interest. Lending rates follow a dynamic three-tier utilization curve:
- Incentivizing borrow demand when utilization is low,
- Curbing overuse as it approaches 90%,
- And introducing aggressive rates beyond 90% to protect pool health.

### Trading Fees
Similarly to standard AMMs, LPs earn a portion of swap fees. These are routed directly to the vault and auto-compounded into the user’s position.

### Funding Payments
DP Pools in Ammalgam deploy a funding rate model similar to perpetual DEXs. Borrowers who hold leveraged long or short positions pay or receive funding based on utilization. These payments are distributed to LPs and help keep open interest balanced.

## Risks for LPs
Like any DeFi system, DP Pools involve risks:
- <strong>Impermanent Loss</strong> still applies when price ratios diverge significantly.
- <strong>Liquidation Risk</strong> exists when LP collateral backs undercollateralized loans, but is mitigated by real-time LTV monitoring and Dutch auction-based liquidations.
- <strong>Volatility Risk</strong> is partially managed by dynamic swap pricing and tiered interest rate curves to prevent pool depletion.
- <strong>Strategy Misconfiguration</strong> for advanced users deploying custom recipes can result in unbalanced exposure.

All risks are <strong>contained within isolated pools</strong>, reducing contagion and cross-asset exposure.

### Pool Composition & Rebalancing
Each pool is composed of a two-token pair, with vaults tracking:
- Actual reserves (assets held),
- Lent out amounts,
- Outstanding debt positions,
- And active liquidity.

When utilization crosses key thresholds (e.g. 90%), rebalancing kicks in through:
- Dynamic Swap Pricing, which adds a premium to trades that remove scarce assets and a discount to those that replenish them.
- Aggressive Borrow Rate Escalation, incentivizing liquidity inflows and debt repayment.

This keeps the pool solvent and functional, even under high-stress market conditions

### Exit Mechanics
Users can exit their position at any time from the Pools tab or the DLEX tab’s View Pool interface. Upon withdrawal:
- Assets are redeemed from the vault.
- If the pair is under high utilization, slippage and delay may occur.
- Partial withdrawals are supported, and LPs can choose to unwind only a portion of their strategy.

Any open trade or strategy-related position must be closed before fully exiting the pool. The interface provides real-time feedback if constraints apply.








