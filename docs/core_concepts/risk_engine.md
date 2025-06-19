---
sidebar_position: 4
---

# Risk Engine: Cross-Margining, Liquidation Logic

Ammalgam's Risk Engine secures the protocol through an integrated system of cross-margining, dynamic liquidation mechanics, and internal price safeguards.
Users can borrow across multiple collateral types - tokens ($X$, $Y$) and liquidity shares ($L$) - all managed within a single unified pool. Loans are validated against a Loan-to-Value (LTV) framework that continuously adjusts to each user's position and the real-time conditions of the pools.

### Loan to Value
Each loan must be worth less than 75% of collateral provided to secure it, and often much less depending on the depth of liquidity with respect to the size of the loan. When borrowing one asset against the other, the calculation of loan to value (LTV) is as expected, $L_{TV} = \frac{Debt Value}{ Collateral Value}$. When we calculate the loan to value for market making positions, the calculation may not be as obvious. First we look at what we call $L_X$ and $L_Y$, the individual quantity of $X$ and $Y$ in the market making position and net it with the amount of $X$ and $Y$ deposited and borrowed. If the net of $X$ or $Y$ is negative, then that asset is treated as the debt and the other asset is treated as the collateral. We use the following equation to calculate LTV:

![Ammalgam UI Visualization](/img/image-2.png)

Each variable $X$, $Y$, $L_X$, & $L_Y$ can be negative or positive depending if it represents debt or collateral. If both $X + L_X < 0$ and $Y + L_Y < 0$, there is no collateral and the validation will fail and if both values are positive, there is no net debt and the validation of LTV passes.

### Slippage added to LTV
To deter large unsustainable loans, we consider slippage when calculating the LTV. To consider the slippage created when needing to liquidate collateral to repay the debt, we consider the amount of collateral needed to buy the requested debt using the current reserves. The needed collateral is then compared to the total collateral provided to ensure it fits within the allowed LTV. This will have a negligible impact on small loans concerning available liquidity and more restrictive for large loans. Flash loan manipulation attacks like C.R.E.A.M Finance and Mango become impossible when the slippage would require all the liquidity in the protocol pushing the LTV price from its high manipulated price back down to zero (the price required to buy all of the debt from the AMM to fund liquidation when the debt is the size of all of that asset in the AMM). Similar to Tranche Limitations, these limits could be expanded by the same configuration for more liquid trading pairs in which arbitrageurs can be assumed.

### NatSpec and Implementation

https://docs.ammalgam.xyz/docs/contracts/libraries/Validation.sol/library.Validation#increaseforslippage

### Cost to liquidate X or Y
<iframe src="https://www.desmos.com/calculator/v08sn8yn6r?embed"
  frameBorder="0" 
  allowFullScreen
  width="100%"
  height="600"
></iframe> 