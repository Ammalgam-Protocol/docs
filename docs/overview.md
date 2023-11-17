---
sidebar_position: 1
---

import { Tweet } from 'react-tweet';

# Overview

### DLEX

Ammalgam is a completely new primitive that combines lending and trading into
one protocol called a Decentralized Lending Exchange (DLEX). This simple
combination creates Capital Efficiency resulting in 20% increases in yield for
Liquidity Providers (LPs). It offers unbounded utility through unlimited
trading strategies, catering to both advanced users and those preferring a UI
designed for passive LPs. Lastly, it ensures true autonomy that is
permissionless and oracle-free, with zero dependencies.

### Exchange

Ammalgam is a fork of Uniswap V2. but is designed to allow LP positions with
payouts similar to concentrated liquidity and thus has parity with any DEX.
Ammalgam uses leverage when creating concentrated liquidity-like positions so
users need to monitor for liquidations, however, they are compensated by earning
fees way beyond the similar range created when using concentrated liquidity. In
essence, instead of monitoring ranges, LPs now focus on liquidations but benefit
from increased fees and, consequently, higher yields.


### Lending

The lending and borrowing component of the DLEX involves the lending of X, Y,
and K, derived from the X * Y = K Constant Market Maker (CMM) formula. The DLEX
offers expanded lending options in DeFi through three distinct methods:

* Lending unutilized assets (X or Y) from the traditional V2 trading pool, which
  quotes swaps. This approach introduces new fees for Liquidity Providers (LPs),
  enhancing market-making yields.
* Traditional DeFi lending and borrowing of X and Y, which is not included in
  the trading reserves used to quote swaps. This is possible because Ammalgam
  built an overcollateralized lending protocol directly into the Uniswap V2 Pair
  Contract. 
* The DLEX structure uniquely permits the borrowing of K. This novel feature,
  previously unfeasible, significantly impacts market making. When an LP
  participates in market making, they effectively deposit K into an exchange by
  supplying both assets of a pair. K remains constant, but as the deposited X
  and Y fluctuate in value relative to each other, they can cause impermanent
  loss. Borrowing K allows one to directly counteract this impermanent loss in
  any pair, leading to what is termed "Impermanent Gain." This concept is also
  known as "borrowing liquidity" or "positive gamma." 


### Capital Efficiency

