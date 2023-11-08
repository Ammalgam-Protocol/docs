# DepletedAssetUtils
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/55eccbeef5b0ef289c29a5edda7e20c492c25998/contracts/utils/DepletedAssetUtils.sol)


## State Variables
### BUFFER

```solidity
uint256 public constant BUFFER = 95;
```


### FEE

```solidity
uint256 public constant FEE = 3;
```


## Functions
### computeExpectedSwapInAmount


```solidity
function computeExpectedSwapInAmount(
    uint256 swapAmountOut,
    uint256 reserveIn,
    uint256 reserveOut,
    uint256 missingIn,
    uint256 missingOut
) public pure returns (uint256 swapAmountIn);
```

### computeExpectedSwapOutAmount


```solidity
function computeExpectedSwapOutAmount(
    uint256 swapAmountIn,
    uint256 reserveIn,
    uint256 reserveOut,
    uint256 missingIn,
    uint256 missingOut
) public pure returns (uint256 expectedSwapOut);
```

### computeCurve

*See Desmos chart functions C_X and C_y for https://www.Desmos.com/calculator/22bdlqiazt*


```solidity
function computeCurve(
    uint256 a,
    uint256 reserveA,
    uint256 reserveB,
    uint256 missingA,
    uint256 missingB,
    uint256 decimals
) public pure returns (uint256 b);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|        starting value x or y|
|`reserveA`|`uint256`| reserve for start asset|
|`reserveB`|`uint256`| reserve for end asset|
|`missingA`|`uint256`| missing for start asset|
|`missingB`|`uint256`| missing for end asset|
|`decimals`|`uint256`| decimals when a is passed in with additional precision due to fees|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`b`|`uint256`|       ending value y or x|


### computeAmountsForRepayLiquidity


```solidity
function computeAmountsForRepayLiquidity(
    uint256 liquidity,
    uint256 missingX,
    uint256 missingY,
    uint256 reserveX,
    uint256 reserveY,
    uint256 activeLiquidity_
) public pure returns (uint256 amountX, uint256 amountY);
```

### computeAmountForRepayLiquidity


```solidity
function computeAmountForRepayLiquidity(
    uint256 liquidity,
    uint256 missing_,
    uint256 reserve_,
    uint256 activeLiquidity_
) private pure returns (uint256 amount_);
```

### actualToAdjusted

*See Desmos chart functions X_A or Y_A for https://www.Desmos.com/calculator/22bdlqiazt
private due to modifications of equations for preserving precision.*


```solidity
function actualToAdjusted(uint256 actual, uint256 missing) private pure returns (uint256 adjusted);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`actual`|`uint256`|actual x or y|
|`missing`|`uint256`|missing assets associated with actual|


### adjustedToActual

*See Desmos chart functions X_I or Y_I for https://www.Desmos.com/calculator/22bdlqiazt inverse of actualToAdjusted
private due to modifications of equations for preserving precision.*


```solidity
function adjustedToActual(uint256 adjusted, uint256 missing) private pure returns (uint256 actual);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`adjusted`|`uint256`|adjusted value of X|
|`missing`|`uint256`|missing assets associated with adjusted|


## Errors
### MissingOutGteReserveOut

```solidity
error MissingOutGteReserveOut();
```

### MissingGteActual

```solidity
error MissingGteActual();
```

