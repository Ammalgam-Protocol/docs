# GeometricTWAP
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/libraries/GeometricTWAP.sol)


## State Variables
### MID_TERM_ARRAY_LENGTH

```solidity
uint256 public constant MID_TERM_ARRAY_LENGTH = 51;
```


### LONG_TERM_ARRAY_LENGTH

```solidity
uint256 public constant LONG_TERM_ARRAY_LENGTH = 9;
```


### LONG_TERM_BUFFER_FACTOR
*`LONG_TERM_BUFFER_FACTOR` is a factor to ensure the size of the long-term buffer is at-least double
the size of the mid-term buffer.
ceil((MID_TERM_ARRAY_LENGTH - 1) / (LONG_TERM_ARRAY_LENGTH - 1)) * 2;
ceil(50 / 8) * 2 = 14*


```solidity
uint256 public constant LONG_TERM_BUFFER_FACTOR = 14;
```


### MID_TERM_ARRAY_LAST_INDEX

```solidity
uint256 private constant MID_TERM_ARRAY_LAST_INDEX = MID_TERM_ARRAY_LENGTH - 1;
```


### LONG_TERM_ARRAY_LAST_INDEX

```solidity
uint256 private constant LONG_TERM_ARRAY_LAST_INDEX = LONG_TERM_ARRAY_LENGTH - 1;
```


### TICK_NOT_AVAILABLE

```solidity
int56 public constant TICK_NOT_AVAILABLE = type(int56).min;
```


## Functions
### initializeObservationStruct


```solidity
function initializeObservationStruct(
    Observations storage self,
    uint24 midTermIntervalConfig,
    uint24 longTermIntervalConfigFactor,
    int16 firstTick
) external;
```

### configLongTermInterval

Configures the interval of long-term observations.

*This function is used to set the long-term interval between observations for the long-term buffer.*


```solidity
function configLongTermInterval(Observations storage self, uint24 longTermIntervalConfigFactor) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`longTermIntervalConfigFactor`|`uint24`|The desired duration for each long-term period. The size is set as a factor of the mid-term interval to ensure a sufficient buffer, requiring at least 16 * 12 = 192 seconds per period, resulting in a total of ~25 minutes (192 * 8 = 1536 seconds) for the long-term buffer.|


### recordObservation

Records a new observation tick value and updates the observation data.

*This function is used to record new observation data for the contract. It ensures that
the provided tick value is stored appropriately in both mid-term and long-term
observations, updates interval counters, and handles tick cumulative values based
on the current interval configuration. Ensures that this function is called in
chronological order, with increasing timestamps. Returns in case the
provided block timestamp is less than or equal to the last recorded timestamp.*


```solidity
function recordObservation(Observations storage self, int16 newTick, uint32 currentTimestamp) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage structure containing observation data.|
|`newTick`|`int16`|The new tick value to be recorded, representing the most recent update of reserveXAssets and reserveYAssets.|
|`currentTimestamp`|`uint32`|The current block timestamp.|


### getTickRange

Gets the min and max range of tick values from the stored oracle observations.

*This function calculates the minimum and maximum tick values among three observed ticks:
long-term tick, mid-term tick, and current tick.*


