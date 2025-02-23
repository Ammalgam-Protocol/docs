# Saturation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/libraries/Saturation.sol)

**Author:**
imi@1m1.io

Saturation (=sat) is defined as the net borrow. In theory, we would want to divide net borrow by the total liquidity; in practice, we keep the net borrow only in the tree. The unit of sat if LAssets.
Keeps the sat in a tree, starting with a root, levels and leafs. We keep 2 trees, one for net X borrows, another for net Y borrows.
The price is always the price of Y in units of X. Mostly, the code works with the sqrt of price.
A net X borrow refers to a position that if liquidated would cause the price to become smaller; the opposite for net Y positions.
Ticks are along the price dimension and int16. Tranches are combine $ 2^3 $ ticks, stored as int16.
Leafs (uint16) split the sat, which is uint112, into $ 2^{12} $ intervals. From left to right, the leafs of the tree cover the sat space in increasing order.
Each account with a position has a price at which its LTV would reach LTVMAX, which is its liquidation (=liq) price.
The liq price belongs to a tranche. A Tranche contains multiple accounts and thus a total sat. The tranches' sat assigns it to a leaf.
Each leaf can contain multiple tranches and thus has a total actual sat whilst representing a specific sat per tranche range.
Leafs and thus tranches and thus accounts above a certain sat threshold are considered over saturated. These accounts are penalized for being over saturated.
Each account, tranche and leaf has a total penalty that needs to be repayed to flatten the position fully.
Sat is distributed over multiple tranches, in case a single tranche does not have enough available sat left.
Sat is kept cumulatively in the tree, meaning a node contains the sum of the sat of its parents. Updating a sat at the bottom of the tree requires updating all parents.
Penalty is kept as a path sum, in uints of LAssets, meaning the penalty of an account is the sum of the penalties of all its parents. Updating the penalty for a range of leafs only requires updating the appropriate parent.
Position (=pos) refers to the relative index of a child within its parent. Index refers to the index of a node in within its level


## State Variables
### SATURATION_TIME_BUFFER_IN_MAG2

```solidity
uint256 internal constant SATURATION_TIME_BUFFER_IN_MAG2 = 0x6e;
```


### MAX_HEALTHY_SATURATION_RATIO_IN_MAG2

```solidity
uint256 internal constant MAX_HEALTHY_SATURATION_RATIO_IN_MAG2 = 0x50;
```


### START_SATURATION_PENALTY_RATIO_IN_MAG2

```solidity
uint256 internal constant START_SATURATION_PENALTY_RATIO_IN_MAG2 = 0x46;
```


### PENALTY_FACTOR_IN_MAG2

```solidity
uint256 private constant PENALTY_FACTOR_IN_MAG2 = 0xa;
```


### MAX_SATURATION_DISTRIBUTION_TRANCHES

```solidity
uint256 internal constant MAX_SATURATION_DISTRIBUTION_TRANCHES = 0x3;
```


### AMMALGAMPAIR_MINIMUM_LIQUIDITY

```solidity
uint256 internal constant AMMALGAMPAIR_MINIMUM_LIQUIDITY = 0x3e8;
```


### SAT_TO_LEAF_MIN_IN_Q128

```solidity
uint256 private constant SAT_TO_LEAF_MIN_IN_Q128 = 0x3e272007bf43f051cf6f4632ccfc54317b;
```


### SAT_TO_LEAF_MAX_IN_Q128

```solidity
uint256 private constant SAT_TO_LEAF_MAX_IN_Q128 = 0xfe93f7ee948afecf9909a051669b4878e0846dd2ce13c096be6a7890625;
```


### SAT_TO_LEAF_BASE_CHANGE_IN_Q128

```solidity
uint256 private constant SAT_TO_LEAF_BASE_CHANGE_IN_Q128 = 0x1cfc0000000000000000000000000000;
```


### SAT_TO_LEAF_SHIFT

```solidity
uint256 private constant SAT_TO_LEAF_SHIFT = 0xef;
```


