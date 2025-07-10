# GeometricTWAP
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/82dff11576b9df76b675736dba889653cf737de9/contracts/libraries/GeometricTWAP.sol)


## State Variables
### MID_TERM_ARRAY_LENGTH

```solidity
uint256 internal constant MID_TERM_ARRAY_LENGTH = 51;
```


### LONG_TERM_ARRAY_LENGTH

```solidity
uint256 internal constant LONG_TERM_ARRAY_LENGTH = 9;
```


### LOG_BASE_OF_ROOT_TWO

```solidity
uint256 internal constant LOG_BASE_OF_ROOT_TWO = 178;
```


### MID_TERM_ARRAY_LAST_INDEX

```solidity
uint256 internal constant MID_TERM_ARRAY_LAST_INDEX = MID_TERM_ARRAY_LENGTH - 1;
```


### LONG_TERM_ARRAY_LAST_INDEX

```solidity
uint256 internal constant LONG_TERM_ARRAY_LAST_INDEX = LONG_TERM_ARRAY_LENGTH - 1;
```


### MINIMUM_LONG_TERM_INTERVAL_FACTOR
Minimum long-term interval factor is used to verify the long-term interval
is at least 14 times the mid-term interval. This ensures that the long term
interval is required to be at least 14 times the mid-term interval, this is
```math
\left \lceil \frac{2 * MID\_TERM\_ARRAY\_LAST\_INDEX}{LONG\_TERM\_ARRAY\_LAST\_INDEX} \right \rceil.
```


```solidity
uint256 internal constant MINIMUM_LONG_TERM_INTERVAL_FACTOR = 14;
```


## Functions
### initializeObservationStruct

Initializes the observation struct with the specified interval configurations.

*This function sets the initial values for the mid-term and long-term interval configurations.
This forces the time to to go through the long term is twice as long as it takes to go
through the mid-term interval.*


```solidity
function initializeObservationStruct(
    Observations storage self,
    uint24 midTermTimePerUpdate,
    uint24 longTermTimePerUpdate
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`midTermTimePerUpdate`|`uint24`|The time required to pass before the mid-term twap is updated.|
|`longTermTimePerUpdate`|`uint24`|The time required to pass before the long-term twap is updated.|


### addObservationAndSetLendingState


```solidity
function addObservationAndSetLendingState(Observations storage self, int16 firstTick) internal;
```

### configLongTermInterval

Configures the interval of long-term observations.

*This function is used to set the long-term interval between observations for the long-term buffer.*


```solidity
function configLongTermInterval(Observations storage self, uint24 longTermTimePerUpdate) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`longTermTimePerUpdate`|`uint24`|the time required to pass before the long term twap is update.|


### recordObservation

Records a new observation tick value and updates the observation data.

*This function is used to record new observation data for the contract. It ensures that
the provided tick value is stored appropriately in both mid-term and long-term
observations, updates interval counters, and handles tick cumulative values based
on the current interval configuration. Ensures that this function is called in
chronological order, with increasing timestamps. Returns in case the
provided block timestamp is less than or equal to the last recorded timestamp.*


