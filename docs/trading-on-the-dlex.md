---
sidebar_position: 5
---

# Trading on the DLEX

Ammalgam’s DLEX is a full-featured trading engine where users can take leveraged positions directly against the liquidity pools they help supply. The unified interface and deposit mechanism lets users swap, long, short, and hedge while earning yield.

## Perpetuals Engine Overview
The DLEX operates based on a perpetuals-style engine that allows for directional exposure with margin. Unlike traditional perps, positions are opened directly within Dual-Purpose Pools (DP Pools), enabling native access to liquidity and removing the need for external matching engines or segregated order books.

All positions are:
- <strong>Isolated</strong> to individual AMM pairs (e.g., WBTC/USDC)
- <strong>Overcollateralized</strong> with assets from your pool deposit
- <strong>Continuously adjusted</strong> based on real-time pool state, oracles, and utilization rates

Every trade is collateralized with productive capital that's still earning protocol yield in the background.

## Opening & Closing Positions
To <strong>open a position</strong>, go to the Trade tab and choose your asset pair.
- <strong>Long</strong>: Borrow the counter-asset to gain upside exposure (e.g., borrow USDC to buy ETH).
- <strong>Short</strong>: Borrow the target asset and sell it to take a bearish stance (e.g., borrow ETH and receive USDC).

Trades use your existing vault deposits as margin. Once you approve the assets, you can submit the order, which is instantly routed through the pool. There's no need to swap between protocols or wrap/unwrap assets.

To <strong>close a position</strong>, simply reverse the trade. PnL is automatically settled back into the pool.

Positions are visible directly in the pool view and DLEX dashboard, with real-time metrics on margin ratio, entry price, liquidation level, and unrealized PnL.

## Order Types (Market, Limit, Conditional)
Ammalgam's DLEX supports multiple order types for flexibility:
- <strong>Market Order</strong>: Execute instantly at the current pool price.
- <strong>Limit Order</strong> (upcoming): Set your own price and wait for it to be filled.
- <strong>Conditional Order</strong> (upcoming): Trigger positions based on external price movements, oracle thresholds, or liquidation signals.

All trades are matched directly against on-chain liquidity. You're trading with the pool rather than an external counterparty.

## Margin Requirements
Ammalgam uses isolated margin per pool pair. Your margin is calculated from your deposit in that specific vault.
Key points:
- You cannot be liquidated due to positions in another pool.
- You can borrow up to your pair's <strong>Max LTV</strong>, adjusted dynamically based on utilization and price volatility.
- Positions that exceed safe LTV thresholds are eligible for liquidation via the <strong>price-dependent liquidation mechanism</strong>.

This system prevents contagion and limits systemic risk, even during market turbulence.

## Profit and Loss (PnL), Liquidations, Funding
The DLEX calculates <strong>PnL</strong> based on the current pool price vs. your entry price. Gains and losses accrue in the margin asset you used to open the position.

Liquidations are handled using <strong>Price-Dependent Liquidations</strong>, a Dutch auction-style mechanic that dynamically adjusts incentives for liquidators based on how far the price has moved past the liquidation threshold. This protects borrowers from premature liquidation while still securing the protocol.
We also include a <strong>funding rate system</strong>, similar to perpetual futures:
- Funding rates are driven by <strong>pool utilization</strong>, not external open interest.
- If demand to long/short becomes unbalanced, funding costs adjust to incentivize the other side.
- This results in natural rebalancing of open interest and protection from one-sided risk buildup.

## Fees Breakdown
Fees on the DLEX are designed to reward LPs and ensure sustainability:

| Fee Type                   | Details                                                                 |
|---------------------------|-------------------------------------------------------------------------|
| Swap Fee                  | Paid to LPs during any trade (configurable per pool)                     |
| Borrow Spread             | LPs earn interest; traders pay based on utilization tier                 |
| Liquidation Premium/Discount | Applied during forced closures, scaling with price deviation           |
| Funding Payments          | Continuous rebalancing paid between longs/shorts via utilization curve   |
| Exit Fee (if applicable)  | Used to discourage short-term farming and reward longer-term liquidity   |








