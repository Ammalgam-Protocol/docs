---
sidebar_position: 9
---

# Dynamic Swap Pricing

Once 90% of reserves have been lent out, Dynamic Swap Pricing will kick in to start to add a premium to trades taking the scarce liquidity and a discount for those bringing it. This essentially puts a throttle on swap transactions depleting the threatened assets. These adjustments start small and gradually increase as the health of the liquidity deteriorates. You can think of the adjustment to the invariant curves behavior similar to how Curve handles the depletion of assets as the stable invariant ($x+y = k$) as the pool becomes unbalanced.

During Dynamic Swap Pricing, instead of quoting trades using the invariant $K$ (calculated with the primary reserves in the contract and the lent out $X$ and $Y$) the calculation of the invariant would be adjusted to add a premium or discount to swaps. This premium would increase as the health of the reserves deplete. This can be achieved by modifying the inputs, $X$ and $Y$, prior to calculating $K$.

In the typical invariant $X \cdot Y = K$, As $X$ or $Y$ approaches zero, the cost to buy it goes up. In our case, we accelerate the rate at which $X$ or $Y$ approaches zero once only some some buffer (10%) of what should be there remains.

In the case that asset $X$ is depleting we modify the value being used in $X\cdot Y=K$. Let $X$ be the virtual reserves, the quantity that would be in the pool if there was nothing being lent. Let $X_M$ be the quality of the asset that is missing due to lending. Let B be the buffer (90%) of assets remaining of $X$, and $X_A$ be the adjusted value of $X$ passed to our invariant function $X \cdot Y=K$ .

![Ammalgam UI Visualization](./assets/dynamic_swap_pricing.png)

To show this by example take a look at the Desmos chart showing $Y \cdot X_A = k$ in green.

<iframe src="https://www.desmos.com/calculator/21q6lgnqco?embed"
  frameBorder="0" 
  allowFullScreen
  width="100%"
  height="600"
></iframe> 

This essentially creates a premium for the asset that is depleting. There is no quantity of $X$ or $Y$ that could be swapped to take all of the liquidity out of the contract. Similarly, a discount is given to swaps that bring in the asset that is at risk of being depleted by reversing the order of the calculations.

With Dynamic Swap Pricing, backup reserves can never be completely depleted without the rate of exchange effectively reaching 0 or $\infty$.

To see what this would look like in practice, let's consider the [ETH-USDC Uniswap v2 pair contract](https://etherscan.io/address/0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc). At time of writing it held 59,589,000 USDC and 36,852 ETH. Consider the case where 90% of ETH has been lent out.

Traders will not make these trades unless the swap with the premium is at or below the external market rate. As such, Swap sizes and volume will likely be far lower than that of our competitors when reserve health is low. But the goal in a death spiral is not to have the highest swap volume, it's to have protect our novel financial primitive from exploding. It is hard to imagine a market scenario that could sustain the deteriorated state of the reserves for an extended period of time. The outstanding loan principal of the scarce asset would be both appreciating in value and costing double and triple percentages annualized. At the same time, the collateral would be depreciating. Loans would be forced to be repaid or liquidated. All of these factors persisting long term, although possible, don't seem probable. But if crypto has taught us anything, the most unimaginably strange things can occur in the market. If the unimaginable did occur, this design would still still be able to fill swaps, even when -j order book became a ghost town and the Uniswap V3 pair got stuck.