```solidity
function recordObservation(
    Observations storage self,
    int16 newTick,
    uint32 timeElapsed
) internal returns (bool updated);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage structure containing observation data.|
|`newTick`|`int16`|The new tick value to be recorded, representing the most recent update of reserveXAssets and reserveYAssets.|
|`timeElapsed`|`uint32`|The time elapsed since the last observation.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`updated`|`bool`|A boolean indicating whether the observation was updated.|


### getTickRange

Gets the min and max range of tick values from the stored oracle observations.

*This function calculates the minimum and maximum tick values among three observed ticks:
long-term tick, mid-term tick, and current tick.*


```solidity
function getTickRange(Observations storage self, int16 currentTick) internal view returns (int16, int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct where stored oracle array containing the tick observations.|
|`currentTick`|`int16`|The current (most recent) tick based on the current reserves.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|minTick The minimum tick value among the three observed ticks.|
|`<none>`|`int16`|maxTick The maximum tick value among the three observed ticks.|


### getTickRangeWithoutLongTerm

Gets the min and max range of tick values from the stored oracle observations.

*This function calculates the minimum and maximum tick values among the mid-term tick and current tick.*


```solidity
function getTickRangeWithoutLongTerm(
    Observations storage self
) internal view returns (int16 minTick, int16 maxTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct where stored oracle array containing the tick observations.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minTick`|`int16`|The minimum tick value.|
|`maxTick`|`int16`|The maximum tick value.|


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


### getObservedMidTermTick

*Retrieves the mid-term tick value based on the stored observations.*


```solidity
function getObservedMidTermTick(
    Observations storage self,
    bool isLongTermBufferInitialized
) internal view returns (int16 midTermTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct.|
|`isLongTermBufferInitialized`|`bool`|Boolean value which represents whether long-term buffer is filled or not.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`midTermTick`|`int16`|The mid-term tick value.|


### getObservedLongTermTick

*Retrieves the long-term tick value based on the stored observations.*


```solidity
function getObservedLongTermTick(
    Observations storage self,
    bool isLongTermBufferInitialized
) private view returns (int16 longTermTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct.|
|`isLongTermBufferInitialized`|`bool`|Boolean value which represents whether long-term buffer is filled or not.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`longTermTick`|`int16`|The long-term tick value.|


### getTickRangeInternal


```solidity
function getTickRangeInternal(
    int16 longTermTick,
    int16 midTermTick,
    int16 blockTick,
    int16 currentTick,
    uint256 factor
) internal pure returns (int16 minTick, int16 maxTick);
```

### getMinAndMaxOfFour


```solidity
function getMinAndMaxOfFour(int16 a, int16 b, int16 c, int16 d) private pure returns (int16 min, int16 max);
```

### getMinAndMaxOfThree


```solidity
function getMinAndMaxOfThree(int16 a, int16 b, int16 c) private pure returns (int16 min, int16 max);
```

### getMidTermAtLastIndex


```solidity
function getMidTermAtLastIndex(Observations storage self, uint256 index) private view returns (int56);
```

### getLastIndex


```solidity
function getLastIndex(uint256 index, uint256 lastIndex) private pure returns (uint256);
```

### getNextIndex


```solidity
function getNextIndex(uint256 currentIndex, uint256 indexLength) private pure returns (uint8);
```

### getLendingStateTickAndCheckpoint

Gets the tick value representing the TWAP since the last
lending update and checkpoints the current lending cumulative sum
as `self.lendingCumulativeSum` and the current block timestamp as `self.lastLendingTimestamp`.

*See `getLendingStateTick` for implementation details which was
separated to allow view access without any state updates.*


```solidity
function getLendingStateTickAndCheckpoint(
    Observations storage self,
    uint32 timeElapsedSinceUpdate,
    uint32 timeElapsedSinceLendingUpdate
) internal returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|Observations storage struct|
|`timeElapsedSinceUpdate`|`uint32`|The time elapsed since the last price update.|
|`timeElapsedSinceLendingUpdate`|`uint32`|The time elapsed since the last lending update.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|lendingStateTick The tick value representing the TWAP since the last lending update.|


### getLendingStateTick

Gets the tick value representing the TWAP since the last lending update.


```solidity
function getLendingStateTick(
    Observations storage self,
    int56 newTick,
    uint32 timeElapsedSinceUpdate,
    uint32 timeElapsedSinceLendingUpdate,
    bool tickAvailable
) internal view returns (int16, int56);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|Observations storage struct|
|`newTick`|`int56`|The current tick value.|
|`timeElapsedSinceUpdate`|`uint32`|The time elapsed since the last price update.|
|`timeElapsedSinceLendingUpdate`|`uint32`|The time elapsed since the last lending update.|
|`tickAvailable`|`bool`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|lendingStateTick The tick value representing the TWAP since the last lending update.|
|`<none>`|`int56`|currentCumulativeSum The current cumulative sum for the last updated timestamp.|


### calculateLendingStateTick

Computes the lending state tick based on the cumulative sum and duration.

*If no time has passed since the last lending timestamp, it returns the last lending state tick.*


```solidity
function calculateLendingStateTick(
    int56 cumulativeSum,
    int56 previousCumulativeSum,
    uint32 timeElapsedSinceLendingUpdate
) private pure returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cumulativeSum`|`int56`|The current cumulative sum of mid-term values.|
|`previousCumulativeSum`|`int56`|The previous cumulative sum recorded for lending.|
|`timeElapsedSinceLendingUpdate`|`uint32`|time elapsed since the last lending state update.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|lendingStateTick The computed or fallback lending state tick.|


### setLendingState


```solidity
function setLendingState(Observations storage self, int16 lendingStateTick, int56 currentCumulativeSum) private;
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
    uint256 currentMidTermIndex,
    bool firstUpdate
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`newTick`|`int16`|The new tick value to be recorded.|
|`currentCumulativeTick`|`int56`|The current cumulative tick sum.|
|`currentMidTermIndex`|`uint256`||
|`firstUpdate`|`bool`||


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

Adjusts the new tick value to ensure it stays within valid bounds. When we have less data, the outlier
factor is greater to allow for more flexibility to find the true price.

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


### getCurrentTimestamp

*Returns the current block timestamp casted to uint32.*


```solidity
function getCurrentTimestamp() internal view returns (uint32);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The current block timestamp as a uint32 value.|


## Events
### UpdateLendingTick
*Emitted when `lendingStateTick` is updated*


```solidity
event UpdateLendingTick(int16 lendingStateTick);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lendingStateTick`|`int16`|The updated value for lending state tick|

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
    bool isMidTermBufferInitialized;
    bool isLongTermBufferInitialized;
    uint8 midTermIndex;
    uint8 longTermIndex;
    int16 lastTick;
    int16 lastLendingStateTick;
    uint24 midTermIntervalConfig;
    uint24 longTermIntervalConfig;
    int56 lendingCumulativeSum;
    int56[MID_TERM_ARRAY_LENGTH] midTermCumulativeSum;
    int56[LONG_TERM_ARRAY_LENGTH] longTermCumulativeSum;
    uint32[MID_TERM_ARRAY_LENGTH] midTermTimeInterval;
    uint32[LONG_TERM_ARRAY_LENGTH] longTermTimeInterval;
}
```

