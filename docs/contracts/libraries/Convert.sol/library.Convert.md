# Convert
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/libraries/Convert.sol)


## State Variables
### BUFFER

```solidity
uint256 private constant BUFFER = 95;
```


## Functions
### toLiquidityAssets


```solidity
function toLiquidityAssets(
    uint256 liquidityShares,
    uint256 reserves,
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
function mulDiv(uint256 x, uint256 y, uint256 z, bool roundingUp) internal pure returns (uint256);
```

### calcLiquidityConsideringDepletion


```solidity
function calcLiquidityConsideringDepletion(
    uint256 amountOfAssets,
    uint256 reserveAssets,
    uint256 _missingAssets,
    uint256 activeLiquidityAssets,
    uint256 depositedLiquidityAssets,
    uint256 depositedLiquidityShares,
    bool isRoundingUp
) internal pure returns (uint256 liquidityAssets, uint256 liquidityShares);
```

### depletionReserveAdjustmentWhenLiquidityIsAdded

*Minting when assets depleted requires less of the depleted asset as we
give extra credit to minter for bringing the scarce asset. We account
for liquidity as if moving from the unmodified invariant prior to mint
to the where it would move after the mint including the extra credited
scarce asset.
I continue to update the Desmos to help create test cases with easier
numbers to reason about, The current version of desmos is linked below.
The chart could use some clean up and reorganization to be clearer, will
do in the future.
https://www.desmos.com/calculator/etzuxkjeig*


```solidity
function depletionReserveAdjustmentWhenLiquidityIsAdded(
    uint256 amountAssets,
    uint256 reserveAssets,
    uint256 _missingAssets,
    uint256 activeLiquidityAssets,
    uint256 depositedLAssets,
    uint256 depositedLShares,
    bool roundingUp
) private pure returns (uint256 liquidityAssets, uint256 liquidityShares);
```

