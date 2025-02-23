# TickMath
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/libraries/TickMath.sol)

Computes sqrt price for ticks of size B=(1-2^-9)^-1 as fixed point Q128 numbers. Supports
prices between 2**-112 and 2**112-1


## State Variables
### B_IN_Q128

```solidity
uint256 internal constant B_IN_Q128 = 0x100804020100804020100804020100805;
```


### BASE_CHANGE_CONSTANT_IN_Q128

```solidity
int256 private constant BASE_CHANGE_CONSTANT_IN_Q128 = 0xb145b7be86780ae93f;
```


### TICK_LOW_ERROR_CORRECTION_IN_Q128

```solidity
int256 private constant TICK_LOW_ERROR_CORRECTION_IN_Q128 = 0x1f6d22eefc342687357a94df44b0dbf;
```


### TICK_HI_ERROR_CORRECTION_IN_Q128

```solidity
int256 private constant TICK_HI_ERROR_CORRECTION_IN_Q128 = 0xb33c8bdbc23c5eaf1cd8140681512562;
```


### MIN_PRICE_IN_Q128

```solidity
uint256 internal constant MIN_PRICE_IN_Q128 = 0x10000;
```


### MAX_PRICE_IN_Q128

```solidity
uint256 internal constant MAX_PRICE_IN_Q128 = 0xffffffffffffffffffffffffffff00000000000000000000000000000000;
```


### MIN_SQRT_PRICE_IN_Q128

```solidity
uint256 constant MIN_SQRT_PRICE_IN_Q128 = 0xffc029ab6df090b37e;
```


### MAX_SQRT_PRICE_IN_Q128

```solidity
uint256 constant MAX_SQRT_PRICE_IN_Q128 = 0xffbfc6509a7540f2db82e1f475e2c218a22bd92d7c18c3;
```


### MIN_TICK

```solidity
int16 internal constant MIN_TICK = -0x4d8f;
```


### MAX_TICK

```solidity
int16 internal constant MAX_TICK = -MIN_TICK - 1;
```


## Functions
### getSqrtPriceAtTick


```solidity
function getSqrtPriceAtTick(
    int16 tick
) internal pure returns (uint256 sqrtPriceInQ128);
```

### getTickAtPrice


```solidity
function getTickAtPrice(
    uint256 priceInQ128
) internal pure returns (int16);
```

### getPriceAtTick


```solidity
function getPriceAtTick(
    int16 tick
) internal pure returns (uint256 priceInQ128);
```

### applyMultiplications


```solidity
function applyMultiplications(
    uint256 absTick
) private pure returns (uint256 valueInQ128);
```

## Errors
### PriceOutOfBounds

```solidity
error PriceOutOfBounds();
```

### TickOutOfBounds

```solidity
error TickOutOfBounds();
```

