# Saturation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/82dff11576b9df76b675736dba889653cf737de9/contracts/libraries/Saturation.sol)

**Authors:**
imi@1m1.io, Will duelingGalois@protonmail.com

Saturation (=sat) is defined as the net borrow. In theory, we would want to divide net
borrow by the total liquidity; in practice, we keep the net borrow only in the tree. The unit
of sat is relative to active liquidity assets, or the amount of L deposited less the amount
borrowed.
When we determine how much a swap moves the price, or square root price, we can define our
equation using ticks, or tranches (100 ticks), where for some base $b$, the square root price
is $b^t$ for some tick $t$. Alternatively for a larger base $B = b^{100}$ we can define the
square root price as $B^T$ for some tranche $T$. Using the square root price, we can define the
amount of x or y in each tranche as $x =  LB^{T_0} - LB^{T_1} $ and $y= \frac{L}{ B^{T_1}} -
\frac{L}{ B^{T_0}}$, where liquidity is $L = \sqrt{reserveX \cdot reserveY}$. If we want to
know how much debt of x or y can be liquidated within one tranche, we can solve these equations
for L and then the amount of x and y are considered the debt we would like to see if it could
be liquidated in one tranche.  If saturation with respect to our starting $L$ is smaller, that
amount of debt can be liquidated in one swap in the given tranche. Otherwise it is to big and
can not. Note that we assume $T_1 \text{ and } T_0 \in \mathbb{Z}
$ and $T_0 + 1 = T_1$. Then our definition of saturation relative to L is as follows,
```math
\begin{equation}
saturationRelativeToL =
\begin{cases}
\frac{debtX}{B^{T_{1}}}\left(\frac{B}{B-1}\right) \\
debtY\cdot B^{T_{0}}\cdot\left(\frac{B}{B-1}\right)
\end{cases}
\end{equation}
```
Saturation is kept in a tree, starting with a root, levels and leafs. We keep 2 trees, one for
net X borrows, another for net Y borrows. The price is always the price of Y in units of X.
Mostly, the code works with the sqrt of price. A net X borrow refers to a position that if
liquidated would cause the price to become smaller; the opposite for net Y positions. Ticks are
along the price dimension and int16. Tranches are 100 ticks, stored as int16.
Leafs (uint16) split the sat, which is uint112, into intervals. From left to right, the leafs
of the tree cover the sat space in increasing order. Each account with a position has a price
at which its LTV would reach LTVMAX, which is its liquidation (=liq) price.
To place a debt into the appropriate tranche, we think of each debt and its respective
collateral as a serries of sums, where each item in the series fits in one tranche. Using
formulas above, we determine the number of ticks a debt would cross if liquidated. This is
considered the span of the liquidation. Using this value we then determine the start and end
points of the liquidation, where the start would be closer to the prices, on the right of the
end for net debt of x and on the left of the end for net debt of Y.
Once we have the liquidation start, end, and span, we begin to place the debt, one tranche at
a time moving towards the price. In this process we compare the prior recorded saturation and
allow the insertion up to some max, set at 90% or the configuration set by the user.
A Tranche contains multiple accounts and thus a total sat. The tranches' sat assigns it to a
leaf. Each leaf can contain multiple tranches and thus has a total actual sat whilst
representing a specific sat per tranche range. Leafs and thus tranches and thus accounts above
a certain sat threshold are considered over saturated. These accounts are penalized for being
in an over saturated tranche. Each account, tranche and leaf has a total penalty that needs to
be repaid to flatten the position fully. Sat is distributed over multiple tranches, in case a
single tranche does not have enough available sat left. Sat is kept cumulatively in the tree,
meaning a node contains the sum of the sat of its parents. Updating a sat at the  bottom of the
tree requires updating all parents. Penalty is kept as a path sum, in uints of LAssets, meaning
the penalty of an account is the sum of the penalties of all its parents. Updating the penalty
for a range of leafs only requires updating the appropriate parent. Position (=pos) refers to
the relative index of a child within its parent. Index refers to the index of a node in within
its level


## State Variables
### SATURATION_TIME_BUFFER_IN_MAG2

```solidity
uint256 internal constant SATURATION_TIME_BUFFER_IN_MAG2 = 101;
```


### MAX_SATURATION_RATIO_IN_MAG2

```solidity
uint256 internal constant MAX_SATURATION_RATIO_IN_MAG2 = 95;
```


### START_SATURATION_PENALTY_RATIO_IN_MAG2

```solidity
uint256 internal constant START_SATURATION_PENALTY_RATIO_IN_MAG2 = 85;
```


### MAX_INITIAL_SATURATION_MAG2

```solidity
uint256 internal constant MAX_INITIAL_SATURATION_MAG2 = 90;
```


### EXPECTED_SATURATION_LTV_MAG2