### INT_ONE

```solidity
int256 private constant INT_ONE = 1;
```


### LEVELS_WITHOUT_LEAFS

```solidity
uint256 internal constant LEVELS_WITHOUT_LEAFS = 0x3;
```


### LOWEST_LEVEL_INDEX

```solidity
uint256 internal constant LOWEST_LEVEL_INDEX = 0x2;
```


### LEAFS_IN_BITS

```solidity
uint256 private constant LEAFS_IN_BITS = 0xc;
```


### LEAFS

```solidity
uint256 internal constant LEAFS = 0x1000;
```


### CHILDREN_PER_NODE_IN_BITS

```solidity
uint256 private constant CHILDREN_PER_NODE_IN_BITS = 0x4;
```


### CHILDREN_PER_NODE

```solidity
uint256 internal constant CHILDREN_PER_NODE = 0x10;
```


### TICKS_PER_TRANCHE

```solidity
int256 private constant TICKS_PER_TRANCHE = 0x64;
```


### TWO_DIV_ONE_MINUS_ONE_OVER_BASE_TRANCHE_OVER_IN_Q128

```solidity
uint256 constant TWO_DIV_ONE_MINUS_ONE_OVER_BASE_TRANCHE_OVER_IN_Q128 = 0xb4337207340fdfaf6710a40d6e575cd9c;
```


### MIN_TRANCHE

```solidity
int256 internal constant MIN_TRANCHE = -0xc7;
```


### MAX_TRANCHE

```solidity
int256 internal constant MAX_TRANCHE = 0xc6;
```


### TOTAL_BITS

```solidity
uint256 private constant TOTAL_BITS = 0x100;
```


### FIELD_BITS

```solidity
uint256 private constant FIELD_BITS = 0x10;
```


### SAT_BITS

```solidity
uint256 private constant SAT_BITS = 0x70;
```


### TRANCHE_COUNT_BITS

```solidity
uint256 private constant TRANCHE_COUNT_BITS = 0x10;
```


### EMPTY_BITS

```solidity
uint256 private constant EMPTY_BITS = 0x70;
```


### FIELD_NODE_MASK

```solidity
uint256 private constant FIELD_NODE_MASK = 0xffff;
```


### SAT_NODE_MASK

```solidity
uint256 private constant SAT_NODE_MASK = 0xffffffffffffffffffffffffffff0000;
```


### TRANCHE_COUNT_NODE_MASK

```solidity
uint256 private constant TRANCHE_COUNT_NODE_MASK = 0xffff00000000000000000000000000000000;
```


## Functions
### initTree

initializes the satStruct, allocating storage for all nodes

*initCheck can be removed once the tree structure is fixed*


```solidity
function initTree(
    SaturationStruct storage satStruct
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`|contains the entire sat data|


### update

update the borrow position of an account and potentially check (and revert) if the resulting sat is too high


