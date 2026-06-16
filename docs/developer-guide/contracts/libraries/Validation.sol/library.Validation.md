# Validation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/ec51218155bd2f8c1e5dc761ed4728baae81a01b/contracts/libraries/Validation.sol)

SPDX-License-Identifier: GPL-3.0-only


## State Variables
### MAX_BORROW_PERCENTAGE

```solidity
uint256 internal constant MAX_BORROW_PERCENTAGE = 90;
```


## Functions
### getInputParams

Get the input parameters for the validation

*hasBorrow is set to true here, because we assume that the caller has verified there is
a borrowed asset*


```solidity
function getInputParams(
    uint256[6] memory userAssets,
    uint256 activeLiquidityAssets,
    uint256 reserveXAssets,
    uint256 reserveYAssets,
    uint256 externalLiquidity,
    int16 minTick,
    int16 maxTick
) internal pure returns (Validation.InputParams memory inputParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`|The user assets of the pool|
|`activeLiquidityAssets`|`uint256`|The current active liquidity assets of the pool|
|`reserveXAssets`|`uint256`|The reserve of the X asset|
|`reserveYAssets`|`uint256`|The reserve of the Y asset|
|`externalLiquidity`|`uint256`|The external liquidity of the pool|
|`minTick`|`int16`|The min tick of the pool|
|`maxTick`|`int16`|The max tick of the pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The input parameters for the validation|


### getCheckLtvParams

Get the check LTV parameters for needed for `validateLTVAndLeverage()`

*the sqrt prices are in the input params, but by passing them we allow for the ability
to switch them as needed in liquidation and other cases.*


```solidity
function getCheckLtvParams(
    uint256[6] memory userAssets,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
) internal pure returns (CheckLtvParams memory checkLtvParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`|User asset array|
|`sqrtPriceMinInQ72`|`uint256`|The minimum sqrt price in Q72|
|`sqrtPriceMaxInQ72`|`uint256`|The maximum sqrt price in Q72|


### validateBalanceAndLiqAndNotSameAssetsSuppliedAndBorrowed

Verifies that debt is backed by liquidity from an independent provider and
that users do not borrow the same underlying assets they supply as collateral.


```solidity
function validateBalanceAndLiqAndNotSameAssetsSuppliedAndBorrowed(
    uint256[6] memory userAssets,
    uint256 activeLiquidityAssets
) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`|The account's assets by token type.|
|`activeLiquidityAssets`|`uint256`|The pair's active liquidity assets.|


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
    uint256[6] memory userAssets,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72,
    uint256 activeLiquidityAssets
) external pure;
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

### verifyMaxBorrow


```solidity
function verifyMaxBorrow(
    VerifyMaxBorrowParams memory params
) internal pure;
```

### getDepositsInL


```solidity
function getDepositsInL(
    uint256[6] memory userAssets,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
) private pure returns (uint256 netDepositedXinLAssets, uint256 netDepositedYinLAssets);
```

### getBorrowedInL


```solidity
function getBorrowedInL(
    uint256[6] memory userAssets,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
) private pure returns (uint256 netBorrowedXinLAssets, uint256 netBorrowedYinLAssets);
```

### convertXToL

Convert X assets to L assets: L = x / sqrt(p)
amountLAssets = amountInXAssets * Q72 / sqrtPriceInXInQ72


```solidity
function convertXToL(
    uint256 amountInXAssets,
    uint256 sqrtPriceInXInQ72,
    bool roundUp
) internal pure returns (uint256 amountLAssets);
```

### convertLToX

Convert L assets to X assets: x = L * sqrt(p)
amountXAssets = amount * sqrtPriceQ72 / Q72


```solidity
function convertLToX(
    uint256 amount,
    uint256 sqrtPriceQ72,
    bool roundUp
) internal pure returns (uint256 amountXAssets);
```

### convertYToL

Convert Y assets to L assets: L = y * sqrt(p)
amountLAssets = amountInYAssets * sqrtPriceInXInQ72 / Q72


```solidity
function convertYToL(
    uint256 amountInYAssets,
    uint256 sqrtPriceInXInQ72,
    bool roundUp
) internal pure returns (uint256 amountInLAssets);
```

### convertLToY

Convert L assets to Y assets: y = L / sqrt(p)
amountYAssets = amount * Q72 / sqrtPriceQ72


```solidity
function convertLToY(
    uint256 amount,
    uint256 sqrtPriceQ72,
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
must come into buy the debt.


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
    int16 minTick;
    int16 maxTick;
    uint256 sqrtPriceMinInQ72;
    uint256 sqrtPriceMaxInQ72;
    uint256 activeLiquidityAssets;
    uint256 reservesXAssets;
    uint256 reservesYAssets;
    bool hasBorrow;
}
```

### CheckLtvParams

```solidity
struct CheckLtvParams {
    uint256 netDepositedXinLAssets;
    uint256 netDepositedYinLAssets;
    uint256 netBorrowedXinLAssets;
    uint256 netBorrowedYinLAssets;
}
```

### VerifyMaxBorrowParams

```solidity
struct VerifyMaxBorrowParams {
    uint256 depositedAssets;
    uint256 borrowedAssets;
    uint256 reserve;
    uint256 totalDepositedLAssets;
    uint256 totalBorrowedLAssets;
}
```

