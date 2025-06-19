# Validation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/libraries/Validation.sol)

SPDX-License-Identifier: GPL-3.0-only


## State Variables
### MAX_BORROW_PERCENTAGE

```solidity
uint256 private constant MAX_BORROW_PERCENTAGE = 90;
```


## Functions
### getCheckLtvParams


```solidity
function getCheckLtvParams(
    InputParams memory inputParams
) internal pure returns (CheckLtvParams memory checkLtvParams);
```

### validateBalanceAndLiqAndNotSameAssetsSuppliedAndBorrowed


```solidity
function validateBalanceAndLiqAndNotSameAssetsSuppliedAndBorrowed(
    InputParams memory inputParams
) internal pure;
```

### validateLTVAndLeverage


```solidity
function validateLTVAndLeverage(InputParams memory inputParams, CheckLtvParams memory checkLtvParams) internal pure;
```

### validateSolvency

Added TokenType and uint256s for amount, balance from, and balance to
to enable to pass a value for the current balance of a token to avoid one
check of a balance that can be done from within a token.


```solidity
function validateSolvency(
    InputParams memory inputParams
) internal pure;
```

### verifyNotSameAssetsSuppliedAndBorrowed


```solidity
function verifyNotSameAssetsSuppliedAndBorrowed(
    uint256 depositedXAssets,
    uint256 depositedYAssets,
    uint256 borrowedXAssets,
    uint256 borrowedYAssets
) internal pure;
```

### verifyMaxBorrowXY


```solidity
function verifyMaxBorrowXY(
    VerifyMaxBorrowXYParams memory params
) internal pure;
```

### verifyMaxBorrowL


```solidity
function verifyMaxBorrowL(
    VerifyMaxBorrowLParams memory params
) internal pure;
```

### getDepositsInL


```solidity
function getDepositsInL(
    InputParams memory inputParams
) private pure returns (uint256 netDepositedXinLAssets, uint256 netDepositedYinLAssets);
```

### getBorrowedInL


```solidity
function getBorrowedInL(
    InputParams memory inputParams
) private pure returns (uint256 netBorrowedXinLAssets, uint256 netBorrowedYinLAssets);
```

### convertXToL

The original math:
L * activeLiquidityScalerInQ128 = x / (2 * sqrt(p))
previous equation:
amountLAssets = Math.mulDiv(amount, Q128, 2 * sqrtPriceInQ128Range, rounding);
adding activeLiquidityScalerInQ128:
amountLAssets = (amount * Q128 / (2 * sqrtPriceInQ128Range)) / (activeLiquidityScalerInQ128 / Q128);
simplify to:
(amount * Q128 * Q128) / (2 * sqrtPriceInQ128Range * activeLiquidityScalerInQ128)
final equation:
amountLAssets = Math.mulDiv(Math.mulDiv(amount, Q128, sqrtPriceInQ128Range, rounding), Q128, 2 * activeLiquidityScalerInQ128, rounding);
or more simplified (failed for some tests)
amountLAssets = Math.mulDiv(amount, Q128 * Q128, 2 * sqrtPriceInQ128Range * activeLiquidityScalerInQ128);


```solidity
function convertXToL(
    uint256 amount,
    uint256 sqrtPriceInQ128Range,
    uint256 activeLiquidityScalerInQ128,
    Math.Rounding rounding
) private pure returns (uint256 amountLAssets);
```

### convertYToL

The simplified math: L = y * sqrt(p) / 2
Math.mulDiv(amount, sqrtPriceInQ128Range, 2 * Q128, rounding);
amountLAssets = amount * sqrtPriceInQ128RangeScaled / 2 * Q128
sqrtPriceInQ128RangeScaled = sqrtPriceInQ128Range / activeLiquidityScalerInQ128 / Q128;
simplify to:
amount * sqrtPriceInQ128Range / activeLiquidityScalerInQ128 / Q128 / 2 * Q128
simplify to:
(amount * sqrtPriceInQ128Range) / (activeLiquidityScalerInQ128 * 2)
final equation:
amountLAssets = Math.mulDiv(amount, sqrtPriceInQ128Range, 2 * activeLiquidityScalerInQ128, rounding);


```solidity
function convertYToL(
    uint256 amount,
    uint256 sqrtPriceInQ128Range,
    uint256 activeLiquidityScalerInQ128,
    Math.Rounding rounding
) private pure returns (uint256 amountLAssets);
```

### calcDebtAndCollateral


```solidity
function calcDebtAndCollateral(
    CheckLtvParams memory checkLtvParams,
    InputParams memory inputParams
) internal pure returns (uint256 debtLiquidityAssets, uint256 collateralLiquidityAssets);
```

### checkLtv


```solidity
function checkLtv(
    CheckLtvParams memory checkLtvParams,
    InputParams memory inputParams
) private pure returns (uint256 debtLiquidityAssets, uint256 collateralLiquidityAssets);
```

### increaseForSlippage

