# SaturationAndGeometricTWAPState
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/177484d49d90b45a40c5e8affa7fab5af8d23a1a/contracts/SaturationAndGeometricTWAPState.sol)

**Inherits:**
[ISaturationAndGeometricTWAPState](/home/runner/work/core-v1/core-v1/core-v1/docs/src/contracts/interfaces/ISaturationAndGeometricTWAPState.sol/interface.ISaturationAndGeometricTWAPState.md), Ownable


## State Variables
### midTermIntervalConfig

```solidity
uint24 public immutable midTermIntervalConfig
```


### longTermIntervalConfig

```solidity
uint24 public immutable longTermIntervalConfig
```


### satDataGivenPair

```solidity
mapping(address => Saturation.SaturationStruct) internal satDataGivenPair
```


### TWAPDataGivenPair

```solidity
mapping(address => GeometricTWAP.Observations) internal TWAPDataGivenPair
```


### maxNewPositionSaturationInMAG2

```solidity
mapping(address => mapping(address => uint256)) maxNewPositionSaturationInMAG2
```


### isPairInitialized

```solidity
mapping(address => bool) internal isPairInitialized
```


## Functions
### constructor


```solidity
constructor(
    uint24 _midTermIntervalConfig,
    uint24 _longTermIntervalConfig
) Ownable(msg.sender);
```

### isInitialized


```solidity
modifier isInitialized() ;
```

### _isInitialized


```solidity
function _isInitialized() internal view;
```

### init

initializes the sat and TWAP struct

initCheck can be removed once the tree structure is fixed


```solidity
function init(
    int16 firstTick
) external;
```

### setNewPositionSaturation


```solidity
function setNewPositionSaturation(
    address pair,
    uint256 maxDesiredSaturationMag2
) external;
```

### getNewPositionSaturation


```solidity
function getNewPositionSaturation(
    address pair,
    address account
) internal view returns (uint256 maxDesiredSaturationInMAG2);
```

### getTree


```solidity
function getTree(
    address pairAddress,
    bool netDebtX
) private view returns (Saturation.Tree storage);
```

### getLeafDetails


```solidity
function getLeafDetails(
    address pairAddress,
    bool netDebtX,
    uint256 leafIndex
)
    external
    view
    returns (
        Saturation.SaturationPair memory saturation,
        uint256 currentPenaltyInBorrowLSharesPerSatInQ72,
        uint16[] memory tranches
    );
```

### getTreeDetails


```solidity
function getTreeDetails(
    address pairAddress,
    bool netDebtX
) external view returns (uint16, uint128);
```

### getTrancheDetails


```solidity
function getTrancheDetails(
    address pairAddress,
    bool netDebtX,
    int16 tranche
) external view returns (uint16 leaf, Saturation.SaturationPair memory saturation);
```

### getAccount


```solidity
function getAccount(
    address pairAddress,
    bool netDebtX,
    address accountAddress
) external view returns (Saturation.Account memory);
```

### update

update the borrow position of an account and potentially check (and revert) if the resulting sat is too high

run accruePenalties before running this function


