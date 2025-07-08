---
sidebar_position: 7
---

# Liquidations

### Price Dependent Liquidations

The system will allow anyone to pay down a debt and receive the collateral plus some premium or discount depending on the price at any time. The initial price used will the mid term price or the geometric average price over the last 50 blocks and the last block price, whichever is better for the borrower. The price at which a liquidation will occur will include a premium or discount depending on where the liquidation price is with respect to the price at which a position crosses the allowed LTV. At the point at which the liquidation price pushes a debt to exceed the allowed LTV, there will be a small discount on the liquidation giving the user to close their position before the market has a chance to profit from the liquidation. As the price moves past this threshold of LTV, the discount will flip to a growing premium. This creates a similar effect to [Euler Finance's Liquidations](https://docs.euler.finance/lite-paper#free-market-liquidations) that operate like a dutch auction.

By allowing liquidations to occur before the allowed LTV, we ensure that a manipulation of a price will still lead liquidations to occur near the actual market and leave little to no benefit to an attacker. A counter example to demonstrate this point this, if we started the auction at some price and even included some discount, an attacker with sufficient capital could move the market to push a large position to be eligible for liquidation. If we include a discount on the premium to give the owner of the debt a chance to close their position, that discount could still be insufficient if the actual market price was less than the liquidation price including the discount. By making all positions eligible for liquidation with an increasing discount the further the price is away from the LTV threshold, we guarantee these liquidations will never occur at a manipulated inflated price giving an attacker an advantage.

Liquidations start at 60% LTV, but the discount starts at 0, meaning liquidators get nothing for what they repay. It breaks even at 75% and then becomes a premium after that.

### Debt Cap Liquidations

Due to some of the design decisions taken to track debts in, it would be advantageous to bound debts from being able to grow past a certain point. Otherwise the increase in the size of a debt could result in a position needing to move from one tranche to another. Capping the debt by some bound allows each position to be fixed to one tranche, but requires the user to either pay down their debt as it approaches the cap, increase their cap in the current tranche if additional liquidity is available, or move to the next tranche. If a borrower neglects to manage their debt, a debt cap reduction liquidation would occur that would allow anyone to earn a small amount of the users position to cover gas and reset the amount of room the position takes. The premium would increase the further the debt expanded beyond the bound. These liquidations can lead to full liquidations when there would be insufficient collateral left to secure the debt after the debt restructuring liquidation.
