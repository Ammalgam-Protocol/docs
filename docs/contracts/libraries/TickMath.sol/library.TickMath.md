# TickMath
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/6642ecf302d69320796403bcb5da0c96165f00bd/contracts/libraries/TickMath.sol)

Computes sqrt price for ticks of size 1.0001, i.e. sqrt(1.0001^tick) as fixed point Q64.96 numbers. Supports
prices between 2**-128 and 2**128


## State Variables
### MIN_TICK
*The minimum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**-128*


```solidity
int24 internal constant MIN_TICK = -887_272;
```


### MAX_TICK
*The maximum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**128*


```solidity
int24 internal constant MAX_TICK = -MIN_TICK;
```


### MIN_SQRT_RATIO
*The minimum value that can be returned from #getSqrtRatioAtTick. Equivalent to getSqrtRatioAtTick(MIN_TICK)*


```solidity
uint160 internal constant MIN_SQRT_RATIO = 4_295_128_739;
```


### MAX_SQRT_RATIO
*The maximum value that can be returned from #getSqrtRatioAtTick. Equivalent to getSqrtRatioAtTick(MAX_TICK)*


```solidity
uint160 internal constant MAX_SQRT_RATIO = 1_461_446_703_485_210_103_287_273_052_203_988_822_378_723_970_342;
```


## Functions
### getSqrtRatioAtTick

Calculates sqrt(1.0001^tick) * 2^96

*Throws if |tick| > max tick*


```solidity
function getSqrtRatioAtTick(int24 tick) internal pure returns (uint160 sqrtPriceX96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The input tick for the above formula|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceX96`|`uint160`|A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0) at the given tick|


### getTickAtSqrtRatio

Calculates the greatest tick value such that getRatioAtTick(tick) `<=` ratio

*Throws in case sqrtPriceX96 < MIN_SQRT_RATIO, as MIN_SQRT_RATIO is the lowest value getRatioAtTick may
ever return.*


```solidity
function getTickAtSqrtRatio(uint160 sqrtPriceX96) internal pure returns (int24 tick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceX96`|`uint160`|The sqrt ratio for which to compute the tick as a Q64.96|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The greatest tick for which the ratio is less than or equal to the input ratio|


