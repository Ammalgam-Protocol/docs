# GeometricBWAP
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/libraries/GeometricBWAP.sol)


## State Variables
### MINIMUM_LONG_TERM_INTERVAL

```solidity
uint8 public constant MINIMUM_LONG_TERM_INTERVAL = 16;
```


### MID_TERM_ARRAY_LENGTH

```solidity
uint8 public constant MID_TERM_ARRAY_LENGTH = 65;
```


### LONG_TERM_ARRAY_LENGTH

```solidity
uint8 public constant LONG_TERM_ARRAY_LENGTH = 9;
```


### MID_TERM_ARRAY_LAST_INDEX

```solidity
uint8 private constant MID_TERM_ARRAY_LAST_INDEX = MID_TERM_ARRAY_LENGTH - 1;
```


### LONG_TERM_ARRAY_LAST_INDEX

```solidity
uint8 private constant LONG_TERM_ARRAY_LAST_INDEX = LONG_TERM_ARRAY_LENGTH - 1;
```


## Functions
### initialObservationStruct


```solidity
function initialObservationStruct(Observations storage self, uint24 longTermIntervalConfig) internal;
```

### configLongTermInterval

Configures the size of long-term block observations.

*This function is used to set the long-term block observations for the long term buffer.
It ensures that the provided `longTermIntervalSize` value is greater than 64.*


```solidity
function configLongTermInterval(Observations storage self, uint24 newInterval) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`newInterval`|`uint24`|The desired number of blocks for each long-term period. The size is set larger than the midTerm to ensure a sufficient buffer, requiring a minimum of 16 blocks per period. A minimum of 16 blocks per period is necessary, resulting in a total of 128 blocks (16 * 8) for the long-term buffer.|


### recordObservation

Records a new observation tick value and updates the observation data.

*This function is used to record new observation data for the contract. It ensures that
the provided tick value is stored appropriately in both mid-term and long-term
observations, updates interval counters, and handles tick cumulative values based
on the current interval configuration. Ensures that this function is called in
chronological order, with increasing block numbers. Reverting is triggered if the
provided block number is less than or equal to the last recorded block number.*


```solidity
function recordObservation(Observations storage self, int24 newTick) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage structure containing observation data.|
|`newTick`|`int24`|The new tick value to be recorded, representing the most recent update of reserveX and reserveY.|


### getTickRange

Gets the min and max range of tick values from the stored oracle observations.

*This function calculates the minimum and maximum tick values among three observed ticks:
long-term tick, mid-term tick, and current tick.*


```solidity
function getTickRange(Observations storage self) internal view returns (int24 minTick, int24 maxTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct where stored oracle array containing the tick observations.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minTick`|`int24`|The minimum tick value among the three observed ticks.|
|`maxTick`|`int24`|The maximum tick value among the three observed ticks.|


### getObservedTicks

*Retrieves the long-term, mid-term, and current tick values based on the stored observations.*


```solidity
function getObservedTicks(Observations storage self) internal view returns (int24, int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The long-term, mid-term, and last tick values.|
|`<none>`|`int24`||
|`<none>`|`int24`||


### getLastIndex


```solidity
function getLastIndex(uint8 index, uint8 lastIndex) private pure returns (uint8);
```

## Errors
### AmmalgamInvalidLongTermInterval

```solidity
error AmmalgamInvalidLongTermInterval();
```

### AmmalgamBlockNumberValidationFailed

```solidity
error AmmalgamBlockNumberValidationFailed();
```

### AmmalgamLongTermBufferIsNotInitialized

```solidity
error AmmalgamLongTermBufferIsNotInitialized();
```

## Structs
### Observations
Struct for storing observations related to the Geometric BWAP calculation.

*This struct holds various data points used in the Block-Weighted Average Price (BWAP)
calculation.*


```solidity
struct Observations {
    uint8 midTermIndex;
    uint8 longTermIndex;
    int24 lastTick;
    int24 midTermIntervalDelta;
    int24 longTermIntervalDelta;
    uint24 longTermIntervalConfig;
    uint24 longTermActiveBlockCounter;
    uint24[MID_TERM_ARRAY_LENGTH] midTermObservationInterval;
    uint24[LONG_TERM_ARRAY_LENGTH] longTermObservationInterval;
    int56[MID_TERM_ARRAY_LENGTH] midTerm;
    int56[LONG_TERM_ARRAY_LENGTH] longTerm;
    uint256 lastBlock;
}
```

