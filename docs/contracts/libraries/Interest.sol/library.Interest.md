# Interest
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/Interest.sol)


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
uint128 internal constant SECONDS_IN_YEAR = 31_536_000;
```


## Functions
### accrueInterestAndUpdateReserves


```solidity
function accrueInterestAndUpdateReserves(
    Scalers storage sharesToAssetsScaler,
    AccrueInterestParams memory accrueInterestParams,
    int24 lendingStateTick
) internal returns (uint256 interestXForLP, uint256 interestYForLP);
```

### getReservesAtLendingTick


```solidity
function getReservesAtLendingTick(
    uint112 depositedLShares,
    uint112 borrowedLShares,
    uint128 depositedLScaler,
    uint128 borrowedLScaler,
    int24 lendingStateTick
) internal pure returns (uint112 reserveX, uint112 reserveY);
```

### accrueInterest


```solidity
function accrueInterest(
    Scalers storage sharesToAssetsScaler,
    AccrueInterestParams memory params
) internal returns (uint256 interestXForLP, uint256 interestYForLP);
```

### getScaler


```solidity
function getScaler(
    Scalers storage scalers,
    uint8 targetTokenType,
    uint8 borrowedTokenType,
    uint256 duration,
    uint112 addedReserveAtLendingStateTick,
    uint256 borrowedShares,
    uint256 depositedShares
) internal view returns (uint128);
```

### computeScalers


```solidity
function computeScalers(
    Scalers storage scalers,
    uint8 borrowedTokenType,
    uint256 duration,
    uint112 addedReserveAtLendingStateTick,
    uint256 borrowedShares,
    uint256 depositedShares
) private view returns (uint128, uint128, uint256);
```

### computeAndAllocateInterest


```solidity
function computeAndAllocateInterest(
    Scalers storage scalers,
    uint8 borrowedTokenType,
    uint256 duration,
    uint112 addedReserveAtLendingStateTick,
    uint256 borrowedShares,
    uint256 depositedShares
) internal returns (uint256);
```

### computeInterest


```solidity
function computeInterest(
    uint256 duration,
    uint256 totalBorrowedAssets,
    uint256 totalDepositedAssets
) internal pure returns (uint256);
```

### computeInterestScaler


```solidity
function computeInterestScaler(
    uint256 totalShares,
    uint256 interestInWad,
    uint128 prevInterestScaler
) internal pure returns (uint128);
```

### getInterestRatePerSecond


```solidity
function getInterestRatePerSecond(uint256 utilization) internal pure returns (uint256 interestRate);
```

## Structs
### AccrueInterestParams

```solidity
struct AccrueInterestParams {
    uint256 duration;
    uint112 reserveX;
    uint112 reserveY;
    uint112 borrowedXShares;
    uint112 borrowedYShares;
    uint112 borrowedLShares;
    uint112 depositedXShares;
    uint112 depositedYShares;
    uint112 depositedLShares;
}
```