```solidity
uint256 internal constant EXPECTED_SATURATION_LTV_MAG2 = 85;
```


### EXPECTED_SATURATION_LTV_MAG2_TIMES_SAT_BUFFER_SQUARED

```solidity
uint256 internal constant EXPECTED_SATURATION_LTV_MAG2_TIMES_SAT_BUFFER_SQUARED = 867_085;
```


### EXPECTED_SATURATION_LTV_PLUS_ONE_MAG2

```solidity
uint256 internal constant EXPECTED_SATURATION_LTV_PLUS_ONE_MAG2 = 185;
```


### PENALTY_FACTOR_IN_MAG2

```solidity
uint256 private constant PENALTY_FACTOR_IN_MAG2 = 10;
```


### SAT_CHANGE_OF_BASE_Q128

```solidity
uint256 private constant SAT_CHANGE_OF_BASE_Q128 = 0xa39713406ef781154a9e682c2331a7c03;
```


### SAT_CHANGE_OF_BASE_TIMES_SHIFT

```solidity
uint256 private constant SAT_CHANGE_OF_BASE_TIMES_SHIFT = 0xb3f2fb93ad437464387b0c308d1d05537;
```


### TICK_OFFSET

```solidity
int16 private constant TICK_OFFSET = 1112;
```


### LOWEST_POSSIBLE_IN_PENALTY

```solidity
uint256 internal constant LOWEST_POSSIBLE_IN_PENALTY = 0xd9999999999999999999999999999999;
```


### MIN_LIQ_TO_REACH_PENALTY

```solidity
uint256 private constant MIN_LIQ_TO_REACH_PENALTY = 850;
```


### INT_ONE

```solidity
int256 private constant INT_ONE = 1;
```


### INT_NEGATIVE_ONE

```solidity
int256 private constant INT_NEGATIVE_ONE = -1;
```


### INT_ZERO

```solidity
int256 private constant INT_ZERO = 0;
```


### LEVELS_WITHOUT_LEAFS

```solidity
uint256 internal constant LEVELS_WITHOUT_LEAFS = 3;
```


### LOWEST_LEVEL_INDEX

```solidity
uint256 internal constant LOWEST_LEVEL_INDEX = 2;
```


### LEAFS

```solidity
uint256 internal constant LEAFS = 4096;
```


### CHILDREN_PER_NODE

```solidity
uint256 internal constant CHILDREN_PER_NODE = 16;
```


### CHILDREN_AT_THIRD_LEVEL

```solidity
uint256 private constant CHILDREN_AT_THIRD_LEVEL = 256;
```


### TICKS_PER_TRANCHE

```solidity
int256 private constant TICKS_PER_TRANCHE = 100;
```


### TRANCHE_BASE_OVER_BASE_MINUS_ONE_Q72

```solidity
uint256 constant TRANCHE_BASE_OVER_BASE_MINUS_ONE_Q72 = 0x5a19b9039a07efd7b39;
```


### MIN_TRANCHE

```solidity
int256 internal constant MIN_TRANCHE = -199;
```


### MAX_TRANCHE

```solidity
int256 internal constant MAX_TRANCHE = 198;
```


### FIELD_NODE_MASK

```solidity
uint256 private constant FIELD_NODE_MASK = 0xffff;
```


### SATURATION_MAX_BUFFER_TRANCHES

```solidity
uint8 internal constant SATURATION_MAX_BUFFER_TRANCHES = 3;
```


### QUARTER_MINUS_ONE

```solidity
uint256 private constant QUARTER_MINUS_ONE = 24;
```


### QUARTER_OF_MAG2

```solidity
uint256 private constant QUARTER_OF_MAG2 = 25;
```


### NUMBER_OF_QUARTERS

```solidity
uint256 private constant NUMBER_OF_QUARTERS = 4;
```


### SOFT_LIQUIDATION_SCALER

```solidity
uint256 private constant SOFT_LIQUIDATION_SCALER = 10_020;
```


### TWO_Q64

```solidity
uint256 private constant TWO_Q64 = 0x20000000000000000;
```


### FOUR_Q128

```solidity
uint256 private constant FOUR_Q128 = 0x400000000000000000000000000000000;
```


### MAG4_TIMES_Q64

```solidity
uint256 private constant MAG4_TIMES_Q64 = 0x27100000000000000000;
```


### B_Q72_MINUS_ONE

```solidity
uint256 private constant B_Q72_MINUS_ONE = 0x1008040201008040200;
```


## Functions
### initializeSaturationStruct

initializes the satStruct, allocating storage for all nodes

*initCheck can be removed once the tree structure is fixed*


```solidity
function initializeSaturationStruct(
    SaturationStruct storage satStruct
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`|contains the entire sat data|


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


### update

update the borrow position of an account and potentially check (and revert) if the resulting sat is too high

