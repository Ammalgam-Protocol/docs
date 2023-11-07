---
sidebar_position: 1
---
import { Tweet } from 'react-tweet';

# Overview

## DLEX

We THIS IS A TEST are building a completely new primitive that combines lending and trading
into what we call a Decentralized Lending Exchange (DLEX). Unutilized assets in
a traditional DEX are lent out to increase yields without increasing
"Impermanent Loss" risk. This also unlocking the utility of having access to
lending natively in a DEX allowing for AMM shares to be used as collateral to
borrow against. Additionally, we built a mechanism to allow for borrow AMM
shares themselves which can be used as a hedge for impermanent loss or to make
straddles. The feedback we have gotten from sophisticated traders in the space
is extremely positive because what we are building is so powerful while our UI
makes the complexity intuitive and accessible.

### Trading

Ammalgam was forked from Uniswap v2 and thus has parity with any DEX.
Although we don't support concentrated liquidity, we offer similar functionality
in the form of leverage. Users can borrow the underlying x and y in the Pair
against their market making position allowing for the creation of larger
positions that what is possible with their own assets. This gives the exact same
payout or risk of a concentrated liquidity position in while it is in range, but
also allows for the position to continue to earn swap fees when the price leaves
the range. This also requires users have to monitor the price and its effect on
their position since it can be liquidated if the impermanent loss from price
change diminishes the value such that their debt is no longer has sufficient
collateral to secure it. 

### Lending

We built a overcollateralized lending protocol into the Uniswap v2 Pair
contract. This means that the two assets in the pair contract can be borrowed
and deposited to earn lending yield but not be included in the reserves used to
quote swaps. 

Additionally, we allow users to borrow liquidity or market maker shares to give
exposure to positive gamma, or "impermanent gain". This is done by allowing the
underlying x and y in the Pair to be borrowed together in proportion to the
trading reserves and tracking the debt in units of $L$, or $L = \sqrt{k} =
\sqrt{x + y}$. This means that debt in $L$ are static, but the underlying assets
$x$ and $y$ will depend on the price. As an asset increases in value, a borrower
will owe less of the asset that increased in value and more of the asset that
decreased in value.

### Capital Efficiency

Market making using uniswap v2 is considered inefficient because most of the
assets are not being. This is because the algorithm to quote swap has to 
support a price range of 0 to $\infty$. Uniswap v3 tried to solve this problem
by introducing concentrated liquidity. This did increase yields for market
makers, but also increased the rate at which a market makers position lost value
as the price changed. The v3 solution was in fact solving a problem by
leveraging the underlying inefficiency.

Ammalgam rethinks this problem from a different angle. What if we could build 
what Hayden suggests at the protocol level? 

<Tweet id="1452832342788169732" />

This is what Ammalgam does, it lends out the excess assets in the Uniswap v2
Pair. If that is not enough by itself, this efficiency can be further leveraged
for those who understand the risks and rewards of doing so.

### Utility (δ, γ)

Ammalgam recomposes DeFi into one protocol! With both trading and lending as
native features of our protocol, we unlock a massive amount of utility not
currently accessible in DeFi in one protocol. We can create a mind blowing
amount of uses from this combination that can be described in two variables
familiar to options traders, delta and gamma. 

Delta gives users the ability to go long or short by borrowing an asset and
selling it for the other. Gamma describes the amount of exposure to market
making, including negative exposure by borrowing market maker shares. The
payout charts accessible can be seen in the desmos chart below. 

<iframe 
  src="https://www.desmos.com/calculator/zzgneljqca"
  frameBorder="0" 
  allowFullScreen
  width="100%"
  height="600">
</iframe>

#### Recipes

We also have tried to simplify this somewhat overwhelming range of positions by
creating a set of "recipes". 

- Market making
- Short or Long
- Leveraged Market Making
- Delta Neutral Market Making
- Short or Long Market Making
- Straddle
- Call or Put

#### Payout charts

When selecting a recipe or configuring a custom strategy with (δ, γ), our UI
shows the respective payout chart for that position giving users immediate
feedback of the effect of their changes. 

#### Heat map

Additionally we have built a visualization tool that shows the impact of both
price change and the fees earned or paid over time. The heat map shows the
positions value after any given period of time and price change by representing
position value as a color (heat). Time is the horizontal axis and price change
is the vertical access. Below is an example of the heat map for the delta
neutral market making

![Heat map](/charts/Delta_Neutral_Payout_Heat_Map.png)

### Autonomy

Our protocol is completely free from oracles and is self contained without any
dependencies on other contracts with the exception of ERC-20 contracts. This
means that we can be the first market for both lending and trading for the next
big on chain airdrop. 

We did this with no assumptions of arbitrage or externally available trade
liquidity and asked what would be required to make this safe. When borrowing,
the protocol checks the current available liquidity that could be used to
liquidate the proposed debt as well as all the currently opened debts in a
similar range and ensure that the proposed debt could be liquidated with the
internally available trade liquidity. We also treat price as a range rather than
a single number. When a price between two assets changes rapidly, this price
range expands. This expansion limit what can be borrowed against the asset
lowering in value and holds the limit of what can be borrowed against the
asset increasing in value the same as before the price change. New debts that
borrowing against collateral increasing in value can not use the new higher
value as the rate of exchange until that value has been maintained for a
substantial amount of time.
