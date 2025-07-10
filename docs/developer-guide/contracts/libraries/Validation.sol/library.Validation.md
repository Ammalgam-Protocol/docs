# Validation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/975f0ea3593c2ebbbad06ad90ec03f0a7b68c3e0/contracts/libraries/Validation.sol)

SPDX-License-Identifier: GPL-3.0-only


## State Variables
### MAX_BORROW_PERCENTAGE

```solidity
uint256 private constant MAX_BORROW_PERCENTAGE = 90;
```


### ONE_HUNDRED_TIMES_N

```solidity
uint256 private constant ONE_HUNDRED_TIMES_N = 2000;
```


### TWO_Q64

```solidity
uint256 private constant TWO_Q64 = 0x20000000000000000;
```


### FIVE_Q64

```solidity
uint256 private constant FIVE_Q64 = 0x50000000000000000;
```


### NINE_Q64

```solidity
uint256 private constant NINE_Q64 = 0x90000000000000000;
```


### FIFTY_Q64

```solidity
uint256 private constant FIFTY_Q64 = 0x320000000000000000;
```


### TWO_TIMES_N_Q64

```solidity
uint256 private constant TWO_TIMES_N_Q64 = 0x280000000000000000;
```


### TWO_Q128

```solidity
uint256 private constant TWO_Q128 = 0x200000000000000000000000000000000;
```


### TWO_THOUSAND_FIVE_HUNDRED_Q128

```solidity
uint256 private constant TWO_THOUSAND_FIVE_HUNDRED_Q128 = 0x9c400000000000000000000000000000000;
```


## Functions
### getInputParams


```solidity
function getInputParams(
    uint128[6] memory currentAssets,
    uint256[6] memory userAssets,
    uint256 reserveXAssets,
    uint256 reserveYAssets,
    uint256 externalLiquidity,
    int16 minTick,
    int16 maxTick
) internal pure returns (Validation.InputParams memory inputParams);
```

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
function validateLTVAndLeverage(CheckLtvParams memory checkLtvParams, uint256 activeLiquidityAssets) internal pure;
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
L * activeLiquidityScalerInQ72 = x / (2 * sqrt(p))
previous equation:
amountLAssets = mulDiv(amount, Q72, 2 * sqrtPriceInXInQ72, rounding);
adding activeLiquidityScalerInQ72:
amountLAssets = (amount * Q72 / (2 * sqrtPriceInXInQ72)) / (activeLiquidityScalerInQ72 / Q72);
simplify to:
(amount * Q72 * Q72) / (2 * sqrtPriceInXInQ72 * activeLiquidityScalerInQ72)
final equation:
amountLAssets = mulDiv(mulDiv(amount, Q72, sqrtPriceInXInQ72, rounding), Q72, 2 * activeLiquidityScalerInQ72, rounding);
or more simplified (failed for some tests)
amountLAssets = mulDiv(amount, Q72 * Q72, 2 * sqrtPriceInQ72 * activeLiquidityScalerInQ72);


```solidity
function convertXToL(
    uint256 amountInXAssets,
    uint256 sqrtPriceInXInQ72,
    uint256 activeLiquidityScalerInQ72,
    bool roundUp
) internal pure returns (uint256 amountLAssets);
```

### convertLToX


```solidity
function convertLToX(
    uint256 amount,
    uint256 sqrtPriceQ72,
    uint256 activeLiquidityScalerInQ72,
    bool roundUp
) internal pure returns (uint256 amountXAssets);
```

### convertYToL

The simplified math: L = y * sqrt(p) / 2
mulDiv(amount, sqrtPriceInXInQ72, 2 * Q72, rounding);
amountLAssets = amount * sqrtPriceInXInQ72Scaled / (2 * Q72)
sqrtPriceInXInQ72Scaled = sqrtPriceInXInQ72 / activeLiquidityScalerInQ72 / Q72;
simplify to:
amount * sqrtPriceInXInQ72 / activeLiquidityScalerInQ72 / Q72 / (2 * Q72)
simplify to:
(amount * sqrtPriceInXInQ72 * Q56) / (activeLiquidityScalerInQ72 * 2)
final equation:
amountLAssets = mulDiv(amount, sqrtPriceInXInQ72 * Q56, 2 * activeLiquidityScalerInQ72, rounding);