Calculates the impact slippage of buying the debt in the dex using the currently
available liquidity $L = \sqrt{x \cdot y}$. Uses a few formulas to simplify to not need
reserves to calculate the required collateral to buy the debt.
Let the fee be represented as
```math
\phi = 1 - fee
```
The reserves available in and out for swapping can be defined in terms of $L$, and price $p$
```math
\begin{align*}
reserveIn &= L \cdot \sqrt{p} \\
reserveOut &= \frac{L}{ \sqrt{p} } \\
\end{align*}
```
The swap amount $in$ and $out$ can also be defined in terms of $L_{in}$ and
$L_{out}$
```math
\begin{align*}
in &= L_{in} \cdot 2 \cdot \sqrt{p}
out &= \frac{  2 \cdot L_{out} }{ \sqrt{p} }
\end{align*}
```
Starting with our swap equation we solve for $in$
```math
\begin{align*}
(in \cdot \phi + reserveIn)(reserveOut - out) &= reserveOut \cdot reserveIn \\
in \cdot \phi &= \frac{reserveOut \cdot reserveIn} {reserveOut - out} - reserveIn \\
in \cdot \phi &= reserveIn \cdot \left(\frac{reserveOut } {reserveOut - out} - 1 \right) \\
in \cdot \phi &= reserveIn \cdot \frac{ reserveOut - (reserveOut - out) } { reserveOut - out } \\
in \cdot \phi &= \frac{ reserveIn \cdot out } { reserveOut - out } \\
\end{align*}
```
We now plug in liquidity values in place of $reserveIn$, $reserveOut$, $in$, and $out$.
```math
\begin{align*}
L_{in} \cdot 2 \cdot \sqrt{p} \cdot \phi
&=  \frac{ L \cdot \sqrt{p} \cdot \frac{  2 \cdot L_{out} }{ \sqrt{p} } }
{ \frac{L}{ \sqrt{p} } - \frac{ 2 \cdot L_{out} }{\sqrt{p} } } \\
L_{in} \cdot \phi
&= \frac{ L \cdot \sqrt{p} \cdot \frac{  2 \cdot L_{out} }{ \sqrt{p} } }
{ 2 \cdot \sqrt{p} \cdot  \left(\frac{L}{ \sqrt{p} } - \frac{ 2 \cdot L_{out} }{\sqrt{p} }\right)} \\
L_{in}
&=  \frac { L \cdot  L_{out} }
{ \phi  \cdot (L - 2 \cdot L_{out}) } \\
\end{align*}
```
Using $L_{out}$ described in our method as `debtLiquidityAssets`, $L$ or `activeLiquidityAssets`,
and our fee, we use the above equation to solve for the amount of liquidity that
must come in to buy the debt.


```solidity
function increaseForSlippage(
    uint256 debtLiquidityAssets,
    uint256 activeLiquidityAssets
) private pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`debtLiquidityAssets`|`uint256`|The amount of debt with units of L that will need to be purchased in case of liquidation.|
|`activeLiquidityAssets`|`uint256`|The amount of liquidity in the pool available to swap against.|


### checkLeverage


```solidity
function checkLeverage(
    CheckLtvParams memory checkLtvParams
) private pure;
```

## Errors
### InsufficientLiquidity

```solidity
error InsufficientLiquidity();
```

### AmmalgamCannotBorrowAgainstSameCollateral

```solidity
error AmmalgamCannotBorrowAgainstSameCollateral();
```

### AmmalgamMaxBorrowReached

```solidity
error AmmalgamMaxBorrowReached();
```

### AmmalgamDepositIsNotStrictlyBigger

```solidity
error AmmalgamDepositIsNotStrictlyBigger();
```

### AmmalgamLTV

```solidity
error AmmalgamLTV();
```

### AmmalgamMaxSlippage

```solidity
error AmmalgamMaxSlippage();
```

### AmmalgamTooMuchLeverage

```solidity
error AmmalgamTooMuchLeverage();
```

### AmmalgamTransferAmtExceedsBalance

```solidity
error AmmalgamTransferAmtExceedsBalance();
```

## Structs
### InputParams

```solidity
struct InputParams {
    uint256[6] userAssets;
    uint256 sqrtPriceMinInQ128;
    uint256 sqrtPriceMaxInQ128;
    uint256 activeLiquidityScalerInQ128;
    uint256 activeLiquidityAssets;
}
```

### CheckLtvParams

```solidity
struct CheckLtvParams {
    uint256 netDepositedXinLAssets;
    uint256 netDepositedYinLAssets;
    uint256 netBorrowedXinLAssets;
    uint256 netBorrowedYinLAssets;
    uint256 depositedLAssets;
}
```

### VerifyMaxBorrowXYParams

```solidity
struct VerifyMaxBorrowXYParams {
    uint256 amount;
    uint256 depositedAssets;
    uint256 borrowedAssets;
    uint256 reserve;
    uint256 totalLiquidityAssets;
    uint256 borrowedLiquidityAssets;
}
```

### VerifyMaxBorrowLParams

```solidity
struct VerifyMaxBorrowLParams {
    uint256[6] totalAssets;
    uint256 newBorrowedLAssets;
    uint256 reserveXAssets;
    uint256 reserveYAssets;
}
```

