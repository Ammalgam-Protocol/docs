# PriceExtremes
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/libraries/PriceExtremes.sol)

Tracks intra-observation price extremes to mitigate TWAP lag attacks.

*Records max/min ticks per observation interval so arb-driven price signals are captured
even if the attacker resets the price afterward.*


## Functions
### record

Record a priceQ128 observation as inclusive min and exclusive max ticks.


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

Widen a [minTick, maxTick) range using fresh price extremes. Never narrows.


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
|`maxTick`|`int16`| Current exclusive maximum tick (from getTickRange)|
|`interval`|`uint32`|The observation interval (DEFAULT_MID_TERM_INTERVAL)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`widenedMin`|`int16`| The potentially widened minimum tick|
|`widenedMax`|`int16`| The potentially widened maximum tick|


### _widen


```solidity
function _widen(
    uint32 stateTimestamp,
    int16 slotMinTick,
    int16 slotMaxTick,
    bool initialized,
    uint32 currentTimestamp,
    uint32 maxAge,
    int16 widenMin,
    int16 widenMax
) private pure returns (int16, int16);
```

## Structs
### State
State for tracking price extremes within an observation interval.


```solidity
struct State {
    uint32 currentTimestamp;
    uint32 previousTimestamp;
    int16 currentMaxTick;
    int16 currentMinTick;
    int16 previousMaxTick;
    int16 previousMinTick;
    bool currentInitialized;
    bool previousInitialized;
}
```

