# Interest
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/0225322e5b1d4d1ce3ec3ffc220dfd4d8afaf521/contracts/libraries/Interest.sol)

This library is used for calculating and accruing interest.

*many calculations are unchecked because we asset values are stored as uint128. We also limit
the max amount amount of interest to ensure that it can not overflow when added to the
current assets.*


## State Variables
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
uint128 internal constant SLOPE1 = 0.1e18;
```


### SLOPE2

```solidity
uint128 internal constant SLOPE2 = 2e18;
```


### SLOPE3

```solidity
uint128 internal constant SLOPE3 = 20e18;
```


### BASE_OPTIMAL_UTILIZATION

```solidity
uint128 internal constant BASE_OPTIMAL_UTILIZATION = 0.08e18;
```


### BASE_DANGER_UTILIZATION

```solidity
uint128 internal constant BASE_DANGER_UTILIZATION = 0.33e18;
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
uint256 private constant LAST_DEPOSIT = 2;
```


### PENALTY_SATURATION_PERCENT_IN_WAD
*Maximum percentage for the penalty saturation allowed.
This is used to prevent excessive penalties in case of high utilization.*


```solidity
uint256 private constant PENALTY_SATURATION_PERCENT_IN_WAD = 0.85e18;
```


### SATURATION_PENALTY_BUFFER_IN_WAD
*`MAX_SATURATION_PERCENT_IN_WAD` - `PENALTY_SATURATION_PERCENT_IN_WAD`*


```solidity
uint256 private constant SATURATION_PENALTY_BUFFER_IN_WAD = 0.1e18;
```


## Functions
### accrueInterestAndUpdateReservesWithAssets


```solidity
function accrueInterestAndUpdateReservesWithAssets(
    uint128[6] storage assets,
    AccrueInterestParams memory accrueInterestParams
) external returns (uint256 interestXForLP, uint256 interestYForLP, uint256[3] memory protocolFeeAssets);
```

### getReservesAtTick

we approximate the reserves based on an average tick value since the last lending
state update.

*this will never return values greater than uint112 max when used correctly. The reserve
values are underestimated due to a tick being an approximate price. We use a smaller
value when multiplying and a larger when dividing to ensure that we do not overflow.*


```solidity
function getReservesAtTick(
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
    uint256 reservesYAssets,
    uint256 satPercentageInWads
) internal pure returns (uint256[3] memory utilizationInWads);
```

### accrueInterestWithAssets


```solidity
function accrueInterestWithAssets(
    uint128[6] memory assets,
    AccrueInterestParams memory params
)
    public
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

### mutateUtilizationForSaturation

Adjusts utilization based on saturation to calculate interest penalties

*When saturation exceeds `PENALTY_SATURATION_PERCENT_IN_WAD`, utilization is increased
to apply higher interest rates as a penalty for high saturation*


```solidity
function mutateUtilizationForSaturation(uint256 utilization, uint256 maxSatInWads) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`uint256`|Current utilization of `L`, `X`, or `Y` assets|
|`maxSatInWads`|`uint256`|Saturation utilization|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The adjusted utilization value|


### computeInterestAssets


```solidity
function computeInterestAssets(
    uint256 duration,
    uint256 utilization,
    uint256 borrowedAssets,
    uint256 depositedAssets
) internal pure returns (uint256);
```

### computeInterestAssetsGivenRate


```solidity
function computeInterestAssetsGivenRate(
    uint256 duration,
    uint256 borrowedAssets,
    uint256 depositedAssets,
    uint256 rateInWads
) internal pure returns (uint256);
```

### addInterestToAssets


```solidity
function addInterestToAssets(uint256 prevAssets, uint256 interest) internal pure returns (uint128);
```

### getAnnualInterestRatePerSecondInWads

Gets the annual interest rate for a given utilization

*Same as getAnnualInterestRatePerSecondInWads but without dividing by SECONDS_IN_YEAR*


```solidity
function getAnnualInterestRatePerSecondInWads(
    uint256 utilizationInWads
) internal pure returns (uint256 interestRate);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilizationInWads`|`uint256`|The utilization rate in WADs|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`interestRate`|`uint256`|The annual interest rate in WADs|


## Events
### InterestAccrued

```solidity
event InterestAccrued(
    uint128 depositLAssets,
    uint128 depositXAssets,
    uint128 depositYAssets,
    uint128 borrowLAssets,
    uint128 borrowXAssets,
    uint128 borrowYAssets
);
```

## Structs
### AccrueInterestParams

```solidity
struct AccrueInterestParams {
    uint256 duration;
    int16 lendingStateTick;
    uint256 adjustedActiveLiquidity;
    uint112[6] shares;
    uint256 satPercentageInWads;
}
```

