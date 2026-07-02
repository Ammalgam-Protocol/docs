# Convert
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/libraries/Convert.sol)


## Functions
### toLiquidityAssets


```solidity
function toLiquidityAssets(
    uint256 liquidityShares,
    uint256 reservesAssets,
    uint256 activeLiquidityAssets,
    uint256 depositLiquidityAssets,
    uint256 depositLiquidityShares
) internal pure returns (uint256);
```

### toAssets


```solidity
function toAssets(
    uint256 shares,
    uint256 totalAssets,
    uint256 totalShares,
    bool roundingUp
) internal pure returns (uint256 _assets);
```

### toShares


```solidity
function toShares(
    uint256 assets,
    uint256 totalAssets,
    uint256 totalShares,
    bool roundingUp
) internal pure returns (uint256 _shares);
```

### mulDiv


```solidity
function mulDiv(uint256 x, uint256 y, uint256 z, bool roundingUp) internal pure returns (uint256 result);
```

### calculateReserveAdjustmentsForMissingAssets

helper method to calculate balance adjustment for missing assets

*In the depleted case the adjusted reserve is `(reserve - missing) * bufferNumerator`,
matching the `BUFFER_NUMERATOR` scaling applied by `calculateBalanceAfterFees` so the
K comparison stays division-free.
For updateObservation, different scaled `buffer` and `bufferNumerator` values
are supplied so the adjusted reserve reflects observation-specific logic.*


```solidity
function calculateReserveAdjustmentsForMissingAssets(
    uint256 reserve,
    uint256 missing,
    uint256 buffer,
    uint256 bufferNumerator
) internal pure returns (uint256 reserveAdjustment);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserve`|`uint256`|the starting reserve|
|`missing`|`uint256`|the missing assets, zero if deposits > borrows of X or Y|
|`buffer`|`uint256`| Scaling factor applied to the reserve for the depletion comparison.|
|`bufferNumerator`|`uint256`| Scaling factor applied to the missing amount for the comparison and for computing the depleted-case adjusted reserve.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveAdjustment`|`uint256`|The adjusted reserve value used for swap or updateObservation depends on the buffer, bufferNumerator to be passed in.|


### depletionAdjustedActiveLiquidity

Depletion-adjusted active liquidity, `sqrt` of the adjusted-reserve product using the
swap K-check buffer. Shared by interest accrual and `TokenController.calculateActiveLiquidityAssets`
so every active-liquidity reader uses one basis.


```solidity
function depletionAdjustedActiveLiquidity(
    uint256 reserveXAssets,
    uint256 reserveYAssets,
    uint256 missingXAssets,
    uint256 missingYAssets
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserveXAssets`|`uint256`|reserve X used for the active-liquidity calculation.|
|`reserveYAssets`|`uint256`|reserve Y used for the active-liquidity calculation.|
|`missingXAssets`|`uint256`|missing X assets, zero if deposits > borrows of X.|
|`missingYAssets`|`uint256`|missing Y assets, zero if deposits > borrows of Y.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The depletion-adjusted active liquidity.|