```solidity
function convertYToL(
    uint256 amountInYAssets,
    uint256 sqrtPriceInXInQ72,
    uint256 activeLiquidityScalerInQ72,
    bool roundUp
) internal pure returns (uint256 amountInLAssets);
```

### convertLToY


```solidity
function convertLToY(
    uint256 amount,
    uint256 sqrtPriceQ72,
    uint256 activeLiquidityScalerInQ72,
    bool roundUp
) internal pure returns (uint256 amountYAssets);
```

### calcDebtAndCollateral


```solidity
function calcDebtAndCollateral(
    CheckLtvParams memory checkLtvParams
) internal pure returns (uint256 debtLiquidityAssets, uint256 collateralLiquidityAssets, bool netDebtX);
```

### checkLtv


```solidity
function checkLtv(
    CheckLtvParams memory checkLtvParams,
    uint256 activeLiquidityAssets
) private pure returns (uint256 debtLiquidityAssets, uint256 collateralLiquidityAssets);
```

### increaseForSlippage

Calculates the impact slippage of buying the debt in the dex using the currently
available liquidity $L = \sqrt{x \cdot y}$. Uses a few formulas to simplify to not need
reserves to calculate the required collateral to buy the debt.
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
in &= L_{in} \cdot 2 \cdot \sqrt{p} \\
out &= \frac{  2 \cdot L_{out} }{ \sqrt{p} }
\end{align*}
```
Starting with our swap equation we solve for $in$
```math
\begin{align*}
(in + reserveIn)(reserveOut - out) &= reserveOut \cdot reserveIn \\
in &= \frac{reserveOut \cdot reserveIn} {reserveOut - out} - reserveIn \\
in &= reserveIn \cdot \left(\frac{reserveOut } {reserveOut - out} - 1 \right) \\
in &= reserveIn \cdot \frac{ reserveOut - (reserveOut - out) } { reserveOut - out } \\
in &= \frac{ reserveIn \cdot out } { reserveOut - out } \\
\end{align*}
```
We now plug in liquidity values in place of $reserveIn$, $reserveOut$, $in$, and $out$.
```math
\begin{align*}
L_{in} \cdot 2 \cdot \sqrt{p}
&=  \frac{ L \cdot \sqrt{p} \cdot \frac{  2 \cdot L_{out} }{ \sqrt{p} } }
{ \frac{L}{ \sqrt{p} } - \frac{ 2 \cdot L_{out} }{\sqrt{p} } } \\
L_{in}
&= \frac{ L \cdot \sqrt{p} \cdot \frac{  2 \cdot L_{out} }{ \sqrt{p} } }
{ 2 \cdot \sqrt{p} \cdot  \left(\frac{L}{ \sqrt{p} } - \frac{ 2 \cdot L_{out} }{\sqrt{p} }\right)} \\
L_{in}
&=  \frac { L \cdot  L_{out} }
{ (L - 2 \cdot L_{out}) } \\
\end{align*}
```
Using $L_{out}$ described in our method as `debtLiquidityAssets`, $L$ or `activeLiquidityAssets`,
and our fee, we use the above equation to solve for the amount of liquidity that
must come in to buy the debt.


```solidity
function increaseForSlippage(
    uint256 debtLiquidityAssets,
    uint256 activeLiquidityAssets
) internal pure returns (uint256);
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
    uint256 sqrtPriceMinInQ72;
    uint256 sqrtPriceMaxInQ72;
    uint256 activeLiquidityScalerInQ72;
    uint256 activeLiquidityAssets;
    uint256 reservesXAssets;
    uint256 reservesYAssets;
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

