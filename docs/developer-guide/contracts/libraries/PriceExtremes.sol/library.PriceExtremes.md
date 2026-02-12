# PriceExtremes
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/4d2f4d795e41c416369cdfb007849b5c034fc068/contracts/libraries/PriceExtremes.sol)

Tracks intra-observation price extremes to mitigate TWAP lag attacks.

*Records max/min priceQ128 per observation interval so arb-driven price signals
are captured even if the attacker resets the price afterward.*


## Functions
### record

Record a priceQ128 observation, rolling over intervals as needed.


```solidity
function record(State storage state, uint256 priceQ128, uint32 interval) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`state`|`State`|    The per-pair extreme tracking state|
|`priceQ128`|`uint256`|The current price as reserveX * Q128 / reserveY|
|`interval`|`uint32`| The observation interval (DEFAULT_MID_TERM_INTERVAL)|


### widen

Widen a [minTick, maxTick] range using fresh price extremes. Never narrows.

*Converts stored priceQ128 values to ticks via TickMath.getTickAtPrice().*


```solidity
function widen(
    State storage state,
    int16 minTick,
    int16 maxTick,
    uint32 interval
) internal view returns (int16 widenedMin, int16 widenedMax);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`state`|`State`|   The per-pair extreme tracking state|
|`minTick`|`int16`| Current minimum tick (from getTickRange)|
|`maxTick`|`int16`| Current maximum tick (from getTickRange)|
|`interval`|`uint32`|The observation interval (DEFAULT_MID_TERM_INTERVAL)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`widenedMin`|`int16`| The potentially widened minimum tick|
|`widenedMax`|`int16`| The potentially widened maximum tick|


## Structs
### State

```solidity
struct State {
    uint32 currentTimestamp;
    uint32 previousTimestamp;
    uint256 currentMaxPrice;
    uint256 currentMinPrice;
    uint256 previousMaxPrice;
    uint256 previousMinPrice;
}
```

