# Validation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/8a7f458eaa44bd6bb81314db98899ee7d35f8c57/contracts/libraries/Validation.sol)


## State Variables
### POW2_96

```solidity
uint256 public constant POW2_96 = 79_228_162_514_264_337_593_543_950_336;
```


## Functions
### validateSolvency

Added TokenType and uint256s for amount, balance from, and balance to
to enable to pass a value for the current balance of a token to avoid one
check of a balance that can be done from within a token.


```solidity
function validateSolvency(InputParams memory inputParams) internal pure;
```

### verifyNotSameAssetsSuppliedAndBorrowed


```solidity
function verifyNotSameAssetsSuppliedAndBorrowed(
    uint256 depositedX,
    uint256 depositedY,
    uint256 borrowedX,
    uint256 borrowedY
) internal pure;
```

### verifyMaxBorrowXY


```solidity
function verifyMaxBorrowXY(VerifyMaxBorrowXYParams memory params) internal pure;
```

### verifyMaxBorrowL


```solidity
function verifyMaxBorrowL(VerifyMaxBorrowLParams memory params) internal pure;
```

### getDepositsInL


```solidity
function getDepositsInL(InputParams memory inputParams)
    private
    pure
    returns (uint256 netDepositedXinL, uint256 netDepositedYinL);
```

### getBorrowedInL


```solidity
function getBorrowedInL(InputParams memory inputParams)
    private
    pure
    returns (uint256 netBorrowedXinL, uint256 netBorrowedYinL);
```

### convertXToL

The original math:
$ L * activeLiquidityScaler = x / 2 * \sqrt{p} $
previous equation:
amountL = Math.mulDiv(amount, POW2_96, 2 * sqrtPriceX96Range, rounding);
adding activeLiquidityScaler:
amountL = (amount * POW2_96 / (2 * sqrtPriceX96Range)) / (activeLiquidityScaler / POW2_96);
simplify to:
(amount * POW2_96 * POW2_96) / (2 * sqrtPriceX96Range * activeLiquidityScaler)
final equation:
amountL = Math.mulDiv(Math.mulDiv(amount, POW2_96, sqrtPriceX96Range, rounding), POW2_96, 2 * activeLiquidityScaler, rounding);
or more simplified (failed for some tests)
amountL = Math.mulDiv(amount, POW2_96 * POW2_96, 2 * sqrtPriceX96Range * activeLiquidityScaler);


```solidity
function convertXToL(
    uint256 amount,
    uint256 sqrtPriceX96Range,
    uint256 activeLiquidityScaler,
    Math.Rounding rounding
) private pure returns (uint256 amountL);
```

### convertYToL

The simplified math: $L = y * \sqrt{p} / 2$
Math.mulDiv(amount, sqrtPriceX96Range, 2 * POW2_96, rounding);
amountL = amount * sqrtPriceX96RangeScaled / 2 * POW2_96
sqrtPriceX96RangeScaled = sqrtPriceX96Range / activeLiquidityScaler / POW2_96;
simplify to:
amount * sqrtPriceX96Range / activeLiquidityScaler / POW2_96 / 2 * POW2_96
simplify to:
(amount * sqrtPriceX96Range) / (activeLiquidityScaler * 2)
final equation:
amountL = Math.mulDiv(amount, sqrtPriceX96Range, 2 * activeLiquidityScaler, rounding);


```solidity
function convertYToL(
    uint256 amount,
    uint256 sqrtPriceX96Range,
    uint256 activeLiquidityScaler,
    Math.Rounding rounding
) private pure returns (uint256 amountL);
```

### checkLtv


```solidity
function checkLtv(CheckLtvParams memory checkLtvParams, InputParams memory inputParams) private pure;
```

### increaseForSlippage

Calculates the impact slippage of buying the debt in the dex using the currently
available liquidity $L = \sqrt{x \cdot y}$.
Uses a few formulas to simplify to not need reserves to calculate the required collateral to buy the debt.

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

Using $L_{out}$ described in our method as `debtL`, $L$ or `activeLiquidity`,
and our fee, we use the above equation to solve for the amount of liquidity that
must come in to buy the debt.

```solidity
function increaseForSlippage(uint256 debtL, uint256 activeLiquidity) private pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`debtL`|`uint256`|The amount of debt with units of L that will need to be purchased in case of liquidation.|
|`activeLiquidity`|`uint256`|The amount of liquidity in the pool available to swap against.|


### checkLeverage


```solidity
function checkLeverage(CheckLtvParams memory checkLtvParams, uint8 allowedLeverage) private pure;
```

## Errors
### AmmalgamTransferAmtExceedsBalance

```solidity
error AmmalgamTransferAmtExceedsBalance();
```

### AmmalgamInsufficientLiquidity

```solidity
error AmmalgamInsufficientLiquidity();
```

### AmmalgamCannotBorrowAgainstSameCollateral

```solidity
error AmmalgamCannotBorrowAgainstSameCollateral();
```

### AmmalgamMaxBorrowReached

```solidity
error AmmalgamMaxBorrowReached();
```

### AmmalgamDepositIsNotStrictL_yBigger

```solidity
error AmmalgamDepositIsNotStrictL_yBigger();
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

## Structs
### InputParams

```solidity
struct InputParams {
    uint256 depositedX;
    uint256 depositedY;
    uint256 depositedL;
    uint256 borrowedX;
    uint256 borrowedY;
    uint256 borrowedL;
    TokenType tokenType;
    address toCheck;
    uint256 amount;
    uint256 balanceFrom;
    uint256 sqrtPriceX96Min;
    uint256 sqrtPriceX96Max;
    uint256 activeLiquidityScaler;
    uint112 activeLiquidity;
    uint8 ltv;
    uint8 allowedLeverage;
}
```

### CheckLtvParams

```solidity
struct CheckLtvParams {
    uint256 netDepositedXinL;
    uint256 netDepositedYinL;
    uint256 netBorrowedXinL;
    uint256 netBorrowedYinL;
    uint256 depositedL;
    uint8 ltv;
}
```

### VerifyMaxBorrowXYParams

```solidity
struct VerifyMaxBorrowXYParams {
    uint256 amount;
    uint256 deposited;
    uint256 borrowed;
    uint112 reserve;
    uint8 maxBorrow;
    uint256 totalLiquidity;
    uint256 borrowedLiquidity;
}
```

### VerifyMaxBorrowLParams

```solidity
struct VerifyMaxBorrowLParams {
    uint256 amountL;
    uint112 reserveX;
    uint112 reserveY;
    uint8 maxBorrow;
    uint256 depositedX;
    uint256 depositedY;
    uint256 totalLiquidity;
    uint256 borrowedX;
    uint256 borrowedY;
    uint256 borrowedL;
}
```