```solidity
function getTickRange(
    Observations storage self
) external view returns (int16, int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct where stored oracle array containing the tick observations.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|minTick The minimum tick value among the three observed ticks.|
|`<none>`|`int16`|maxTick The maximum tick value among the three observed ticks.|


### getObservedTicks

*Retrieves the long-term, mid-term, and current tick values based on the stored observations.*

*visibility is only `internal` for testing purposes*


```solidity
function getObservedTicks(
    Observations storage self,
    bool isLongTermBufferInitialized
) internal view returns (int16, int16, int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct.|
|`isLongTermBufferInitialized`|`bool`|Boolean value which represents whether long-term buffer is filled or not.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|The long-term, mid-term, and last tick values.|
|`<none>`|`int16`||
|`<none>`|`int16`||


### getTickRangeInternal


```solidity
function getTickRangeInternal(
    int16 longTermTick,
    int16 midTermTick,
    int16 currentTick,
    uint256 factor
) internal pure returns (int16 minTick, int16 maxTick);
```

### getMidTermAtLastIndex


```solidity
function getMidTermAtLastIndex(Observations storage self, uint8 index) private view returns (int56);
```

### getLastIndex


```solidity
function getLastIndex(uint256 index, uint256 lastIndex) private pure returns (uint256);
```

### getNextIndex


```solidity
function getNextIndex(uint8 currentIndex, uint8 indexLength) private pure returns (uint8);
```

### calculateLongTermInterval


```solidity
function calculateLongTermInterval(
    uint256 midTermIntervalConfig,
    uint256 longTermIntervalConfigFactor
) private pure returns (uint24);
```

### getLendingStateTickAndCheckpoint

Gets the tick value representing the TWAP since the last
lending update and checkpoints the current lending cumulative sum
as `self.lendingCumulativeSum` and the current block timestamp as `self.lastLendingTimestamp`.

*See `getLendingStateTick` for implementation details which was
separated to allow view access without any state updates.*


```solidity
function getLendingStateTickAndCheckpoint(
    Observations storage self
) external returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|Observations storage struct|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|lendingStateTick The tick value representing the TWAP since the last lending update.|


### getLendingStateTick

Gets the tick value representing the TWAP since the last lending update.


```solidity
function getLendingStateTick(Observations storage self, int56 newTick) internal view returns (int16, int56, uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|Observations storage struct|
|`newTick`|`int56`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|lendingStateTick The tick value representing the TWAP since the last lending update.|
|`<none>`|`int56`|currentCumulativeSum The current cumulative sum for the last updated timestamp.|
|`<none>`|`uint32`|currentTimestamp The current block timestamp to save on gas costs for the caller.|


### calculateLendingStateTick

Computes the lending state tick based on the cumulative sum and duration.

*If no time has passed since the last lending timestamp, it returns the last lending state tick.*


```solidity
function calculateLendingStateTick(
    int56 cumulativeSum,
    int56 previousCumulativeSum,
    uint32 lastLendingTimestamp,
    uint32 currentTimestamp
) private pure returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cumulativeSum`|`int56`|The current cumulative sum of mid-term values.|
|`previousCumulativeSum`|`int56`|The previous cumulative sum recorded for lending.|
|`lastLendingTimestamp`|`uint32`|The timestamp when the last lending state was updated.|
|`currentTimestamp`|`uint32`|The current block timestamp.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|lendingStateTick The computed or fallback lending state tick.|


### setLendingState


```solidity
function setLendingState(
    Observations storage self,
    int16 lendingStateTick,
    int56 currentCumulativeSum,
    uint32 currentTimestamp
) private;
```

### setObservationData

Updates the observation data with the new tick value and current timestamp.

*This function updates both mid-term and long-term observation states based on the provided
new tick value and the current timestamp. It also updates the last recorded observation state.*


```solidity
function setObservationData(
    Observations storage self,
    int16 newTick,
    int56 currentCumulativeTick,
    uint32 currentTimestamp,
    uint8 currentMidTermIndex
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`newTick`|`int16`|The new tick value to be recorded.|
|`currentCumulativeTick`|`int56`|The current cumulative tick sum.|
|`currentTimestamp`|`uint32`|The current block timestamp.|
|`currentMidTermIndex`|`uint8`||


### calculateTickAverage

Computes the tick average based on the cumulative sum and duration.


```solidity
function calculateTickAverage(
    int56 currentCumulativeSum,
    int56 previousCumulativeSum,
    uint256 bufferLength
) private pure returns (int16 tick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentCumulativeSum`|`int56`|The current cumulative sum of mid-term/long-term values.|
|`previousCumulativeSum`|`int56`|The previous cumulative sum recorded for mid-term/long-term.|
|`bufferLength`|`uint256`|If the mid-term/long-term buffer is fully recorded, then the buffer length equals the duration passed between the first and last recorded ticks, else it's same as the mid-term/long-term buffer.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int16`|The computed tick average for mid-term/long-term.|


### getLongTermBufferFactor

*Gets the long-term buffer factor based on the available data in long-term array.*


```solidity
function getLongTermBufferFactor(
    Observations storage self,
    bool isLongTermBufferInitialized
) private view returns (uint256 factor);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct where stored oracle array containing the tick observations.|
|`isLongTermBufferInitialized`|`bool`|Boolean value which represents whether long-term buffer is filled or not.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`factor`|`uint256`|The amount of information we have in the long-term array.|


### boundTick

Factor, `F` is the amount of information we have in the long-term array.
It's represented by the last filled index count in the long-term array.

*The function ensures that `newTick` stays within the bounds
determined by `lastTick` and a dynamically calculated factor.*


```solidity
function boundTick(Observations storage self, int16 newTick) internal view returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to `Observations`, which holds historical tick data.|
|`newTick`|`int16`|The proposed new tick value to be adjusted within valid bounds.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|The adjusted tick value constrained within the allowable range.|


## Errors
### InvalidIntervalConfig

```solidity
error InvalidIntervalConfig();
```

## Structs
### Observations
Struct for storing observations related to the Geometric TWAP calculation.

*This struct holds various data points used in the Time-Weighted Average Price (TWAP)
calculation.*


```solidity
struct Observations {
    uint8 midTermIndex;
    uint8 longTermIndex;
    int16 lastTick;
    int16 lastLendingStateTick;
    uint24 midTermIntervalConfig;
    uint24 longTermIntervalConfig;
    uint24 longTermTimeElapsedCounter;
    int56 lendingCumulativeSum;
    uint32 lastTimestamp;
    uint32 lastLendingTimestamp;
    int56[MID_TERM_ARRAY_LENGTH] midTermCumulativeSum;
    int56[LONG_TERM_ARRAY_LENGTH] longTermCumulativeSum;
    uint32[MID_TERM_ARRAY_LENGTH] midTermTimeInterval;
    uint32[LONG_TERM_ARRAY_LENGTH] longTermTimeInterval;
}
```

