---
sidebar_position: 4
sidebar_label: "Strategies"
---

# Strategies: The Recipe Menu

Ammalgam’s DLEX functions as a composable strategy engine. Users can use the DLEX tab to configure and deploy complex strategies that blend lending, liquidity provisioning, and leveraged trading into a single unified position. 
Strategies are executed using a system of modular templates called recipes. Each recipe defines a market exposure profile and risk-reward curve based on your deposit, collateral, and chosen leverage. Users can mix and match exposure, delta, and gamma settings to shape performance across different market conditions.

### Strategy Types

#### Market Making
Deploy two-sided liquidity to earn swap fees and lending interest. Market Making in Ammalgam gives you exposure to price movement while also capturing protocol yield. Positions carry negative gamma but benefit from volatility within a bounded range.

### Long / Short
Directional bets with leverage. Go Long on an asset by borrowing the counter-asset (e.g. borrow USDC to buy WBTC) or go Short by borrowing the asset and selling it. All positions are collateralized using your existing deposits.

### Leveraged Market Making
Amplify exposure to fee income and price movement. Similar to basic Market Making, but with borrowed LP shares to enhance gains during stable conditions but with increasedimpairment risk during high volatility.

### Delta-Neutral Market Making
Earn yield from lending and trading fees while maintaining minimal price exposure. This strategy configures positions so delta is close to zero, reducing directional risk. Useful for traders seeking passive income without betting on price.

### Long/Short Market Making
Blend directional exposure with LP activity. For example, go long WBTC while providing liquidity to the WBTC/USDC pool. You earn fees, gain on asset appreciation, and optimize capital usage by reusing collateral.

### Straddles
Straddles combine long and short volatility positions, profiting from large price swings in either direction. Great in volatile markets. Deploy capital to both sides and balance risk with gamma controls.

### Calls / Puts
Synthetic options strategies created using combinations of borrowing and liquidity provisioning. Mimic the payoff structure of call or put options without needing external option markets. Suitable for traders familiar with options Greeks.

### Perpetuals
Simulate perpetual futures by taking leveraged long/short positions with ongoing funding payments. Funding rates are determined by pool utilization, creating natural incentives to rebalance open interest.
