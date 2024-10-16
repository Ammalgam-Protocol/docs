# GeometricBWAP
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/GeometricBWAP.sol)


## State Variables
### MID_TERM_ARRAY_LENGTH

```solidity
uint8 public constant MID_TERM_ARRAY_LENGTH = 65;
```


### LONG_TERM_ARRAY_LENGTH

```solidity
uint8 public constant LONG_TERM_ARRAY_LENGTH = 9;
```


### LONG_TERM_BUFFER_FACTOR
*`LONG_TERM_BUFFER_FACTOR` is a factor to ensure the size of the long-term buffer is at-least double
the size of the mid-term buffer.
(MID_TERM_ARRAY_LENGTH / LONG_TERM_ARRAY_LENGTH) * 2;
65 / 9 = 7.22 --> round up to 8 * 2 = 16*


```solidity
uint8 public constant LONG_TERM_BUFFER_FACTOR = 16;
```


### LONG_TERM_TICK_NOT_AVAILABLE

```solidity
int56 public constant LONG_TERM_TICK_NOT_AVAILABLE = type(int56).min;
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
### initializeObservationStruct


```solidity
function initializeObservationStruct(
    Observations storage self,
    uint24 midTermIntervalConfig,
    uint24 longTermIntervalConfigFactor,
    int24 firstTick
) internal;
```

### configLongTermInterval

Configures the size of long-term block observations.

*This function is used to set the long-term block observations for the long term buffer.
It ensures that the provided `longTermIntervalSize` value is greater than 64.*


```solidity
function configLongTermInterval(Observations storage self, uint24 longTermIntervalConfigFactor) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the Observations struct.|
|`longTermIntervalConfigFactor`|`uint24`|The desired number of blocks for each long-term period. The size is set as a factor of the mid-term interval to ensure a sufficient buffer, requiring at least 16 blocks per period, resulting in a total of 128 blocks (16 * 8) for the long-term buffer.|


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
function getTickRange(Observations storage self) internal view returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct where stored oracle array containing the tick observations.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|minTick The minimum tick value among the three observed ticks.|
|`<none>`|`int24`|maxTick The maximum tick value among the three observed ticks.|


### getObservedTicks

Factor, `F` is the amount of information we have in the long-term array.
It's represented by the last filled index count in the long-term array.

*Retrieves the long-term, mid-term, and current tick values based on the stored observations.*


```solidity
function getObservedTicks(
    Observations storage self,
    bool isLongTermBufferInitialized
) internal view returns (int24, int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The observation struct.|
|`isLongTermBufferInitialized`|`bool`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The long-term, mid-term, and last tick values.|
|`<none>`|`int24`||
|`<none>`|`int24`||


### getTickRangeInternal


```solidity
function getTickRangeInternal(
    int24 longTermTick,
    int24 midTermTick,
    int24 currentTick,
    uint24 factor
) internal pure returns (int24 minTick, int24 maxTick);
```

### getMidTermAtLastIndex


```solidity
function getMidTermAtLastIndex(Observations storage self, uint8 index) private view returns (int56);
```

### getLastIndex


```solidity
function getLastIndex(uint8 index, uint8 lastIndex) private pure returns (uint8);
```

### getNextIndex


```solidity
function getNextIndex(uint8 currentIndex, uint8 indexLength) private pure returns (uint8);
```

### setRecordedObservation


```solidity
function setRecordedObservation(
    Observations storage self,
    int24 newTick,
    uint24 blockInterval,
    int24 missedBlocks
) private;
```

### getLendingStateTickAndCheckpoint

Gets the tick value representing the BWAPrice since the last
lending update and checkpoints the current lending cumulative sum
as `self.lendingCumulativeSum` and the current block as `self.lastLendingBlock`.

*See getLendingStateTick for implementation details which was
separated to allow view access without any state updates.*


```solidity
function getLendingStateTickAndCheckpoint(Observations storage self) internal returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|Observations storage struct|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|lendingStateTick The tick value representing the BWAPrice since the last lending update.|


### getLendingStateTick

Gets the tick value representing the BWAPrice since the last lending update.


```solidity
function getLendingStateTick(Observations storage self) internal view returns (int24, int56, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|Observations storage struct|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|lendingStateTick The tick value representing the BWAPrice since the last lending update.|
|`<none>`|`int56`|currentCumulativeSum The current cumulative sum for the last updated block.|
|`<none>`|`uint256`|thisBlock The current block number to save on gas costs for the caller.|


### calculateLendingStateTick

Computes the lending state tick based on the cumulative sum and block interval.

*If no blocks have passed since the last lending block, it returns the last lending state tick.*


```solidity
function calculateLendingStateTick(
    int24 lastLendingStateTick,
    int56 cumulativeSum,
    int56 previousCumulativeSum,
    uint256 lastLendingBlock,
    uint256 thisBlock
) private pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lastLendingStateTick`|`int24`|The last recorded lending state tick.|
|`cumulativeSum`|`int56`|The current cumulative sum of mid-term values.|
|`previousCumulativeSum`|`int56`|The previous cumulative sum recorded for lending.|
|`lastLendingBlock`|`uint256`|The block number when the last lending state was updated.|
|`thisBlock`|`uint256`|The current block number.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|lendingStateTick The computed or fallback lending state tick.|


### getLendingStateTick

Computes the lending state tick using the current block interval and cumulative sums.

*If the block interval is zero, it returns either the new tick or the last lending state tick.*


```solidity
function getLendingStateTick(Observations storage self, int24 newTick) internal view returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the observations struct.|
|`newTick`|`int24`|The current tick value to calculate the latest mid term cumulative sum.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|lendingStateTick The computed lending state tick.|


### computeMidTermCumulativeSum

Helper function to compute the mid-term cumulative sum based on missed blocks and the current tick.

*Adds missed blocks and new block intervals to the cumulative tick sum.*


```solidity
function computeMidTermCumulativeSum(
    Observations storage self,
    int24 newTick,
    uint24 blockInterval,
    int24 missedBlocks
) private view returns (int56);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Observations`|The storage reference to the observations struct.|
|`newTick`|`int24`|The current tick value to calculate the latest mid term cumulative sum.|
|`blockInterval`|`uint24`|The interval of blocks to consider for the new tick.|
|`missedBlocks`|`int24`|The number of missed blocks to account for in the cumulative sum.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int56`|currentCumulativeTick The updated cumulative tick sum.|


## Errors
### InvalidIntervalConfig

```solidity
error InvalidIntervalConfig();
```

### AmmalgamBlockNumberValidationFailed

```solidity
error AmmalgamBlockNumberValidationFailed();
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
    uint24 midTermIntervalConfig;
    uint24 longTermIntervalConfig;
    uint24 longTermActiveBlockCounter;
    uint24[MID_TERM_ARRAY_LENGTH] midTermObservationInterval;
    uint24[LONG_TERM_ARRAY_LENGTH] longTermObservationInterval;
    int56[MID_TERM_ARRAY_LENGTH] midTerm;
    int56[LONG_TERM_ARRAY_LENGTH] longTerm;
    int56 lendingCumulativeSum;
    uint256 lastLendingBlock;
    uint256 lastBlock;
    int24 lastLendingStateTick;
}
```

