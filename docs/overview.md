---
sidebar_position: 1
---

import { Tweet } from 'react-tweet';

# Overview

Ammalgam introduces a new primitive in decentralized finance: the Decentralized Lending Exchange (DLEX). By combining trading and lending into a single protocol, DLEX unlocks a level of capital efficiency that traditional platforms can't match, offering up to a 60% increase in yield for liquidity providers.

This architecture supports a wide range of strategies, from passive LP participation to highly customizable, advanced positions. Whether you're looking for a set-and-forget yield experience or actively managing delta-neutral trades, Ammalgam offers the flexibility to do both without friction or fragmentation.

The protocol is fully autonomous, permissionless, and oracle-free. Ammalgam delivers a trustless, composable foundation for decentralized liquidity and lending at scale with no external dependencies and no centralized control.

## Core Philosophy
At Ammalgam, our philosophy is to redefine how capital moves in decentralized finance. By fusing lending and trading into a single primitive, we enable liquidity to move more efficiently and strategies to evolve without barriers. We believe in a future where autonomy, permissionlessness, and composability are not features, but defaults. We built Ammalgam to remove friction, maximize opportunity, and create a financial system that operates without intermediaries, external dependencies, or centralized control.

## Problems in the DeFi Ecosystem

### Capital is Fragmented Between Trading and Lending Protocols
Liquidity providers must choose between earning swap fees in AMMs or earning interest in lending platforms. Capital gets siloed, yield potential is limited, and users must actively manage assets across disconnected systems. Ammalgam unifies both functions within a single pool, removing the divide.

### Leveraged Strategies are Expensive and Complex
Market makers must borrow assets on one platform and deploy liquidity on another, incurring fees on both sides and taking on protocol bridging risk. Strategy execution becomes fragmented and capital inefficient. Ammalgam enables leveraged positions and borrowing directly in one pool.

### LP Returns are Constrained by Impermanent Loss and Split Yield
Traditional LPs risk impermanent loss and can only earn one type of yield at a time—either swap fees or lending interest, but not both. There's no easy way to build delta-neutral or hedged exposure natively. Ammalgam allows LPs to access both yield streams and unlock new payoff structures.

### Reserve Imbalance During Market Stress
As asset prices shift, AMMs naturally rebalance token reserves. In extreme conditions like gamma squeezes or death spirals, one side of the pool can be depleted if loans on the appreciating asset aren't repaid. Ammalgam uses a tiered protection system that intensifies during volatile markets and relaxes under normal conditions. Relying on dynamic lending limits, rising interest rates based on utilization, and adaptive swap pricing help prevent reserve exhaustion.

### Oracles Introduce Risk and Increase Surface Area for Exploits
Protocols rely on external price feeds, leaving them vulnerable to oracle manipulation, downtime, and liquidation errors—especially true in volatile markets. These dependencies can lead to systemic failures. Ammalgam eliminates this risk by using a fully on-chain, oracle-free design.

## What Makes Ammalgam Different (vs Traditional DEXs/Lending)

### Unified Protocol Architecture
Ammalgam's Decentralized Lending Exchange (DLEX) merges trading and lending into a single, seamless system. By consolidating core DeFi functions, Ammalgam removes the need for separate platforms, simplifying liquidity flows and making capital more efficient.

### Enhanced Capital Efficiency
Liquidity providers (LPs) earn from both swap fees and lending interest through a single position. The dual-earning model can drive up to a 20% increase in returns compared to traditional DeFi approaches, with assets working continuously across multiple revenue streams.

### Permissionless and Oracle-Free Design
Ammalgam operates without external price oracles or permissioned systems. By removing reliance on external inputs, the protocol reduces risks linked to oracle failures and centralized control points, creating a more autonomous, resilient financial layer.

### Advanced Strategy Support
Ammalgam's architecture supports advanced trading strategies beyond passive yield generation, including delta-neutral positions, straddles, and leveraged market making. This flexibility opens the door for both sophisticated traders and passive LPs to optimize their returns based on individual risk preferences.

### User-Centric Visualization Tools
Ammalgam provides clear, intuitive visualization tools like payout charts and heat maps. These features help users better understand potential outcomes, assess risks, and make informed decisions as market conditions evolve.

## Key Components

- **DLEX (Decentralized Lending Exchange)**: The Decentralized Lending Exchange is Ammalgam's core innovation. It fuses trading and lending into a single, unified protocol layer where both actions happen within the same pools. The DLEX creates a permissionless environment where capital operates at maximum efficiency so users don't have to move across fragmented platforms.
- **Exchange**: Ammalgam is a fork of Uniswap V2 but is designed to allow LP positions with payouts similar to concentrated liquidity and thus has parity with any DEX. Ammalgam uses leverage when creating concentrated liquidity-like positions so users need to monitor for liquidations; however, they are compensated by earning fees far beyond the similar range created when using concentrated liquidity. In essence, instead of monitoring ranges, LPs now focus on liquidations but benefit from increased fees and, consequently, higher yields.
- **Dual Purpose Pools (DP Pools)**: DP Pools are the foundation of Ammalgam's architecture, allowing liquidity to be used for both trading and lending within the same pool. Rather than split capital across protocols or choosing between yield types, LPs can deploy once and gain exposure to multiple sources of return. DP Pools also introduce a flexible structure that supports everything from passive liquidity provision to complex strategies like delta-neutral and leveraged positions—all within the Ammalgam protocol.

![Ammalgam Protocol Diagram](/img/draw_1.png)

## Recipes
Ammalgam intends to democratize DeFi for retail investors. The UI is designed to show the impact of delta and gamma on any position simply and transparently. Ammalgam also provides a preset menu of strategies, called "recipes," for users:

- **Market Making**
- **Short or Long**
- **Leveraged Market Making**
- **Delta Neutral Market Making**
- **Short or Long Market Making**
- **Straddles**
- **Calls or Puts**
- **Perpetuals**

- **Payout Charts**: Traders have historically relied on payout charts to determine the value of a position in relation to price movement. Ammalgam offers users instant access to assess the potential payout of a position as it relates to price fluctuations.

- **Heat Map**: Many correctly argue that passive LPs are adversely affected by V3, often due to the amplified effect of impermanent loss from the inherent leverage in concentrated liquidity. As payout charts remain static over time, these risks may not be immediately apparent to many retail traders. Ammalgam's UI introduces a novel visualization tool that displays the impact of price fluctuations and the fees earned or incurred by LPs throughout the anticipated duration of their position. This tool clearly delineates the expected positive (green) or negative (red) portfolio values in relation to price changes at a future point in time.

![Ammalgam UI Visualization](/img/delta_neutral.png)