```solidity
function update(
    Validation.InputParams memory inputParams,
    address account
) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| contains the position and pair params, like account borrows/deposits, current price and active liquidity|
|`account`|`address`| for which is position is being updated|


### _update


```solidity
function _update(
    Validation.InputParams memory inputParams,
    address account
) internal isInitialized;
```

### accruePenalties

accrue penalties since last accrual based on all over saturated positions


```solidity
function accruePenalties(
    address account,
    uint256 externalLiquidity,
    uint256 duration,
    uint256 allAssetsDepositL,
    uint256 allAssetsBorrowL,
    uint256 allSharesBorrowL
) external isInitialized returns (uint112 penaltyInBorrowLShares, uint112 accountPenaltyInBorrowLShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`||
|`externalLiquidity`|`uint256`| Swap liquidity outside this pool|
|`duration`|`uint256`| since last accrual of penalties|
|`allAssetsDepositL`|`uint256`| allAsset[DEPOSIT_L]|
|`allAssetsBorrowL`|`uint256`| allAsset[BORROW_L]|
|`allSharesBorrowL`|`uint256`| allShares[BORROW_L]|


### calcSatChangeRatioBips

Calculate the ratio by which the saturation has changed for `account`.


```solidity
function calcSatChangeRatioBips(
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ72,
    uint256 liqSqrtPriceInYInQ72,
    address pairAddress,
    address account
) external view virtual isInitialized returns (uint256 ratioNetXBips, uint256 ratioNetYBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The params containing the position of `account`.|
|`liqSqrtPriceInXInQ72`|`uint256`|The liquidation price.|
|`liqSqrtPriceInYInQ72`|`uint256`||
|`pairAddress`|`address`|The address of the pair|
|`account`|`address`|The account for which we are calculating the saturation change ratio.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ratioNetXBips`|`uint256`|The ratio representing the change in netX saturation for account.|
|`ratioNetYBips`|`uint256`|The ratio representing the change in netY saturation for account.|


### getObservations


```solidity
function getObservations(
    address pairAddress
) external view returns (GeometricTWAP.Observations memory);
```

### configLongTermInterval

Configures the interval of long-term observations.

This function is used to set the long-term interval between observations for the long-term buffer.


```solidity
function configLongTermInterval(
    address pairAddress,
    uint24 _longTermIntervalConfig
) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pairAddress`|`address`|The address of the pair for which the long-term interval is being configured.|
|`_longTermIntervalConfig`|`uint24`|The desired duration for each long-term period. The size is set as a factor of the mid-term interval to ensure a sufficient buffer, requiring at least 16 * 12 = 192 seconds per period, resulting in a total of ~25 minutes (192 * 8 = 1536 seconds) for the long-term buffer.|


### recordObservation

Records a new observation tick value and updates the observation data.

This function is used to record new observation data for the contract. It ensures that
the provided tick value is stored appropriately in both mid-term and long-term
observations, updates interval counters, and handles tick cumulative values based
on the current interval configuration. Ensures that this function is called in
chronological order, with increasing timestamps. Returns in case the
provided block timestamp is less than or equal to the last recorded timestamp.


```solidity
function recordObservation(
    int16 newTick,
    uint32 timeElapsed
) external isInitialized returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newTick`|`int16`|The new tick value to be recorded, representing the most recent update of reserveXAssets and reserveYAssets.|
|`timeElapsed`|`uint32`|The time elapsed since the last observation.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool indicating whether the observation was recorded or not.|


### getTickRange

Gets the min and max range of tick values from the stored oracle observations.

This function calculates the minimum and maximum tick values among three observed ticks:
long-term tick, mid-term tick, and current tick.


```solidity
function getTickRange(
    address pair,
    int16 currentTick,
    bool includeLongTermTick
) external view virtual returns (int16, int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pair`|`address`|The address of the pair for which the tick range is being calculated.|
|`currentTick`|`int16`|The current (most recent) tick based on the current reserves.|
|`includeLongTermTick`|`bool`|Boolean value indicating whether to include the long-term tick in the range.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|minTick The minimum tick value among the three observed ticks.|
|`<none>`|`int16`|maxTick The maximum tick value among the three observed ticks.|


### _getTickRange


```solidity
function _getTickRange(
    address pair,
    int16 currentTick,
    bool includeLongTermTick
) internal view returns (int16, int16);
```

### getLendingStateTickAndCheckpoint

Gets the tick value representing the TWAP since the last
lending update and checkpoints the current lending cumulative sum
as `self.lendingCumulativeSum` and the current block timestamp as `self.lastLendingTimestamp`.

See `getLendingStateTick` for implementation details which was
separated to allow view access without any state updates.


```solidity
function getLendingStateTickAndCheckpoint(
    uint32 timeElapsedSinceUpdate,
    uint32 timeElapsedSinceLendingUpdate
) external isInitialized returns (int16 lendingStateTick, uint256 maxSatInWads);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`timeElapsedSinceUpdate`|`uint32`|The time elapsed since the last price update.|
|`timeElapsedSinceLendingUpdate`|`uint32`|The time elapsed since the last lending update.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`lendingStateTick`|`int16`|The tick value representing the TWAP since the last lending update.|
|`maxSatInWads`|`uint256`||


### getObservedMidTermTick

Retrieves the mid-term tick value based on the stored observations.


```solidity
function getObservedMidTermTick(
    bool isLongTermBufferInitialized
) external view returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`isLongTermBufferInitialized`|`bool`|Boolean value which represents whether long-term buffer is filled or not.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|midTermTick The mid-term tick value.|


### boundTick

The function ensures that `newTick` stays within the bounds
determined by `lastTick` and a dynamically calculated factor.


```solidity
function boundTick(
    int16 newTick
) external view returns (int16);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newTick`|`int16`|The proposed new tick value to be adjusted within valid bounds.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int16`|The adjusted tick value constrained within the allowable range.|


### getLendingStateTick

Gets the tick value representing the TWAP since the last lending update.


```solidity
function getLendingStateTick(
    int56 newTick,
    uint32 timeElapsedSinceUpdate,
    uint32 timeElapsedSinceLendingUpdate
) external view returns (int16 lendingStateTick, uint256 maxSatInWads);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newTick`|`int56`|The new tick value to be recorded, representing the most recent update of reserveXAssets and reserveYAssets.|
|`timeElapsedSinceUpdate`|`uint32`|The time elapsed since the last price update.|
|`timeElapsedSinceLendingUpdate`|`uint32`|The time elapsed since the last lending update.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`lendingStateTick`|`int16`|The tick value representing the TWAP since the last lending update.|
|`maxSatInWads`|`uint256`|The maximum saturation in WADs.|


### liquidationCheckHardPremiums


```solidity
function liquidationCheckHardPremiums(
    Validation.InputParams memory inputParams,
    address borrower,
    Liquidation.HardLiquidationParams memory hardLiquidationParams,
    uint256 actualRepaidLiquidityAssets
) external view returns (bool badDebt);
```

