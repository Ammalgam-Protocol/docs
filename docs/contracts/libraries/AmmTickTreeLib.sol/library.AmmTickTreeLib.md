# AmmTickTreeLib
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/libraries/AmmTickTreeLib.sol)


## State Variables
### CTZ64_EMPTY_FIELD

```solidity
uint256 constant CTZ64_EMPTY_FIELD = 64;
```


## Functions
### addTick

*adds a new tick to the tree and updates the lowest bin*


```solidity
function addTick(TickTree storage self, uint256 tickId) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`TickTree`|pointer to this tree|
|`tickId`|`uint256`|id of tick to add; assume that self.ticks already contains this tick|


### removeTick

*remove tick from tree and updates the lowest bin*


```solidity
function removeTick(TickTree storage self, uint256 tickId) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`TickTree`|pointer to this tree|
|`tickId`|`uint256`|id of tick to remove|


### updateLevelsAndBest

*Check from lowest to highest level, unsetting bits if the Field is empty and setting the best branch based on best set bits*


```solidity
function updateLevelsAndBest(TickTree storage self, Bin bin, bool removingFromBestBin) private returns (bool done);
```

### setBestGivenRoot

*Set bestBranch and bestBin given root coordinates*


```solidity
function setBestGivenRoot(TickTree storage self, Local bestBranch, uint256 posOfFirstSetBitInRoot) private;
```

### setBestGivenLevel1

*Set bestBranch and bestBin given a level 1 coordinates*


```solidity
function setBestGivenLevel1(
    TickTree storage self,
    Local bestBranch,
    int256 level1Index,
    uint256 posOfFirstSetBitInLevel1
) private;
```

### setBestGivenLevel2

*Set bestBranch and bestBin given a level 2 coordinates*


```solidity
function setBestGivenLevel2(
    TickTree storage self,
    Local bestBranch,
    int256 level2Index,
    uint256 posOfFirstSetBitInLevel2
) private;
```

### setBestGivenLevel3

*Set bestBranch and bestBin given a level 3 coordinates*


```solidity
function setBestGivenLevel3(
    TickTree storage self,
    Local bestBranch,
    int256 level3Index,
    uint256 posOfFirstSetBitInLevel3
) private;
```

## Errors
### TickIdZero

```solidity
error TickIdZero();
```

### ThereCannotBeBetterThanBest

```solidity
error ThereCannotBeBetterThanBest();
```

## Structs
### AmmTick
A Tick on the invariant curve


```solidity
struct AmmTick {
    uint256 id;
    uint256 prevId;
    uint256 nextId;
    Bin bin;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`id`|`uint256`|own id, key of ticks mapping leading here ; could be int16|
|`prevId`|`uint256`|pointer to previous tick within bin ; 0 means no prev tick ; could be int16|
|`nextId`|`uint256`|pointer to next tick within bin ; 0 means no next tick ; could be int16|
|`bin`|`Bin`|saturationAmount on log scale, reversed (lower bin iff higher saturationAmount); MIN_BIN = -2**18 <= bin <= 2**18-1 = MAX_BIN|

### TickTree
*TickTree represents the mangrove tick tree in storage
generally, in TickTreeLib, index refers to the global index in storage and an absolute index crossing all nodes of the higher level, pos(ition) refers to the position relative to the higher level
each bit represents each child of a node, a set bit means at least 1 bin under this node is non-empty*


```solidity
struct TickTree {
    Local bestBranch;
    Bin bestBin;
    mapping(int256 => Field) level1s;
    mapping(int256 => Field) level2s;
    mapping(int256 => Field) level3s;
    mapping(int256 => Leaf) leafs;
    mapping(uint256 => AmmTick) ticks;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`bestBranch`|`Local`|all Fields from the root to the bestBin of the tree|
|`bestBin`|`Bin`|pointer to the current bin of lower bin (highest saturation)|
|`level1s`|`mapping(int256 => Field)`|storage of all 64 bit fields representing nodes on level 1|
|`level2s`|`mapping(int256 => Field)`|storage of all 64 bit fields representing nodes on level 2|
|`level3s`|`mapping(int256 => Field)`|storage of all 64 bit fields representing nodes on level 3|
|`leafs`|`mapping(int256 => Leaf)`|storage of all leafs at the bottom of the tree|
|`ticks`|`mapping(uint256 => AmmTick)`|storage of all ticks; could be int16 => AmmTick|