```solidity
function update(
    SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    address account
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`inputParams`|`Validation.InputParams`| contains the position and pair params, like account borrows/deposits, current price and active liquidity|
|`account`|`address`| for which is position is being updated|


### accruePenalties

accrue penalties since last accrual based on all over saturated positions


```solidity
function accruePenalties(
    SaturationStruct storage satStruct,
    uint256 activeLiquidityInLAssets,
    uint256 duration,
    uint256 maxUtilizationInWad
) external returns (uint256 penaltyInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`activeLiquidityInLAssets`|`uint256`| of the pair|
|`duration`|`uint256`| since last accrual of penalties|
|`maxUtilizationInWad`|`uint256`| is the max of the L, X, Y borrow vs deposit utilizations|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInLAssets`|`uint256`| the amount to be added to the liquidity assets to benefit the liquidity providers from the penalty available|


### calcPenaltyForRepay

calc and decrease the penalty that an account owes to repay for its borrow position

*function is called with `0<repayAmountLInLAssets && repayAmountXInXAssets==repayAmountYInYAssets==0` xor `0==repayAmountLInLAssets && (0<repayAmountXInXAssets || 0<repayAmountYInYAssets)`*


```solidity
function calcPenaltyForRepay(
    SaturationStruct storage satStruct,
    address account,
    uint256 currentSqrtPriceInXInQ128,
    uint256 repayAmountLInLAssets,
    uint256 repayAmountXInXAssets,
    uint256 repayAmountYInYAssets
)
    external
    returns (
        uint256 overSaturationPenaltyRemovedLInLAssets,
        uint256 overSaturationPenaltyRemovedXInXAssets,
        uint256 overSaturationPenaltyRemovedYInYAssets
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`account`|`address`| whos position is being considered|
|`currentSqrtPriceInXInQ128`|`uint256`| of the pair|
|`repayAmountLInLAssets`|`uint256`|being repayed on behalf of the account|
|`repayAmountXInXAssets`|`uint256`|being repayed on behalf of the account|
|`repayAmountYInYAssets`|`uint256`|being repayed on behalf of the account|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`overSaturationPenaltyRemovedLInLAssets`|`uint256`| over sat penalty decreased for the account, upto repaid amount|
|`overSaturationPenaltyRemovedXInXAssets`|`uint256`| over sat penalty decreased for the account, upto repaid amount|
|`overSaturationPenaltyRemovedYInYAssets`|`uint256`| over sat penalty decreased for the account, upto repaid amount|


### updatePenaltyForRepayXYGivenTree




```solidity
function updatePenaltyForRepayXYGivenTree(
    Tree storage tree,
    address account,
    uint256 currentSqrtPriceInXInQ128,
    uint256 repayAmountInAssets
) internal returns (uint256 overSaturationPenaltyRemovedInAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|to be considered|
|`account`|`address`| whos position is being considered|
|`currentSqrtPriceInXInQ128`|`uint256`| of the pair|
|`repayAmountInAssets`|`uint256`|being repayed on behalf of the account|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`overSaturationPenaltyRemovedInAssets`|`uint256`| over sat penalty decreased for the account, upto repaid amount|


### initTree

init the nodes of the tree


```solidity
function initTree(
    Tree storage tree
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|


### check

check and revert in case the highest sat is too high


```solidity
function check(uint256 activeLiquidityInLAssets, uint256 highestSetLeaf) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`activeLiquidityInLAssets`|`uint256`| of the pair|
|`highestSetLeaf`|`uint256`| highest leaf with a tranche|


### updateTreeGivenAccountAndInputParams

internal update function given a tree, an account, its params and liq price


```solidity
function updateTreeGivenAccountAndInputParams(
    Tree storage tree,
    Validation.InputParams memory inputParams,
    address account,
    uint256 liqSqrtPriceInXInQ128
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`inputParams`|`Validation.InputParams`| contains the position and pair params, like account borrows/deposits, current price and active liquidity|
|`account`|`address`| whos position is being considered|
|`liqSqrtPriceInXInQ128`|`uint256`| price at which the positions' LTV would reach LTVMAX|


### updateTreeGivenAccountTrancheAndSat

internal update that removes the account from the tree (if it exists) from its prev position and adds it to its new position


```solidity
function updateTreeGivenAccountTrancheAndSat(
    Tree storage tree,
    address account,
    int256 newTranche,
    uint256 newSatInLAssets,
    uint256 activeLiquidityInLAssets
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`| whos position is being considered|
|`newTranche`|`int256`|the new tranche of the account|
|`newSatInLAssets`|`uint256`| the new sat of the account, in units of LAssets|
|`activeLiquidityInLAssets`|`uint256`| of the pair|


### removeSatFromTranche

remove sat from tree, for each tranche in a loop that could hold sat for the account


```solidity
function removeSatFromTranche(
    Tree storage tree,
    uint112[MAX_SATURATION_DISTRIBUTION_TRANCHES] memory accountToSatPerTranche,
    uint256[MAX_SATURATION_DISTRIBUTION_TRANCHES] memory accountTreePenaltyAtOnsetInLAssetsPerSatInQ128PerTranche,
    address account,
    int256 trancheDirection
) internal returns (bool highestSetLeafRemoved);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`accountToSatPerTranche`|`uint112[MAX_SATURATION_DISTRIBUTION_TRANCHES]`| array holding the sat per tranche given the account|
|`accountTreePenaltyAtOnsetInLAssetsPerSatInQ128PerTranche`|`uint256[MAX_SATURATION_DISTRIBUTION_TRANCHES]`||
|`account`|`address`| whos position is being considered|
|`trancheDirection`|`int256`| direction of sat distribution depending on netX/netY|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`highestSetLeafRemoved`|`bool`| flag indicating whether we removed sat from the highest leaf xor not|


### removeSatFromTrancheStateUpdates

depending on old and new leaf of the tranche, update the sats, fields and penalties of the tree


```solidity
function removeSatFromTrancheStateUpdates(
    Tree storage tree,
    int256 tranche,
    uint256 oldLeaf,
    uint256 oldTrancheSatInLAssets,
    uint256 oldAccountSatInTrancheInLAssets,
    address account,
    uint256 oldAccountTreePenaltyAtOnsetInLAssetsPerSatInQ128
) internal returns (uint256 newLeafPenaltyAtOnsetInLAssetsPerSatInQ128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`tranche`|`int256`| under consideration|
|`oldLeaf`|`uint256`||
|`oldTrancheSatInLAssets`|`uint256`| tranche sat|
|`oldAccountSatInTrancheInLAssets`|`uint256`| account sat|
|`account`|`address`| whos position is being considered|
|`oldAccountTreePenaltyAtOnsetInLAssetsPerSatInQ128`|`uint256`| penalty offset at the old leaf|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newLeafPenaltyAtOnsetInLAssetsPerSatInQ128`|`uint256`|the new offset penalty to be stored|


### addSatToTranche

add sat to tree, for each tranche in a loop as needed. we add to each tranche as much as it can bear.


```solidity
function addSatToTranche(
    Tree storage tree,
    uint112[MAX_SATURATION_DISTRIBUTION_TRANCHES] memory accountToSatPerTranche,
    uint256[MAX_SATURATION_DISTRIBUTION_TRANCHES] memory accountTreePenaltyAtOnsetInLAssetsPerSatInQ128PerTranche,
    address account,
    int256 trancheDirection,
    int256 newTranche,
    uint256 newSatInLAssets,
    uint256 activeLiquidityInLAssets
) internal returns (bool highestSetLeafAdded);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`accountToSatPerTranche`|`uint112[MAX_SATURATION_DISTRIBUTION_TRANCHES]`| array holding the sat per tranche given the account, set at the end of this function|
|`accountTreePenaltyAtOnsetInLAssetsPerSatInQ128PerTranche`|`uint256[MAX_SATURATION_DISTRIBUTION_TRANCHES]`||
|`account`|`address`| whos position is being considered|
|`trancheDirection`|`int256`| direction of sat distribution depending on netX/netY|
|`newTranche`|`int256`|the new tranche of the account|
|`newSatInLAssets`|`uint256`| the new sat of the account, in units of LAssets|
|`activeLiquidityInLAssets`|`uint256`| of the pair|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`highestSetLeafAdded`|`bool`| flag indicating whether we removed sat from the highest leaf xor not|


### getAddSatToTrancheStateUpdatesParams

convenience struct holding the params needed to run `addSatToTrancheStateUpdates`


```solidity
function getAddSatToTrancheStateUpdatesParams(
    Tree storage tree,
    int256 tranche,
    uint256 newSatInLAssets,
    uint256 activeLiquidityInLAssets,
    address account
) internal view returns (AddSatToTrancheStateUpdatesStruct memory addSatToTrancheStateUpdatesParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`tranche`|`int256`| under consideration|
|`newSatInLAssets`|`uint256`| in units of LAssets|
|`activeLiquidityInLAssets`|`uint256`| of the pair|
|`account`|`address`| whos position is being considered|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`addSatToTrancheStateUpdatesParams`|`AddSatToTrancheStateUpdatesStruct`| the struct with required params to|


### addSatToTrancheStateUpdates

depending on old and new leaf of the tranche, update the sats, fields and penalties of the tree


```solidity
function addSatToTrancheStateUpdates(Tree storage tree, AddSatToTrancheStateUpdatesStruct memory params) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`params`|`AddSatToTrancheStateUpdatesStruct`| convenience struct holding params needed for these updates|


### removeTrancheToLeaf

removing a tranche from a leaf, update the fields and sats up the tree


```solidity
function removeTrancheToLeaf(Tree storage tree, int256 tranche, uint256 trancheSatInLAssets, uint256 leaf) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`tranche`|`int256`| that is being moved|
|`trancheSatInLAssets`|`uint256`| sat of tranche being moved|
|`leaf`|`uint256`| the leaf|


### addTrancheToLeaf

adding a tranche from a leaf, update the fields and sats up the tree


```solidity
function addTrancheToLeaf(Tree storage tree, int256 tranche, uint256 trancheSatInLAssets, uint256 leaf) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`tranche`|`int256`| that is being moved|
|`trancheSatInLAssets`|`uint256`| sat of tranche being moved|
|`leaf`|`uint256`| the leaf|


### addSatUpTheTree

recursively add sat up the tree


```solidity
function addSatUpTheTree(Tree storage tree, uint256 level, uint256 nodeIndex, int256 satInLAssets) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`level`|`uint256`| level being updated|
|`nodeIndex`|`uint256`| index is the position (0 based) of the node in its level|
|`satInLAssets`|`int256`| sat to add to the current node, usually uint112, int to allow subtracting sat up the tree|


### accruePenaltiesGivenTree

internal function to calc and add penalty for all over saturation positions


```solidity
function accruePenaltiesGivenTree(
    Tree storage tree,
    uint256 thresholdLeaf,
    uint256 duration,
    uint256 maxUtilizationInWad
) internal returns (uint256 penaltyInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`| where penalties begin|
|`duration`|`uint256`| in seconds since last update|
|`maxUtilizationInWad`|`uint256`| is the max of the L, X, Y borrow vs deposit utilizations|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInLAssets`|`uint256`| the amount to be added to the liquidity assets to benefit the liquidity providers from the penalty available|


### updatePenalties

update penalties in the tree given


```solidity
function updatePenalties(Tree storage tree, uint256 thresholdLeaf, uint256 addPenaltyInLAssetsPerSatInQ128) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`| from which leaf on the penalty needs to be added inclusive|
|`addPenaltyInLAssetsPerSatInQ128`|`uint256`| the penalty to be added|


### updatePenaltiesDownTheTree

update penalties in the tree given recursively downwards, always with perfect cover
if a node exactly covers our threshold, we only update that node and all right siblings. the node that is over covering our threshold is used as the parent for the recursion to get the coverage exactly


```solidity
function updatePenaltiesDownTheTree(
    Tree storage tree,
    uint256 thresholdLeaf,
    uint256 addPenaltyInLAssetsPerSatInQ128,
    uint256 level,
    uint256 nodeIndex,
    uint256 totalNodesAtLevel
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`| from which leaf on the penalty needs to be added inclusive|
|`addPenaltyInLAssetsPerSatInQ128`|`uint256`| the penalty to be added|
|`level`|`uint256`||
|`nodeIndex`|`uint256`||
|`totalNodesAtLevel`|`uint256`||


### calcPenaltyPerSatFromLeafToRoot

recursive function to sum penalties from leaf to root


```solidity
function calcPenaltyPerSatFromLeafToRoot(
    Tree storage tree,
    uint256 level,
    uint256 nodeIndex,
    uint256 leaf
) internal view returns (uint256 penaltyInLAssetsPerSatInQ128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`level`|`uint256`| level being read|
|`nodeIndex`|`uint256`| index is the position (0 based) of the node in its level|
|`leaf`|`uint256`| index (0 based) of the leaf|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInLAssetsPerSatInQ128`|`uint256`| total penalty at the leaf, non-negative but returned as an int for recursion|


### accrueAccountPenalty

calc penalty owed by account for repay, total over all the tranches that might contain this accounts' sat


```solidity
function accrueAccountPenalty(Tree storage tree, address account) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`| whos position is being considered|


### calcTotalSatAfterLeafInclusive

calc total sat of all accounts/tranches/leafs higher (and same) as the threshold


```solidity
function calcTotalSatAfterLeafInclusive(
    Tree storage tree,
    uint256 thresholdLeaf
) internal view returns (uint256 satInLAssets, uint256 trancheCount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`|leaf to start adding sat from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satInLAssets`|`uint256`|total sat of all accounts with tranche in a leaf from at least `thresholdLeaf`|
|`trancheCount`|`uint256`||


### satToLeaf

convert sat to leaf


```solidity
function satToLeaf(
    uint256 satLAssets
) internal pure returns (uint256 leaf);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satLAssets`|`uint256`|sat to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leaf`|`uint256`| resulting leaf from 0 to 2**12-1|


### calcMaxSatInTranche

calc max sat in a tranche such that a liq swap does not cross an entire tranches worth


```solidity
function calcMaxSatInTranche(
    uint256 activeLiquidityInLAssets
) internal pure returns (uint256 maxSatInTranche);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`activeLiquidityInLAssets`|`uint256`| in the pair|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxSatInTranche`|`uint256`| in LAssets|


### calcSatAvailableToAddToTranche

calc how much sat can be added to a tranche such that it is healthy


```solidity
function calcSatAvailableToAddToTranche(
    uint256 activeLiquidityInLAssets,
    uint256 targetSatToAddInLAssets,
    uint256 currentTrancheSatInLAssets
) internal pure returns (uint256 satAvailableToAddInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`activeLiquidityInLAssets`|`uint256`| of the pair|
|`targetSatToAddInLAssets`|`uint256`| the sat that we want to add|
|`currentTrancheSatInLAssets`|`uint256`| the sat that the tranche already hols|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satAvailableToAddInLAssets`|`uint256`| considering the `currentTrancheSatInLAssets` and the max a tranche can have|


### calcSat

calc sat given position using LTV calc from Validation


```solidity
function calcSat(
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ128
) internal pure returns (uint256 satInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| position|
|`liqSqrtPriceInXInQ128`|`uint256`| liq price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satInLAssets`|`uint256`| sat|


### convertLToXXorY


```solidity
function convertLToXXorY(
    Tree storage tree,
    uint256 currentSqrtPriceInXInQ128,
    uint256 amountInLAssets,
    Math.Rounding rounding
) private view returns (uint256);
```

### convertXorYToL


```solidity
function convertXorYToL(
    Tree storage tree,
    uint256 currentSqrtPriceInXInQ128,
    uint256 amountInAssets,
    Math.Rounding rounding
) private view returns (uint256);
```

### setXorUnsetFieldBitUpTheTree

recursive function to unset the field when removing a tranche from a leaf


```solidity
function setXorUnsetFieldBitUpTheTree(
    Tree storage tree,
    uint256 level,
    uint256 nodeIndex,
    uint256 lowerNodePos,
    uint256 set
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`level`|`uint256`| level being updated|
|`nodeIndex`|`uint256`| index is the position (0 based) of the node in its level|
|`lowerNodePos`|`uint256`| pos is the relative position (0 bsaed) of the node in its parent|
|`set`|`uint256`| 1 for set, 0 for unset|


### getLeftEdgeThatCoversLeaf

calc level (and nodes at that level) that covers a threshold node from the left


```solidity
function getLeftEdgeThatCoversLeaf(
    uint256 thresholdLeaf
) internal pure returns (uint256 level, uint256 totalNodesAtLevel);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`thresholdLeaf`|`uint256`|threshold to cover inclusively|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`level`|`uint256`| level at which the left most node would cover the `thresholdLeaf`|
|`totalNodesAtLevel`|`uint256`| total nodes at our level|


### findHighestSetLeafUpwards

recursive function to find the highest set leaf starting from a leaf, first upwards, until a set field is found, then downwards to find the best set leaf


```solidity
function findHighestSetLeafUpwards(
    Tree storage tree,
    uint256 level,
    uint256 nodeIndex
) private view returns (uint256 highestSetLeaf);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`level`|`uint256`| that we are checking|
|`nodeIndex`|`uint256`| corresponding to our leaf at our `level`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`highestSetLeaf`|`uint256`|highest leaf that is set in the tree|


### findHighestSetLeafDownwards

recursive function to find the highest set leaf starting from a node, downwards

*internal for testing only*


```solidity
function findHighestSetLeafDownwards(
    Tree storage tree,
    uint256 level,
    uint256 nodeIndex
) internal view returns (uint256 leaf);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`level`|`uint256`| that we are starting from|
|`nodeIndex`|`uint256`| that we are starting from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leaf`|`uint256`|highest leaf under the node that is set|


### calcMaxCompoundInterest

calc total interest for duration using the rate of the most utilized of L,X,X todo get from Interest or somewhere


```solidity
function calcMaxCompoundInterest(
    uint256 duration,
    uint256 maxUtilizationInWad
) internal pure returns (uint256 compoundedInterestRateInWAD);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`duration`|`uint256`| time since last update|
|`maxUtilizationInWad`|`uint256`| is the max of the L, X, Y borrow vs deposit utilizations|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`compoundedInterestRateInWAD`|`uint256`|total interest|


### getTrancheAtSqrtPriceX

calc tranche given a sqrt price


```solidity
function getTrancheAtSqrtPriceX(
    uint256 sqrtPriceInXInQ128
) internal pure returns (int256 tranche);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceInXInQ128`|`uint256`| value to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tranche`|`int256`| converted tranche|


### calcLiqSqrtPrice

Calc sqrt price at which positions' LTV would reach LTVMAX

Output guarantees $ 0 \le liqSqrtPriceXInQ128 \le uint256(type(uint56).max) << 128 $ (fuzz tested and logic)

Outside above range, outputs 0 (essentially no liq)

Does not revert if $ LTVMAX < LTV $, rather $ LTVMAX < LTV $ causing liq points are returned as 0, as if they do not exist, based on the assumption $ LTV \le LTVMAX $


```solidity
function calcLiqSqrtPrice(
    Validation.InputParams memory inputParams
) internal pure returns (uint256 netXLiqSqrtPriceXInQ128, uint256 netYLiqSqrtPriceXInQ128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| The position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netXLiqSqrtPriceXInQ128`|`uint256`| 0 if no netX liq price exists|
|`netYLiqSqrtPriceXInQ128`|`uint256`| 0 if no netY liq price exists|


### calcLiqSqrtPriceHandleAllABCNonZero

calc liq price when the quadratic has all 3 terms, netY,netL,netX, i.e. X, Y, L are all significant


```solidity
function calcLiqSqrtPriceHandleAllABCNonZero(
    CalcLiqSqrtPriceHandleAllABCNonZeroStruct memory input
) internal pure returns (uint256 netXLiqSqrtPriceXInQ128, uint256 netYLiqSqrtPriceXInQ128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`input`|`CalcLiqSqrtPriceHandleAllABCNonZeroStruct`| the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netXLiqSqrtPriceXInQ128`|`uint256`| 0 if no netX liq price exists|
|`netYLiqSqrtPriceXInQ128`|`uint256`| 0 if no netY liq price exists|


### readFieldBitFromNode

read single bit value from the field of a node


```solidity
function readFieldBitFromNode(uint256 node, uint256 bitPos) internal pure returns (uint256 bit);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`node`|`uint256`| the full node|
|`bitPos`|`uint256`| position of the bit $ \le 16 $|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`bit`|`uint256`| the resulting bit, 0 xor 1, as a uint|


### writeFlippedFieldBitToNode

write to node


```solidity
function writeFlippedFieldBitToNode(uint256 nodeIn, uint256 bitPos) internal pure returns (uint256 nodeOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`nodeIn`|`uint256`| node to read from|
|`bitPos`|`uint256`| position of the bit $ \le 16 $|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`nodeOut`|`uint256`| node with bit flipped|


### readFieldFromNode

read field from node


```solidity
function readFieldFromNode(
    uint256 node
) internal pure returns (uint256 field);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`node`|`uint256`| node to read from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`field`|`uint256`| field of the node|


### readSatFromNode

read sat from node


```solidity
function readSatFromNode(
    uint256 node
) internal pure returns (uint256 saturationInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`node`|`uint256`| node to read from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`saturationInLAssets`|`uint256`| sat in node|


### writeSatToNode

write sat to node


```solidity
function writeSatToNode(uint256 saturationInLAssets, uint256 nodeIn) internal pure returns (uint256 nodeOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`saturationInLAssets`|`uint256`| sat to write|
|`nodeIn`|`uint256`| node to read from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`nodeOut`|`uint256`| node with sat written|


### readTrancheCountFromNode

read tranche count from node


```solidity
function readTrancheCountFromNode(
    uint256 node
) internal pure returns (uint256 trancheCount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`node`|`uint256`| node to read from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`trancheCount`|`uint256`| number of tranches under this node|


### writeTrancheCountToNode

write tranche count to node


```solidity
function writeTrancheCountToNode(uint256 trancheCount, uint256 nodeIn) internal pure returns (uint256 nodeOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`trancheCount`|`uint256`| tranche count to write|
|`nodeIn`|`uint256`| node to read from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`nodeOut`|`uint256`| node with trancheCount written|


## Errors
### TooMuchSaturationToAdd

```solidity
error TooMuchSaturationToAdd();
```

### MaxTrancheOverSaturated

```solidity
error MaxTrancheOverSaturated();
```

## Structs
### SaturationStruct

```solidity
struct SaturationStruct {
    Tree netXTree;
    Tree netYTree;
}
```

### Tree

```solidity
struct Tree {
    bool netX;
    uint16 highestSetLeaf;
    uint256[][LEVELS_WITHOUT_LEAFS] nodes;
    uint256[][LEVELS_WITHOUT_LEAFS] penaltyInLAssetsPerSatInQ128;
    Leaf[LEAFS] leafs;
    mapping(int16 => uint16) trancheToLeaf;
    mapping(int16 => uint112) trancheToSatInLAssets;
    mapping(address => Account) accountData;
}
```

### Leaf

```solidity
struct Leaf {
    Uint16Set.Set tranches;
    uint112 satInLAssets;
    uint256 penaltyInLAssetsPerSatInQ128;
}
```

### Account

```solidity
struct Account {
    bool exists;
    int16 tranche;
    uint112[MAX_SATURATION_DISTRIBUTION_TRANCHES] satInLAssetsPerTranche;
    uint112 penaltyInLAssets;
    uint256[MAX_SATURATION_DISTRIBUTION_TRANCHES] treePenaltyAtOnsetInLAssetsPerSatInQ128PerTranche;
}
```

### CalcLiqSqrtPriceHandleAllABCNonZeroStruct

```solidity
struct CalcLiqSqrtPriceHandleAllABCNonZeroStruct {
    int256 netL;
    int256 netX;
    int256 netY;
    uint256 netYAbs;
    uint256 borrowedXAssets;
    uint256 borrowedYAssets;
}
```

### AddSatToTrancheStateUpdatesStruct

```solidity
struct AddSatToTrancheStateUpdatesStruct {
    int256 tranche;
    uint256 newLeaf;
    uint256 oldTrancheSatInLAssets;
    uint256 newTrancheSatInLAssets;
    uint256 satAvailableToAddInLAssets;
    address account;
}
```

