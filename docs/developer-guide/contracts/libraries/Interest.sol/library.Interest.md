# Interest
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6e61b51e90091137f7e2abb147c11731a6d4681e/contracts/libraries/Interest.sol)

This library is used for calculating and accruing interest.

*many calculations are unchecked because we asset values are stored as uint128. We also limit
the max amount amount of interest to ensure that it can not overflow when added to the
current assets.*


## State Variables
### BASE

```solidity
uint128 internal constant BASE = 0;
```


### OPTIMAL_UTILIZATION

```solidity
uint128 internal constant OPTIMAL_UTILIZATION = 0.8e18;
```


### DANGER_UTILIZATION

```solidity
uint128 internal constant DANGER_UTILIZATION = 0.925e18;
```


### SLOPE1

```solidity
uint128 internal constant SLOPE1 = 0.0375e18;
```


### SLOPE2

```solidity
uint128 internal constant SLOPE2 = 1e18;
```


### SLOPE3

```solidity
uint128 internal constant SLOPE3 = 20e18;
```


### SECONDS_IN_YEAR

```solidity
uint128 internal constant SECONDS_IN_YEAR = 365 days;
```


### LENDING_FEE_RATE

```solidity
uint128 internal constant LENDING_FEE_RATE = 10;
```


### MAX_UINT112

```solidity
uint256 private constant MAX_UINT112 = type(uint112).max;
```


### LAST_DEPOSIT

```solidity
uint256 private constant LAST_DEPOSIT = FIRST_DEBT_TOKEN - 1;
```


## Functions
### accrueInterestAndUpdateReservesWithAssets


```solidity
function accrueInterestAndUpdateReservesWithAssets(
    uint128[6] storage assets,
    AccrueInterestParams memory accrueInterestParams
) internal returns (uint256 interestXForLP, uint256 interestYForLP, uint256[3] memory protocolFeeAssets);
```

### getReservesAtLendingTick

we approximate the reserves based on an average tick value since the last lending
state update.

*this will never return values greater than uint112 max when used correctly. The reserve
values are underestimated due to a tick being an approximate price. We use a smaller
value when multiplying and a larger when dividing to ensure that we do not overflow.*


```solidity
function getReservesAtLendingTick(
    uint256 activeLiquidityAssets,
    int16 lendingStateTick
) internal pure returns (uint256 reserveXAssets, uint256 reserveYAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`activeLiquidityAssets`|`uint256`|active L where $\sqrt(reserveX * reserveY) = L$|
|`lendingStateTick`|`int16`|Average tick value since last lending state update.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveXAssets`|`uint256`|approximate average reserve since last lending state update.|
|`reserveYAssets`|`uint256`|approximate average reserve since last lending state update.|


### getUtilizationsInWads


```solidity
function getUtilizationsInWads(
    uint128[6] memory startingAssets,
    uint256 reservesXAssets,
    uint256 reservesYAssets
) internal pure returns (uint256[3] memory utilizationInWads);
```

### accrueInterestWithAssets


```solidity
function accrueInterestWithAssets(
    uint128[6] memory assets,
    AccrueInterestParams memory params
)
    internal
    pure
    returns (
        uint128[6] memory newAssets,
        uint256 interestXPortionForLP,
        uint256 interestYPortionForLP,
        uint256[3] memory protocolFeeAssets
    );
```

### getUtilizationInWads


```solidity
function getUtilizationInWads(
    uint256 totalBorrowedAssets,
    uint256 totalDepositedAssets
) internal pure returns (uint256 utilization);
```

### computeInterestAssets


```solidity
function computeInterestAssets(
    uint256 duration,
    uint256 utilization,
    uint256 borrowedAssets,
    uint256 depositedAssets
) internal pure returns (uint256);
```

### addInterestToAssets


```solidity
function addInterestToAssets(uint256 prevAssets, uint256 interest) internal pure returns (uint128);
```

### getInterestRatePerSecond


```solidity
function getInterestRatePerSecond(
    uint256 utilizationInWads
) internal pure returns (uint256 interestRate);
```

## Structs
### AccrueInterestParams

```solidity
struct AccrueInterestParams {
    uint256 duration;
    int16 lendingStateTick;
    uint256 adjustedActiveLiquidity;
    uint112[6] shares;
}
```

