# Convert
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/78757f8a0ce2219e96389fd2347e05df5d8691e4/contracts/libraries/Convert.sol)


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