Market making using uniswap V2 is considered inefficient because most of the
assets are not being used.[^unused_assets] The algorithm to quote swaps has to
support price ranges from 0 to infinity so most of the deposited liquidity is
not supporting trading, but actually sitting idle. Uniswap V3 tried to solve
this problem by introducing concentrated liquidity, which increased yields for
market makers, but also magnified impermanent loss (e.g., increased the rate at
which a market maker's position loses value as price changes). The V3 solution
was, in fact, solving a problem by leveraging the underlying inefficiency -
adding yield by adding risk. Many passive and retail investors are unaware of
the additional risk they are taking with concentrated liquidity.

[^unused_assets]: link?

Ammalgam addresses the issue by first leveraging idle assets in V2 to increase
fees for LPs. If this enhanced capital efficiency does not fully meet trader’s
needs, they have the option to apply additional leverage for further yield
increases. 

In the tweet below, Hayden suggests LPs diversify their assets between V3 and
lending protocols to mitigate the heightened risks associated with V3 market
making. The DLEX addresses this issue with a single, innovative primitive.
Additionally, it utilizes the unused assets in V2 to generate additional yield
for LPs.

<Tweet id="1452832342788169732" />


### Utility (δ, γ)

The DLEX is far more than a platform for merely lending and trading assets
within a single protocol. Integrating lending and trading as native features
unleashes an array of functionality and trading strategies, surpassing the
capabilities of traditional DEXs or Lending Protocols , whether used
independently or in combination.

This new utility stems from two concepts familiar to options traders which,
Ammalgam now simplifies for retail traders: delta and gamma.

* Delta essentially represents the lending or borrowing of an asset, such as X or
Y on a DLEX. For example, X is USDC and Y is Bitcoin, one can short Bitcoin on a
DLEX by borrowing Bitcoin and selling it for USDC. 
* Gamma refers to exposure in market making, the flip side of the X * Y =K
formula. With gamma on a DLEX, one can borrow K, essentially inverting
traditional market making. Instead of supplying X and Y, which creates inherent
exposure to impermanent loss, borrowing K flips this exposure to ‘impermanent
gain’.

Delta allows strategies by manipulating borrowed or lent assets. These range
from traditional market making to leveraged market making (akin to concentrated
liquidity) to short market making to delta neutral market making. 

For instance, in the current DeFi space, establishing a delta neutral market
making position requires interacting with multiple protocols, often requiring
advanced technical skills like coding flash loans. While DeFi’s composability
enables interaction with various protocols for a delta neutral position, each
protocol extracts fees. Ammalgam obviates the need for technical skills and
eliminates the extraneous fees from each protocol, thus recomposing DeFi.

Adding the ability to borrow or lend Gamma, a DLEX empowers users to create
options and perpetuals, including straddles, and access to impermanent gain. 

If a market maker anticipates the prices to remain outside of a narrow range, up
or down, they currently need to combine options protocols with other tools.
However, in a DLEX, borrowing gamma suffices to create the desired payout
matching future expectations.

By integrating lending and trading with just two inputs, delta and gamma,
Ammalgam supersedes DEXs, lending protocols, options protocols, hedging
protocols (such as Squeeth) and perpetuals. It achieves this permissionlessly,
without dependencies, and operates oracle free. Essentially any conceived
payout strategy can be crafted with or without leverage.

<iframe 
 src="https://www.desmos.com/calculator/zzgneljqca"
 frameBorder="0" 
 allowFullScreen
 width="100%"
 height="600">
</iframe>

#### Recipes

Ammalgam intends to democratize DeFi for retail investors. As such, the UI is
designed to show the impact of delta and gamma on any position simply and
transparently. Ammalgam further created a preset menu of recipes for users: 

* Market Making (descriptions of each to follow or be linked)
* Short or Long
* Leveraged Market Making
* Delta Neutral Market Making
* Short or Long Market Making
* Straddles
* Calls or Puts
* Perpetuals


#### Payout charts

Traders have historically relied on payout charts to determine the value of a
position in relation to price movement. Ammalgam offers users instant access to
assessing the potential payout of a position concerning price fluctuations.

#### Heat map

Many correctly argue that passive LPs are adversely affected by V3, often due to
the amplified effect of impermanent loss from the inherent leverage in
concentrated liquidity. As payout charts remain static over time, these risks
may not be immediately apparent to many retail traders. Ammalgam’s UI introduces
a novel visualization tool that displays the impact of price fluctuations and
the fees earned or incurred by LPs throughout the anticipated duration of their
position. This tool clearly delineates the expected positive (green) or negative
(red) portfolio values in relation to price changes at a future point in time.

![Heat map](/charts/Delta_Neutral_Payout_Heat_Map.png)

### Autonomy

Ammalgam operates independently of oracles and relies solely on itself, except
for interactions with ERC-20 contracts. This autonomy positions Ammalgam to be a
pioneering platform in both lending and trading for upcoming, major, onchain
airdrops.

This is achieved without relying on assumptions of arbitrage or external trade
liquidity and focused instead on ensuring safety. When initiating borrowing, the
protocol evaluates the available liquidity that could be utilized for
liquidating the proposed debt, as well as existing debts within a similar range.
This ensures that the new debt can be liquidated using an available internal
trade liquidity. Furthermore, we treat price as a range, not a fixed number. As
the price between two assets changes rapidly, the price range adjusts. This
adjustment restricts borrowing against the devaluing asset and maintains the
borrowing limit against the appreciating asset at its pre-change level. Debts
incurred against appreciating collateral can not leverage its newly increased
value as the basis for exchange until that value has stabilized for a
significant duration.
