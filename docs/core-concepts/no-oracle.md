---
sidebar_position: 5
title: "No-Oracle Design"
---

import { Tweet } from 'react-tweet';

# No-Oracle Design & Funding Rate

Ammalgam operates without any dependence on other protocols or oracles. In order to facilitate lending, we must define the concept of price so that assets can be valued at for the purpose of properly comparing collateral securing them. There are three key components to our method of defining price:

1. Defining price as a range rather than a single value. The upper and lower bounds of this range serve as the basis for evaluating debts and collateral at the most unfavorable, restrictive price in the range.
2. Implementing outlier detection to limit the maximum and minimum allowable price deviations from the current price range within a block. This helps deter price manipulation attempts by increasing the associated costs.
3. Restricting positions based on the slippage required to liquidate the collateral to pay back the debt using the available liquidity in the pool.

The last restriction works well for individual positions, but does not stop someone from breaking up a single position that is too large for the available liquidity into multiple positions across multiple addresses that each individually meet the slippage requirements. For this we create tranches, or large ticks, across the entire price range that track each potential liquidation to ensure to limit the potential for cascading liquidations.

### Price Ranges
This library tracks prices on a per-block basis by looking at the trading reserves at the start of each block. This provides three key metrics:

- the price at the end of the most recent block,
- the geometric mean price of the last 64 blocks,
- the geometric mean price over a longer-term period that can be configured.

The duration of this long-term period is flexible and can be configured to span a day, a week, or even a month but will start as 1 week. After deployment, before price windows are filled, pools can be swap-only. No borrowings until all windows are passed.

The minimum of all three prices is used to evaluate collateral value when a new position is opened. By taking the minimum and maximum values of these three prices, we establish the price range used within the protocol. The last block and mid term price would be used for the purpose of liquidations where the better price for the borrower would be used.



### Depleted Asset Protection

Ammalgam is an automated market maker that lends out unutilized assets. As prices change, the amount of each asset in the contract changes. The asset increasing in value decreases in quantity as the asset decreasing in value increases in quantity. At some point the AMM could exhaust reserves of one asset if loans are not repaid or there are not enough people willing to supply the appreciating asset. This situation is most likely to occur in a market condition known as a *gamma squeeze* where the appreciating asset was previously heavily borrowed or shorted. Those ‘squeezed’ debts then start to balloon leading to forced selling of the depreciating asset that is being used as collateral. Some examples of this gamma squeeze include (1) in May 2022 when UST lost its peg to the dollar and firms like Three Arrows had used leverage to multiply the return on their deposits of UST into Anchor and (2) when retail traders worked together to purchase GameStop to force large trading firms with shorts on the stock to close their positions at a substantial loss. Gamma squeezes can also be referred to as death spirals as the forced trades can create a feedback loop further escalating the trade momentum resulting in violent price changes.

Below are some examples of how the UST de-pegging exhausted reserves on Uniswap v3 UST/USDC pool and emptied the Binance UST/USDT book. These are shared to point out that this condition is not unique to Ammalgam’s design, but has happened in other DeFi protocols and centralized exchanges. For Ammalgam, it is critical to know what the market thinks each asset is worth at all times in order to appropriately value collateral for outstanding loans.

<Tweet id="1523782169276997633" />

<Tweet id="1523817151471230976" />