*run accruePenalties before running this function*


```solidity
function update(
    SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    address account,
    uint256 userSaturationRatioMAG2
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`inputParams`|`Validation.InputParams`| contains the position and pair params, like account borrows/deposits, current price and active liquidity|
|`account`|`address`| for which is position is being updated|
|`userSaturationRatioMAG2`|`uint256`||


### updateTreeGivenAccountTrancheAndSat

internal update that removes the account from the tree (if it exists) from its prev position and adds it to its new position


```solidity
function updateTreeGivenAccountTrancheAndSat(
    Tree storage tree,
    SaturationPair memory newSaturation,
    address account,
    int256 newEndOfLiquidationInTicks,
    uint256 activeLiquidityInLAssets,
    uint256 userSaturationRatioMAG2
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`newSaturation`|`SaturationPair`| the new sat of the account, in units of LAssets (absolute) and relative to active liquidity|
|`account`|`address`| whos position is being considered|
|`newEndOfLiquidationInTicks`|`int256`|the new tranche of the account in mag2.|
|`activeLiquidityInLAssets`|`uint256`| of the pair|
|`userSaturationRatioMAG2`|`uint256`||


### removeSatFromTranche

remove sat from tree, for each tranche in a loop that could hold sat for the account


```solidity
function removeSatFromTranche(
    Tree storage tree,
    address account,
    int256 trancheDirection
) internal returns (bool highestSetLeafRemoved);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`|whos position is being considered|
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
    SaturationPair memory oldAccountSaturationInTranche,
    int256 tranche,
    uint256 oldLeaf,
    address account,
    uint256 trancheIndex
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`oldAccountSaturationInTranche`|`SaturationPair`|account sat|
|`tranche`|`int256`| under consideration|
|`oldLeaf`|`uint256`|where tranche was located before this sat removal|
|`account`|`address`| needed to accrue penalty|
|`trancheIndex`|`uint256`|which tranche of the account are we handling?|


### addSatToTranche

add sat to tree, for each tranche in a loop as needed. we add to each tranche as much as it can bear.

*Saturation Distribution Logic
This function distributes debt across multiple tranches, maintaining two types of saturation:
1. satInLAssets: The absolute debt amount in L assets (should remain constant total)
2. satRelativeToL: The relative saturation that depends on the tranche's price level
As we move between tranches (different price levels), the same absolute debt
translates to different relative saturations due to the price-dependent formula.
conceptually satInLAssets should not be scaled as it represents actual debt that
doesn't change with price.*


```solidity
function addSatToTranche(
    Tree storage tree,
    address account,
    int256 trancheDirection,
    int256 newEndOfLiquidationInTicks,
    SaturationPair memory newSaturation,
    uint256 activeLiquidityInLAssets,
    uint256 userSaturationRatioMAG2
) internal returns (bool highestSetLeafAdded);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`|who's position is being considered|
|`trancheDirection`|`int256`|direction of sat distribution depending on netX/netY|
|`newEndOfLiquidationInTicks`|`int256`|the new tranche of the account location in MAG2|
|`newSaturation`|`SaturationPair`|the new sat of the account, in units of LAssets (absolute) and relative to active liquidity|
|`activeLiquidityInLAssets`|`uint256`|of the pair|
|`userSaturationRatioMAG2`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`highestSetLeafAdded`|`bool`|flag indicating whether we removed sat from the highest leaf xor not|


### getAddSatToTrancheStateUpdatesParams

convenience struct holding the params needed to run `addSatToTrancheStateUpdates`


```solidity
function getAddSatToTrancheStateUpdatesParams(
    Tree storage tree,
    int256 tranche,
    SaturationPair memory newSaturation,
    uint256 activeLiquidityInLAssets,
    address account,
    uint256 userSaturationRatioMAG2,
    uint256 quarters
) internal view returns (AddSatToTrancheStateUpdatesStruct memory addSatToTrancheStateUpdatesParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`tranche`|`int256`|under consideration|
|`newSaturation`|`SaturationPair`|the saturation values to add|
|`activeLiquidityInLAssets`|`uint256`|of the pair|
|`account`|`address`|whos position is being considered|
|`userSaturationRatioMAG2`|`uint256`|user saturation ratio|
|`quarters`|`uint256`|number of quarters for the calculation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`addSatToTrancheStateUpdatesParams`|`AddSatToTrancheStateUpdatesStruct`|the struct with required params to|


### addSatToTrancheStateUpdates

depending on old and new leaf of the tranche, update the sats, fields and penalties of the tree


```solidity
function addSatToTrancheStateUpdates(
    Tree storage tree,
    AddSatToTrancheStateUpdatesStruct memory params
) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`params`|`AddSatToTrancheStateUpdatesStruct`| convenience struct holding params needed for these updates|


### addSatToTrancheStateUpdatesHigherLeaf

Add sat to tranche state updates higher leaf


```solidity
function addSatToTrancheStateUpdatesHigherLeaf(
    Tree storage tree,
    int256 tranche,
    SaturationPair memory oldTrancheSaturation,
    SaturationPair memory newTrancheSaturation,
    uint256 oldLeaf,
    uint256 newLeaf
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`tranche`|`int256`| the tranche that is being moved|
|`oldTrancheSaturation`|`SaturationPair`| the old sat of the tranche|
|`newTrancheSaturation`|`SaturationPair`| the new sat of the tranche|
|`oldLeaf`|`uint256`| the leaf that the tranche was located in before it was removed|
|`newLeaf`|`uint256`| the leaf that the tranche was located in after it was removed|


### removeTrancheToLeaf

removing a tranche from a leaf, update the fields and sats up the tree


```solidity
function removeTrancheToLeaf(
    Tree storage tree,
    SaturationPair memory trancheSaturation,
    int256 tranche,
    uint256 leaf
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`trancheSaturation`|`SaturationPair`| the saturation of the tranche being moved|
|`tranche`|`int256`| that is being moved|
|`leaf`|`uint256`| the leaf|


### addTrancheToLeaf

adding a tranche from a leaf, update the fields and sats up the tree


```solidity
function addTrancheToLeaf(
    Tree storage tree,
    SaturationPair memory trancheSaturation,
    int256 tranche,
    uint256 leaf
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`trancheSaturation`|`SaturationPair`| the saturation of the tranche being moved|
|`tranche`|`int256`| that is being moved|
|`leaf`|`uint256`| the leaf|


### addSatUpTheTree

recursively add sat up the tree


```solidity
function addSatUpTheTree(Tree storage tree, int256 satInLAssets) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`satInLAssets`|`int256`| sat to add to the current node, usually uint112, int to allow subtracting sat up the tree|


### updatePenalties

update penalties in the tree given


```solidity
function updatePenalties(
    Tree storage tree,
    uint256 thresholdLeaf,
    uint256 addPenaltyInBorrowLSharesPerSatInQ72
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`| from which leaf on the penalty needs to be added inclusive|
|`addPenaltyInBorrowLSharesPerSatInQ72`|`uint256`| the penalty to be added|


### getPenaltySharesPerSatFromLeaf

recursive function to sum penalties from leaf to root


```solidity
function getPenaltySharesPerSatFromLeaf(
    Tree storage tree,
    uint256 leaf
) private view returns (uint256 penaltyInBorrowLSharesPerSatInQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`leaf`|`uint256`| index (0 based) of the leaf|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLSharesPerSatInQ72`|`uint256`| total penalty at the leaf, non-negative but returned as an int for recursion|


### accrueAccountPenalty

calc penalty owed by account for repay, total over all the tranches that might contain this accounts' sat


```solidity
function accrueAccountPenalty(Tree storage tree, address account) internal returns (uint256 penaltyInBorrowLShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`| who's position is being considered|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint256`| the penalty owed by the account|


### calcNewAccountPenalty

calc penalty owed by account for repay, total over all the tranches that might contain this accounts' sat


```solidity
function calcNewAccountPenalty(
    Tree storage tree,
    uint256 leaf,
    uint256 accountSatInTrancheInLAssets,
    address account,
    uint256 trancheIndex
) private view returns (uint256 penaltyInBorrowLShares, uint256 accountTreePenaltyInBorrowLSharesPerSatInQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`leaf`|`uint256`| the leaf that the tranche belongs to|
|`accountSatInTrancheInLAssets`|`uint256`| the sat of the account in the tranche|
|`account`|`address`| who's position is being considered|
|`trancheIndex`|`uint256`| the index of the tranche that is being added to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint256`| the penalty owed by the account|
|`accountTreePenaltyInBorrowLSharesPerSatInQ72`|`uint256`| the penalty owed by the account in the tranche|


### calcAndAccrueNewAccountPenalty

calc and accrue new account penalty


```solidity
function calcAndAccrueNewAccountPenalty(
    Tree storage tree,
    SaturationPair memory oldAccountSaturationInTranche,
    uint256 oldLeaf,
    address account,
    uint256 trancheIndex,
    uint256 newTreePenaltyAtOnsetInBorrowLSharesPerSatInQ72PerTranche
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`oldAccountSaturationInTranche`|`SaturationPair`| the old sat of the account in the tranche|
|`oldLeaf`|`uint256`| the leaf that the tranche was located in before it was removed|
|`account`|`address`| who's position is being considered|
|`trancheIndex`|`uint256`| the index of the tranche that is being added to|
|`newTreePenaltyAtOnsetInBorrowLSharesPerSatInQ72PerTranche`|`uint256`| the new penalty at onset in borrow l shares per sat in q72 per tranche|


### accruePenalties

accrue penalties since last accrual based on all over saturated positions


```solidity
function accruePenalties(
    SaturationStruct storage satStruct,
    address account,
    uint256 externalLiquidity,
    uint256 duration,
    uint256 allAssetsDepositL,
    uint256 allAssetsBorrowL,
    uint256 allSharesBorrowL
) internal returns (uint112 penaltyInBorrowLShares, uint112 accountPenaltyInBorrowLShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`account`|`address`| who's position is being considered|
|`externalLiquidity`|`uint256`| Swap liquidity outside this pool|
|`duration`|`uint256`| since last accrual of penalties|
|`allAssetsDepositL`|`uint256`| allAsset[DEPOSIT_L]|
|`allAssetsBorrowL`|`uint256`| allAsset[BORROW_L]|
|`allSharesBorrowL`|`uint256`| allShares[BORROW_L]|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint112`| the penalty owed by the account|
|`accountPenaltyInBorrowLShares`|`uint112`| the penalty owed by the account|


### calcNewPenalties

calc new penalties


```solidity
function calcNewPenalties(
    SaturationStruct storage satStruct,
    uint256 externalLiquidity,
    uint256 duration,
    uint256 allAssetsDepositL,
    uint256 allAssetsBorrowL,
    uint256 allSharesBorrowL
)
    private
    view
    returns (
        uint256 penaltyNetXInBorrowLShares,
        uint256 penaltyNetXInBorrowLSharesPerSatInQ72,
        uint256 penaltyNetYInBorrowLShares,
        uint256 penaltyNetYInBorrowLSharesPerSatInQ72,
        uint256 thresholdLeaf
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`externalLiquidity`|`uint256`| Swap liquidity outside this pool|
|`duration`|`uint256`| since last accrual of penalties|
|`allAssetsDepositL`|`uint256`| allAsset[DEPOSIT_L]|
|`allAssetsBorrowL`|`uint256`| allAsset[BORROW_L]|
|`allSharesBorrowL`|`uint256`| allShares[BORROW_L]|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyNetXInBorrowLShares`|`uint256`| the penalty net X in borrow l shares|
|`penaltyNetXInBorrowLSharesPerSatInQ72`|`uint256`| the penalty net X in borrow l shares per sat in q72|
|`penaltyNetYInBorrowLShares`|`uint256`| the penalty net Y in borrow l shares|
|`penaltyNetYInBorrowLSharesPerSatInQ72`|`uint256`| the penalty net Y in borrow l shares per sat in q72|
|`thresholdLeaf`|`uint256`| the threshold leaf|


### calcNewPenaltiesGivenTree

calc new penalties given tree


```solidity
function calcNewPenaltiesGivenTree(
    Tree storage tree,
    uint256 thresholdLeaf,
    uint256 duration,
    uint256 currentBorrowUtilizationInWad,
    uint256 saturationUtilizationInWad,
    uint256 allAssetsDepositL,
    uint256 allAssetsBorrowL,
    uint256 allSharesBorrowL
) private view returns (uint256 penaltyInBorrowLShares, uint256 penaltyInBorrowLSharesPerSatInQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`|the threshold leaf|
|`duration`|`uint256`|since last accrual of penalties|
|`currentBorrowUtilizationInWad`|`uint256`|current borrow utilization in WAD|
|`saturationUtilizationInWad`|`uint256`|saturation utilization in WAD|
|`allAssetsDepositL`|`uint256`|allAsset[DEPOSIT_L]|
|`allAssetsBorrowL`|`uint256`|allAsset[BORROW_L]|
|`allSharesBorrowL`|`uint256`|allShares[BORROW_L]|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint256`|the penalty net X in borrow l shares|
|`penaltyInBorrowLSharesPerSatInQ72`|`uint256`|the penalty net X in borrow l shares per sat in q72|


### accrueAndRemoveAccountPenalty

accrue and remove account penalty


```solidity
function accrueAndRemoveAccountPenalty(
    SaturationStruct storage satStruct,
    address account
) internal returns (uint112 penaltyInBorrowLShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`account`|`address`| who's position is being considered|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint112`| the penalty owed by the account|


### calculateHardLiquidationPremium

calculate the max liquidation premium in bips for a hard liquidation uses the tree *   to determine to allow for partial liquidations as they occur.

*notice that input params are mutated but then returned to their original state.*


```solidity
function calculateHardLiquidationPremium(
    Saturation.SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    address borrower,
    uint256 netBorrowRepaidLAssets,
    uint256 netDepositSeizedLAssets,
    bool netDebtX
) internal view returns (uint256 maxPremiumInBips, bool allAssetsSeized);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`Saturation.SaturationStruct`| main data struct|
|`inputParams`|`Validation.InputParams`| all user assets and prices|
|`borrower`|`address`||
|`netBorrowRepaidLAssets`|`uint256`| net debt repaid in liquidity assets|
|`netDepositSeizedLAssets`|`uint256`| net collateral seized in liquidity assets|
|`netDebtX`|`bool`| whether net debt is in X or Y|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxPremiumInBips`|`uint256`| the max premium in bips that|
|`allAssetsSeized`|`bool`||


### mutateInputParamsForPartialLiquidation

mutate input params to only include the eligible debt and collateral for ltv
calculation


```solidity
function mutateInputParamsForPartialLiquidation(
    Saturation.SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    address borrower,
    uint256 netBorrowRepaidLAssets,
    bool netDebtX
) internal view returns (uint256 netDepositInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`Saturation.SaturationStruct`| main data struct|
|`inputParams`|`Validation.InputParams`| all user assets and prices|
|`borrower`|`address`| borrower address|
|`netBorrowRepaidLAssets`|`uint256`| net debt in liquidity assets|
|`netDebtX`|`bool`| whether net debt is in X or Y|


### calcPortionsForPartialLiquidation

Calculate the percent of debt and collateral that is eligible for ltv calculation

*note that we assume that the min and max sqrt price are switched prior to calling this.*


```solidity
function calcPortionsForPartialLiquidation(
    Saturation.SaturationStruct storage satStruct,
    address borrower,
    uint256 netBorrowRepaidLAssets,
    bool netDebtX
) internal view returns (uint256 partialBorrow, uint256 totalBorrow, uint256 partialDeposit, uint256 totalDeposit);
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
|`lowerNodePos`|`uint256`| pos is the relative position (0 based) of the node in its parent|
|`set`|`uint256`| 1 for set, 0 for unset|


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


### calcLiqSqrtPriceQ72

Calc sqrt price at which positions' LTV would reach LTV_MAX

Output guarantees $ 0 \le liqSqrtPriceXInQ72 \le uint256(type(uint56).max) << 72 $ (fuzz tested and logic)

Outside above range, outputs 0 (essentially no liq)

Does not revert if $ LTV_MAX < LTV $, rather $ LTV_MAX < LTV $ causing liq points are returned as 0, as if they do not exist, based on the assumption $ LTV \le LTV_MAX $


```solidity
function calcLiqSqrtPriceQ72(
    uint256[6] memory userAssets
) internal pure returns (uint256 netDebtXLiqSqrtPriceXInQ72, uint256 netDebtYLiqSqrtPriceXInQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`| The position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXLiqSqrtPriceXInQ72`|`uint256`| 0 if no netX liq price exists|
|`netDebtYLiqSqrtPriceXInQ72`|`uint256`| 0 if no netY liq price exists|


### calcLiqSqrtPriceQ72HandleAllABCNonZero

calc liq price when the quadratic has all 3 terms, netY,netL,netX, i.e. X, Y, L are all significant


```solidity
function calcLiqSqrtPriceQ72HandleAllABCNonZero(
    CalcLiqSqrtPriceHandleAllABCNonZeroStruct memory input
) internal pure returns (uint256 netDebtXLiqSqrtPriceXInQ72, uint256 netDebtYLiqSqrtPriceXInQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`input`|`CalcLiqSqrtPriceHandleAllABCNonZeroStruct`|the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXLiqSqrtPriceXInQ72`|`uint256`|0 if no netX liq price exists|
|`netDebtYLiqSqrtPriceXInQ72`|`uint256`|0 if no netY liq price exists|


### calcSatChangeRatioBips

Calculate the ratio by which the saturation has changed for `account`.


```solidity
function calcSatChangeRatioBips(
    SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ72,
    uint256 liqSqrtPriceInYInQ72,
    address account,
    uint256 desiredSaturationMAG2
) internal view returns (uint256 ratioNetXBips, uint256 ratioNetYBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`|The saturation struct containing both netX and netY trees.|
|`inputParams`|`Validation.InputParams`|The params containing the position of `account`.|
|`liqSqrtPriceInXInQ72`|`uint256`|The liquidation price for netX.|
|`liqSqrtPriceInYInQ72`|`uint256`|The liquidation price for netY.|
|`account`|`address`|The account for which we are calculating the saturation change ratio.|
|`desiredSaturationMAG2`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ratioNetXBips`|`uint256`|The ratio representing the change in netX saturation for account.|
|`ratioNetYBips`|`uint256`|The ratio representing the change in netY saturation for account.|


### calcTotalSatAfterLeafInclusive

calc total sat of all accounts/tranches/leafs higher (and same) as the threshold

*iterate through leaves directly since penalty range is fixed (~8 leaves from 85% to 95% sat)*


```solidity
function calcTotalSatAfterLeafInclusive(
    Tree storage tree,
    uint256 thresholdLeaf
) internal view returns (uint128 satInLAssetsInPenalty);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`|leaf to start adding sat from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satInLAssetsInPenalty`|`uint128`|total sat of all accounts with tranche in a leaf from at least `thresholdLeaf` (absolute saturation)|


### getSatPercentageInWads

Get precalculated saturation percentage for a given delta (maxLeaf - highestLeaf)


```solidity
function getSatPercentageInWads(
    SaturationStruct storage satStruct
) internal view returns (uint256 saturationPercentage);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| The saturation struct|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`saturationPercentage`|`uint256`| The precalculated saturation percentage as uint256|


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


### calcSatAvailableToAddToTranche

calc how much sat can be added to a tranche such that it is healthy


```solidity
function calcSatAvailableToAddToTranche(
    uint256 activeLiquidityInLAssets,
    uint128 targetSatToAddInLAssets,
    uint128 currentTrancheSatInLAssets,
    uint256 userSaturationRatioMAG2,
    uint256 quarters
) internal pure returns (uint128 satAvailableToAddInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`activeLiquidityInLAssets`|`uint256`| of the pair|
|`targetSatToAddInLAssets`|`uint128`| the sat that we want to add|
|`currentTrancheSatInLAssets`|`uint128`| the sat that the tranche already hols|
|`userSaturationRatioMAG2`|`uint256`||
|`quarters`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satAvailableToAddInLAssets`|`uint128`| considering the `currentTrancheSatInLAssets` and the max a tranche can have|


### calcLastTrancheAndSaturation

calc the tranche percent and the saturation of the tranche


```solidity
function calcLastTrancheAndSaturation(
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ72,
    uint256 desiredThresholdMag2,
    bool netDebtX
) internal pure returns (int256 endOfLiquidationInTicks, SaturationPair memory saturation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| the input params|
|`liqSqrtPriceInXInQ72`|`uint256`| the liq sqrt price in X|
|`desiredThresholdMag2`|`uint256`| the desired threshold|
|`netDebtX`|`bool`| whether the net debt is X or Y|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`endOfLiquidationInTicks`|`int256`| the point at which the liquidation would end.|
|`saturation`|`SaturationPair`|the saturation of the tranche|


### calculateNetDebtAndSpan

calc net debt and span


```solidity
function calculateNetDebtAndSpan(
    Validation.InputParams memory inputParams,
    uint256 desiredThresholdMag2,
    bool netDebtX
) internal pure returns (uint256 netDebtXorYAssets, uint256 netDebtLAssets, uint256 trancheSpanInTicks);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| the input params|
|`desiredThresholdMag2`|`uint256`| the desired threshold|
|`netDebtX`|`bool`| whether the net debt is X or Y|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXorYAssets`|`uint256`| the net debt|
|`netDebtLAssets`|`uint256`| the net debt in L assets|
|`trancheSpanInTicks`|`uint256`| the tranche span percentage|


### calculateSaturation

calculate the relative saturation of the position at the end of liquidation.

*Since we place saturation in tranches starting at the end and moving forward, this
calculates the entire saturation as if it would fit in the last tranche, we then need to
adjust the saturation each time we move to the next tranche by dividing by a factor of
$$B$$. The equation here is slightly different than the equation in our description since
we multiply by a factor of $$B$$ for each tranche we move back away from the start.
thus here we use, where $$TCount$$ is the number of tranches we need to move back,
```math
\begin{equation}
saturationRelativeToL =
\begin{cases}
\frac{debtX}{B^{T_{1}}}\left(\frac{B^{TCount}}{B-1}\right) \\
debtY\cdot B^{T_{0}}\cdot\left(\frac{B^{TCount}}{B-1}\right)
\end{cases}
\end{equation}
```
As we iterate through tranches, we divide by a factor of $$B$$ such that when we reach the
final tranche, our equation from the start applies.*


```solidity
function calculateSaturation(
    uint256 netDebtXOrYAssets,
    uint256 startSqrtPriceQ72,
    uint256 trancheSpanInTicks,
    bool netDebtX
) internal pure returns (uint256 saturation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXOrYAssets`|`uint256`| the net debt in X or Y assets.|
|`startSqrtPriceQ72`|`uint256`| the sqrt price at the start of liquidation|
|`trancheSpanInTicks`|`uint256`| the span of the tranche in ticks.|
|`netDebtX`|`bool`| whether the debt is in X or Y assets|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`saturation`|`uint256`| the saturation relative to active liquidity assets.|


### calcMinTrancheSpanInTicks

calc the minimum tranche count given the collateral, debt, active liquidity and desired threshold


```solidity
function calcMinTrancheSpanInTicks(
    uint256 collateral,
    uint256 debt,
    uint256 activeLiquidityAssets,
    uint256 desiredThresholdMag2
) internal pure returns (uint256 trancheSpanInTicks);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateral`|`uint256`| the collateral amount|
|`debt`|`uint256`| the debt amount|
|`activeLiquidityAssets`|`uint256`| the active liquidity assets|
|`desiredThresholdMag2`|`uint256`| the desired threshold|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`trancheSpanInTicks`|`uint256`| the tranche span a position will need. When greater than TICKS_PER_TRANCHE, multiple tranches are needed.|


### calcTrancheAtStartOfLiquidation

calc the tranche at start of liquidation


```solidity
function calcTrancheAtStartOfLiquidation(
    uint256 netDebtXorYAssets,
    uint256 activeLiquidityAssets,
    uint256 trancheSpanInTicks,
    uint256 desiredThresholdMag2,
    bool netDebtX
) internal pure returns (int256 trancheStartOfLiquidationMag2);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXorYAssets`|`uint256`| the net debt in X or Y assets.|
|`activeLiquidityAssets`|`uint256`| the active liquidity assets|
|`trancheSpanInTicks`|`uint256`| the tranche span percentage|
|`desiredThresholdMag2`|`uint256`| the desired threshold|
|`netDebtX`|`bool`| whether the net debt is X or Y|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`trancheStartOfLiquidationMag2`|`int256`| the tranche at start of liquidation|


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


### calcSaturationPenaltyRatePerSecondInWads

Calculates the penalty scaling factor based on current borrow utilization and saturation

*This implements the penalty rate function
Formula: ((1 - u_0) * f_interestPerSecond(u_1) * allAssetsDepositL) / (WAD * satInLAssetsInPenalty)
Where u_1 = (0.90 - (1 - u_0) * (0.95 - u_s) / 0.95)*


```solidity
function calcSaturationPenaltyRatePerSecondInWads(
    uint256 currentBorrowUtilizationInWad,
    uint256 saturationUtilizationInWad,
    uint128 satInLAssetsInPenalty,
    uint256 allAssetsDepositL
) internal pure returns (uint256 penaltyRatePerSecondInWads);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentBorrowUtilizationInWad`|`uint256`|Current borrow utilization of L (u_0)|
|`saturationUtilizationInWad`|`uint256`|Current saturation utilization (u_s)|
|`satInLAssetsInPenalty`|`uint128`|The saturation in L assets in the penalty|
|`allAssetsDepositL`|`uint256`|The total assets deposited in L|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyRatePerSecondInWads`|`uint256`|The penalty rate per second in WADs|


## Errors
### MaxTrancheOverSaturated

```solidity
error MaxTrancheOverSaturated();
```

### CannotUpdateZeroAddress

```solidity
error CannotUpdateZeroAddress();
```

## Structs
### SaturationStruct

```solidity
struct SaturationStruct {
    Tree netXTree;
    Tree netYTree;
    uint16 maxLeaf;
}
```

### SaturationPair
a pair of saturation values used and stored throughout this library.


```solidity
struct SaturationPair {
    uint128 satInLAssets;
    uint128 satRelativeToL;
}
```

### Tree

```solidity
struct Tree {
    bool netX;
    uint16 highestSetLeaf;
    uint128 totalSatInLAssets;
    uint256 tranchesWithSaturation;
    uint256[][LEVELS_WITHOUT_LEAFS] nodes;
    Leaf[LEAFS] leafs;
    mapping(int16 => uint16) trancheToLeaf;
    mapping(int16 => SaturationPair) trancheToSaturation;
    mapping(address => Account) accountData;
}
```

### Leaf

```solidity
struct Leaf {
    Uint16Set.Set tranches;
    SaturationPair leafSatPair;
    uint256 penaltyInBorrowLSharesPerSatInQ72;
}
```

### Account

```solidity
struct Account {
    bool exists;
    int16 lastTranche;
    uint112 penaltyInBorrowLShares;
    SaturationPair[] satPairPerTranche;
    uint256[] treePenaltyAtOnsetInBorrowLSharesPerSatInQ72PerTranche;
}
```

### CalcLiqSqrtPriceHandleAllABCNonZeroStruct

```solidity
struct CalcLiqSqrtPriceHandleAllABCNonZeroStruct {
    int256 netLInMAG2;
    int256 netXInMAG2;
    int256 netYInMAG2;
    uint256 netYAbsInMAG2;
    uint256 borrowedXAssets;
    uint256 borrowedYAssets;
}
```

### AddSatToTrancheStateUpdatesStruct

```solidity
struct AddSatToTrancheStateUpdatesStruct {
    int256 tranche;
    uint256 newLeaf;
    SaturationPair oldTrancheSaturation;
    SaturationPair newTrancheSaturation;
    SaturationPair satAvailableToAdd;
    address account;
}
```

