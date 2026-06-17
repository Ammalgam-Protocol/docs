# Saturation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/41405bd809b3ec5c7cb39be8890c13bee26ba0b6/contracts/libraries/Saturation.sol)

**Authors:**
imi@1m1.io, Will duelingGalois@protonmail.com

Maintains saturation, or sat, which is the net borrow tracked for each
liquidation tranche.
Saturation is measured relative to active liquidity assets: deposited L less borrowed L.
In practice the tree stores the net borrow amount, while callers interpret it relative
to active liquidity.
Price movement is modeled with tick base $b$ and tranche base $B$. A tranche groups
`TICKS_PER_TRANCHE` ticks:
```math
B=b^{\mathrm{TICKS\_PER\_TRANCHE}}
```
For a tranche bounded by $T_0$ and $T_1$, liquidity $L=\sqrt{reserveX\cdot reserveY}$
implies the following X and Y amounts:
```math
\begin{align*}
x &= L\cdot B^{T_0}-L\cdot B^{T_1} \\
y &= \frac{L}{B^{T_1}}-\frac{L}{B^{T_0}}
\end{align*}
```
For one tick, with integer ticks $t_0$ and $t_1$ where $t_0+1=t_1$, saturation relative
to L is:
```math
saturationRelativeToL =
\begin{cases}
\frac{debtX}{b^{t_1}}\left(\frac{b}{b-1}\right) \\
debtY\cdot b^{t_0}\cdot\left(\frac{b}{b-1}\right)
\end{cases}
```
Saturation is kept in two trees: one for net X borrows and one for net Y borrows. The
price is always the price of Y in units of X, and most calculations use sqrt price. A
net X borrow is a position whose liquidation would push price lower; a net Y borrow
pushes price higher.
Leaves split the `uint112` saturation space into ordered intervals. Tranches and leaves
above the configured threshold are over-saturated and accrue penalties. Saturation is
cumulative in the tree, so updating a leaf also updates its parents. Penalties are path
sums in L assets.
To allocate saturation, a debt and its collateral are represented as a series of tranche
sized pieces. For liquidation start tick $t_s$ and end tick $t_e$:
```math
\begin{align*}
X &= L\cdot\left(b^{t_e}-b^{t_s}\right) \\
Y &= L\cdot\left(\frac{1}{b^{t_s}}-\frac{1}{b^{t_e}}\right)
\end{align*}
```
The tranche boundaries advance by `TICKS_PER_TRANCHE`. For net X debt,
$T_0=t_e\bmod \mathrm{TICKS\_PER\_TRANCHE}$; for net Y debt,
$T_0=(-t_e)\bmod \mathrm{TICKS\_PER\_TRANCHE}$. Each subsequent tranche is
$T_i=T_{i-1}+\mathrm{TICKS\_PER\_TRANCHE}$.
The X-side allocation can be rewritten as:
```math
\begin{align*}
X &=
L\left(b^{T_1}-b^{t_e}\right)
+ L\left(b^{T_2}-b^{T_1}\right)
+ \dots
+ L\left(b^{T_n}-b^{T_{n-1}}\right)
+ L\left(b^{t_s}-b^{T_n}\right) \\
\frac{X}{b^{t_e}(B-1)} &=
L\left(
\frac{B\cdot b^{t_e-T_0}-1}{B-1}
+ \frac{\sum_{i=1}^{n-1} B^i}{b^{t_e-T_0}}
+ \frac{B^n\left(\frac{b^{t_s}}{B^n\cdot b^{T_0}}-1\right)}
{b^{t_e-T_0}(B-1)}
\right)
\end{align*}
```
The left side is total saturation $T_{sat}$. The right side splits that total into each
tranche's saturation $s_i$, starting furthest from the current price and moving toward it:
```math
\begin{align*}
T_{sat} &=
s_0
+ \frac{\sum_{i=1}^{n-1}s_i\cdot B^i}{b^{t_e-T_0}}
+ \frac{B^n\cdot s_n}{b^{t_e-T_0}} \\
\frac{(T_{sat}-s_0)b^{t_e-T_0}}{B}-s_1 &=
\left(\sum_{i=2}^{n-1}s_i\cdot B^{i-1}\right)
+ B^{n-1}\cdot s_n \\
\frac{\frac{(T_{sat}-s_0)b^{t_e-T_0}}{B}-s_1}{B}-s_2 &=
\left(\sum_{i=2}^{n-1}s_i\cdot B^{i-2}\right)
+ B^{n-2}\cdot s_n
\end{align*}
```
The Y-side allocation is the same except that $T_{sat}$ multiplies by $b^{t_e}$ rather
than dividing by it. During iteration, each tranche reduces the remaining saturation by
a factor of $B$. The first tranche also applies a one-time $b^{t_e-T_0}$ adjustment for
the offset between the end of liquidation and the tranche boundary.
If saturation reaches `minOrMaxTick`, the position is already at the edge of the probable
price range and the calculation reverts.


## State Variables
### SATURATION_TIME_BUFFER_IN_MAG2
time budget added to sat before adding it to the tree; compensates for the fact that
the liq price moves closer to the current price over time.


```solidity
uint256 internal constant SATURATION_TIME_BUFFER_IN_MAG2 = 101;
```


### START_SATURATION_PENALTY_RATIO_IN_MAG2
percentage of max sat per tranche where penalization begins


```solidity
uint256 internal constant START_SATURATION_PENALTY_RATIO_IN_MAG2 = 85;
```


### MAX_INITIAL_SATURATION_MAG2
maximum initial saturation percentage when adding a new position


```solidity
uint256 internal constant MAX_INITIAL_SATURATION_MAG2 = 90;
```


### EXPECTED_SATURATION_LTV_MAG2_TIMES_SAT_BUFFER_SQUARED
$\mathrm{EXPECTED\_SATURATION\_LTV\_MAG2}\cdot
\mathrm{SATURATION\_TIME\_BUFFER\_IN\_MAG2}^{2}$, a constant used in calculations.


```solidity
uint256 internal constant EXPECTED_SATURATION_LTV_MAG2_TIMES_SAT_BUFFER_SQUARED = 867_085;
```


### EXPECTED_SATURATION_LTV_PLUS_ONE_MAG2
$\mathrm{EXPECTED\_SATURATION\_LTV\_MAG2}+100$, a constant used in calculations.


```solidity
uint256 internal constant EXPECTED_SATURATION_LTV_PLUS_ONE_MAG2 = 185;
```


### SAT_RESET_FOR_STRADDLE_SLOPE_BIPS
Slope for calculating premium when resetting saturation for straddle positions
where $$L^2 < X \cdot Y$$ transitions to $$L^2 > X \cdot Y$$. Applied to
$$(L^{2} - X \cdot Y) / (X \cdot Y)$$ to produce `premiumBips`. Matches the
Desmos coefficient $$\frac{BIPS}{10} \cdot 100 = 100000$$. At
$$L^{2} = 1.02 \cdot X \cdot Y$$ the raw premium evaluates to
`MAX_SAT_RESET_FOR_STRADDLE_PREMIUM_BIPS`; past that point the cap engages.


```solidity
uint256 internal constant SAT_RESET_FOR_STRADDLE_SLOPE_BIPS = 100_000;
```


### MAX_SAT_RESET_FOR_STRADDLE_PREMIUM_BIPS
Maximum premium when resetting saturation for zero-to-positive straddle positions.


```solidity
uint256 internal constant MAX_SAT_RESET_FOR_STRADDLE_PREMIUM_BIPS = 2000;
```


### SAT_CHANGE_OF_BASE_Q128
a constant used to change the log base from the tick math base to the saturation to
leaf base.


```solidity
uint256 private constant SAT_CHANGE_OF_BASE_Q128 = 0xa39713406ef781154a9e682c2331a7c03;
```


### SAT_CHANGE_OF_BASE_TIMES_SHIFT
a constant used to shift when changing the base from tick math base to the
saturation leaf base.


```solidity
uint256 private constant SAT_CHANGE_OF_BASE_TIMES_SHIFT = 0xb3f2fb93ad437464387b0c308d1d05537;
```


### TICK_OFFSET
tick offset added to ensure leaf calculation starts from 0 at the lowest leaf


```solidity
int16 private constant TICK_OFFSET = 1112;
```


### LOWEST_POSSIBLE_IN_PENALTY
The lowest possible saturation is always in penalty:
```math
\frac{MAX\_ASSETS\cdot START\_SATURATION\_PENALTY\_RATIO\_IN\_MAG2}
{\mathrm{TICKS\_PER\_TRANCHE}}
```


```solidity
uint256 internal constant LOWEST_POSSIBLE_IN_PENALTY = 0xd9999999999999999999999999999999;
```


### MIN_LIQ_TO_REACH_PENALTY
The minimum liquidity to reach the possibility of being in penalty:
```math
\frac{MINIMUM\_LIQUIDITY\cdot START\_SATURATION\_PENALTY\_RATIO\_IN\_MAG2}
{\mathrm{TICKS\_PER\_TRANCHE}}
```


```solidity
uint256 private constant MIN_LIQ_TO_REACH_PENALTY = 850;
```


### INT_ONE
Constant number one as an int type. Used for rounding or iterating direction.


```solidity
int256 private constant INT_ONE = 1;
```


### INT_NEGATIVE_ONE
Constant number negative one. Used for rounding or iterating direction.


```solidity
int256 private constant INT_NEGATIVE_ONE = -1;
```


### INT_ZERO
Constant number zero as an int type. Used for rounding or iterating direction.


```solidity
int256 private constant INT_ZERO = 0;
```


### LEVELS_WITHOUT_LEAFS
Tree leafs are on level LEVELS_WITHOUT_LEAFS; root is level 0


```solidity
uint256 internal constant LEVELS_WITHOUT_LEAFS = 3;
```


### LOWEST_LEVEL_INDEX
for convenience, since used a lot, ==LEVELS_WITHOUT_LEAFS - 1


```solidity
uint256 internal constant LOWEST_LEVEL_INDEX = 2;
```


### LEAFS
Number of leaves: $2^{\mathrm{LEAFS\_IN\_BITS}}$.


```solidity
uint256 internal constant LEAFS = 4096;
```


### CHILDREN_PER_NODE
Number of children per node: $2^4$.


```solidity
uint256 internal constant CHILDREN_PER_NODE = 16;
```


### CHILDREN_AT_THIRD_LEVEL
Number of children at the third level: $2^{2\cdot 4}$.


```solidity
uint256 private constant CHILDREN_AT_THIRD_LEVEL = 256;
```


### TICKS_PER_TRANCHE
Number of ticks grouped into one saturation tranche.
If $b=\frac{2^9}{2^9-1}$ is the tick base, then the tranche base is:
```math
B=b^{\mathrm{TICKS\_PER\_TRANCHE}}
```
This is an `int256` only to avoid casts below.


```solidity
int256 internal constant TICKS_PER_TRANCHE = 25;
```


### TRANCHE_BASE_OVER_BASE_MINUS_ONE_Q72
for convenience, used to determine max sat per tranche to not cross in liq swap:
$$\frac{B}{B-1}$$


```solidity
uint256 constant TRANCHE_BASE_OVER_BASE_MINUS_ONE_Q72 = 0x5a19b9039a07efd7b39;
```


### MIN_TRANCHE
`TickMath.MIN_TICK / TICKS_PER_TRANCHE - 1;` // -1 to floor


```solidity
int256 internal constant MIN_TRANCHE = -795;
```


### MAX_TRANCHE
`TickMath.MAX_TICK / TICKS_PER_TRANCHE;`


```solidity
int256 internal constant MAX_TRANCHE = 794;
```


### FIELD_NODE_MASK
constants for bit reading and writing in nodes.
`type(uint256).max >> (TOTAL_BITS - FIELD_BITS);`


```solidity
uint256 private constant FIELD_NODE_MASK = 0xffff;
```


### SATURATION_MAX_BUFFER_TRANCHES
Buffer space (in tranches) allowed above the highest used tranche before hitting
maxLeaf limit


```solidity
uint8 internal constant SATURATION_MAX_BUFFER_TRANCHES = 3;
```


### QUARTER_OF_MAG2
Twenty-five percent magnitude of two.


```solidity
uint256 private constant QUARTER_OF_MAG2 = 25;
```


### QUARTER_MINUS_ONE
Twenty-five percent minus one magnitude of two.


```solidity
uint256 private constant QUARTER_MINUS_ONE = 24;
```


### NUMBER_OF_QUARTERS
quarters per tranche.


```solidity
uint256 private constant NUMBER_OF_QUARTERS = 4;
```


### TWO_Q72
$2\cdot 2^{72}$, used in the saturation formula.


```solidity
uint256 private constant TWO_Q72 = 0x2000000000000000000;
```


### FOUR_Q144
$4\cdot 2^{128}$, needed in the saturation quadratic formula.


```solidity
uint256 private constant FOUR_Q144 = 0x4000000000000000000000000000000000000;
```


### MAG4_TIMES_Q72
$MAG4\cdot Q72$ constant needed in the formula.


```solidity
uint256 private constant MAG4_TIMES_Q72 = 0x2710000000000000000000;
```


### B_SQUARED_Q72_MINUS_ONE
$b^2\cdot Q72-1$ used to round up results of `TickMath.getTickAtPrice()`.


```solidity
uint256 private constant B_SQUARED_Q72_MINUS_ONE = 0x10100c08050301c1008;
```


### Q183
A large number that will not overflow when multiplied by `B_SQUARED_Q72_MINUS_ONE`
$$\left\lfloor \frac{ 2^{ 256 } }{ B\_SQUARED\_Q72\_MINUS\_ONE } \right\rfloor$$


```solidity
uint256 private constant Q183 = 0x8000000000000000000000000000000000000000000000;
```


### TICKS_PER_TRANCHE_MAG2
$\mathrm{TICKS\_PER\_TRANCHE}\cdot MAG2$, used for calculating available liquidity.


```solidity
uint256 private constant TICKS_PER_TRANCHE_MAG2 = 2500;
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

update the borrow position of an account and potentially check (and revert) if the
resulting sat is too high

*run accruePenalties before running this function*


```solidity
function update(
    SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    address account,
    uint256 userSaturationRatioMAG2,
    bool skipMinOrMaxTickCheck
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satStruct`|`SaturationStruct`| main data struct|
|`inputParams`|`Validation.InputParams`| contains the position and pair params, like account borrows/deposits, current price and active liquidity|
|`account`|`address`| for which is position is being updated|
|`userSaturationRatioMAG2`|`uint256`||
|`skipMinOrMaxTickCheck`|`bool`||


### updateTreeGivenAccountTrancheAndSat

internal update that removes the account from the tree (if it exists) from its prev
position and adds it to its new position


```solidity
function updateTreeGivenAccountTrancheAndSat(
    Tree storage tree,
    SaturationPair memory newSaturation,
    address account,
    int256 newEndOfLiquidationInTicks,
    uint256 activeLiquidityInLAssets,
    int256 minOrMaxTick,
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
|`minOrMaxTick`|`int256`||
|`userSaturationRatioMAG2`|`uint256`||


### removeSatFromTranche

remove sat from tree, for each tranche in a loop that could hold sat for the account


```solidity
function removeSatFromTranche(Tree storage tree, address account) internal returns (bool highestSetLeafRemoved);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`|whose position is being considered|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`highestSetLeafRemoved`|`bool`| flag indicating whether we removed sat from the highest leaf xor not|


### removeSatFromTrancheStateUpdates

depending on old and new leaf of the tranche, update the sats, fields and penalties
of the tree


```solidity
function removeSatFromTrancheStateUpdates(
    Tree storage tree,
    SaturationPair memory oldAccountSaturationInTranche,
    int256 tranche,
    uint256 oldLeaf
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`oldAccountSaturationInTranche`|`SaturationPair`|account sat|
|`tranche`|`int256`| under consideration|
|`oldLeaf`|`uint256`|where tranche was located before this sat removal|


### addSatToTranche

add sat to tree, for each tranche in a loop as needed. we add to each tranche as
much as it can bear.
Saturation Distribution Logic
This function distributes debt across multiple tranches, maintaining two types of
saturation:
1. satInLAssets: The absolute debt amount in L assets (should remain constant total)
2. satRelativeToL: The relative saturation that depends on the tranche's price level
As we move between tranches (different price levels), the same absolute debt
translates to different relative saturations due to the price-dependent formula.
conceptually satInLAssets should not be scaled as it represents actual debt that
doesn't change with price.
The formula applied here, derived in the introduction, is,
```math
\begin{align*}
T_{sat} &=
s_0
+ \frac{\sum_{i=1}^{n-1} s_i \cdot B^{i}}{b^{t_e-T_0}}
+ \frac{B^n \cdot  s_n}{b^{t_e-T_0}}
\\
\frac{(T_{sat} - s_0)b^{t_e-T_0}}{B} - s_1 &=
\left(\sum_{i=2}^{n-1} s_i \cdot B^{i-1} \right)
+ B^{n-1} \cdot s_n
\\
\frac{\frac{(T_{sat} - s_0)b^{t_e-T_0}}{B} - s_1 }{ B } -s_2 &=
\left(\sum_{i=2}^{n-1} s_i \cdot B^{i-2} \right)
+ B^{n-2} \cdot s_n
\end{align*}
```


```solidity
function addSatToTranche(
    Tree storage tree,
    address account,
    int256 newEndOfLiquidationInTicks,
    SaturationPair memory newSaturation,
    uint256 activeLiquidityInLAssets,
    uint256 userSaturationRatioMAG2,
    int256 minOrMaxTick
) internal returns (bool highestSetLeafAdded);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`|whose position is being considered|
|`newEndOfLiquidationInTicks`|`int256`|the new tranche of the account location in MAG2|
|`newSaturation`|`SaturationPair`|the new sat of the account, in units of LAssets (absolute) and relative to active liquidity|
|`activeLiquidityInLAssets`|`uint256`|of the pair|
|`userSaturationRatioMAG2`|`uint256`||
|`minOrMaxTick`|`int256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`highestSetLeafAdded`|`bool`|flag indicating whether we removed sat from the highest leaf xor not|


### getUsableTicksAndLastTranche

get the number of ticks in the tranche that can be used based on where the
liquidation ends.

*we approximate the this calculation using a percentage of ticks available.*


```solidity
function getUsableTicksAndLastTranche(
    int256 endOfLiquidationTick,
    bool netDebtX
) internal pure returns (uint256 usableTicks, int256 lastTranche);
```

### restrictUsableTicksForMinOrMaxTick

when the min or max tick bounding our price estimate is reached while allocating
saturation, we limit how much of that tranche can be used so that we don't exceed the
liquidation capacity of the tranche closest to the price with the given position.


```solidity
function restrictUsableTicksForMinOrMaxTick(
    uint256 initialUsableTicks,
    int256 nextTranche,
    int256 minOrMaxTick,
    bool netDebtX
) internal pure returns (uint256 usableTicks);
```

### getAddSatToTrancheStateUpdatesParams

helper function for adding saturation to appropriate tranches for the given
parameters.


```solidity
function getAddSatToTrancheStateUpdatesParams(
    Tree storage tree,
    address account,
    int256 tranche,
    SaturationPair memory newSaturation,
    uint256 activeLiquidityInLAssets,
    uint256 userSaturationRatioMAG2,
    uint256 usableTicks
) internal view returns (AddSatToTrancheStateUpdatesStruct memory addSatToTrancheStateUpdatesParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`|whose position is being considered|
|`tranche`|`int256`|under consideration|
|`newSaturation`|`SaturationPair`|the saturation values to add|
|`activeLiquidityInLAssets`|`uint256`|of the pair|
|`userSaturationRatioMAG2`|`uint256`|user saturation ratio|
|`usableTicks`|`uint256`|number of ticks available to use|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`addSatToTrancheStateUpdatesParams`|`AddSatToTrancheStateUpdatesStruct`|the struct with required params to|


### addSatToTrancheStateUpdates

depending on old and new leaf of the tranche, update the sats, fields and penalties
of the tree


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
function addSatUpTheTree(Tree storage tree, uint128 satInLAssets, bool add) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`satInLAssets`|`uint128`| sat to add to the current node, usually uint112, int to allow subtracting sat up the tree|
|`add`|`bool`||


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


### getEffectivePenalty

get effective penalty for a tranche, combining leaf penalty and tranche adjustment.
When a tranche moves between leaves, the adjustment bridges the gap between the old and new
leaf accumulators so that existing accounts' onset values remain valid.

*Invariant: `leafPen + adjustment >= 0` always holds. Within a single tranche
lifecycle, moves preserve continuity of `effective` (the move logic adds the same delta
to `adjustment` that it subtracts from `leafPen`), so `effective` only ever grows from
its initial non-negative value. The `delete` in `removeSatFromTrancheStateUpdates` resets
the adjustment when a tranche empties so each new lifecycle starts from `adj = 0`.*


```solidity
function getEffectivePenalty(
    Tree storage tree,
    uint256 leaf,
    int256 tranche
) private view returns (uint256 effectivePenalty);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from|
|`leaf`|`uint256`| index (0 based) of the leaf containing the tranche|
|`tranche`|`int256`| the tranche identifier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`effectivePenalty`|`uint256`| the effective cumulative penalty for this tranche|


### accrueAccountPenalty

calc penalty owed by account for repay, total over all the tranches that might
contain this accounts' sat


```solidity
function accrueAccountPenalty(Tree storage tree, address account) internal returns (uint256 penaltyInBorrowLShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`account`|`address`| whose position is being considered|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint256`| the penalty owed by the account|


### trancheDirection

move in the appropriate direction when iterating.


```solidity
function trancheDirection(
    bool netDebtX
) private pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`netDebtX`|`bool`|direction flag|


### calcNewAccountPenalty

calc penalty owed by account for repay, total over all the tranches that might
contain this accounts' sat


```solidity
function calcNewAccountPenalty(
    Tree storage tree,
    uint256 leaf,
    uint256 accountSatInTrancheInLAssets,
    address account,
    uint256 trancheIndex,
    int256 tranche
) private view returns (uint256 penaltyInBorrowLShares, uint256 accountTreePenaltyInBorrowLSharesPerSatInQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`leaf`|`uint256`| the leaf that the tranche belongs to|
|`accountSatInTrancheInLAssets`|`uint256`| the sat of the account in the tranche|
|`account`|`address`| whose position is being considered|
|`trancheIndex`|`uint256`| the index of the tranche that is being added to|
|`tranche`|`int256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint256`| the penalty owed by the account|
|`accountTreePenaltyInBorrowLSharesPerSatInQ72`|`uint256`| the penalty owed by the account in the tranche|


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
|`account`|`address`| whose position is being considered|
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
|`account`|`address`| whose position is being considered|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyInBorrowLShares`|`uint112`| the penalty owed by the account|


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

recursive function to find the highest set leaf starting from a leaf, first
upwards, until a set field is found, then downwards to find the best set leaf


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

Calc sqrt price at which positions' LTV would reach LTV_MAX. Given the net $$L$$,
$$X$$, and Y, we define the the sqrt price $$s_p$$ at which the position would be at the
expected loan to value of liquidation $$k$$, then the following formulas are what we are
calculating,
```math
\begin{align}
k &=
\begin{cases}
-\frac{L + \frac{X}{s_p}}{L + Y \cdot s_p}
\text{ if } L+ \frac{X}{s_p} < 0
\\
-\frac{L + Y \cdot s_p}{L + \frac{X}{s_p}}
\text{ if } L + Y \cdot s_p < 0
\end{cases}
\\
s_p &=
\begin{cases}
\frac{
-(k+1)L +
\sqrt{\left((k+1)L\right)^2 - 4 \left( k\cdot Y \right) \left(X \right)}
}{
2 \cdot k \cdot Y
}
\text{ if } L + \frac{X}{s_p} < 0
\\
\frac{
-(k+1)L -
\sqrt{((k+1)L)^2-4(Y)(k\cdot X)}
}{
2\cdot k
}
\text{ if } L + Y \cdot s_p < 0
\end{cases}
\end{align}
```
The equation gives four solutions due to the plus minus of the radical, but we choose the
direction due to the conditions. When we have a net debt of x, $$L + \frac{X}{s_p} < 0$$,
the loan to value will be increasing as the price decreases, thus we choose the positive
value of the radical. For the net debt of y, $$L + Y \cdot s_p < 0$$ we have the loan to
value increasing as the price increases, thus we use the negative value of the radical.

Output guarantees $$0 \le liqSqrtPriceXInQ72 \le uint256(type(uint56).max) << 72$$
(fuzz tested and logic)

Outside above range, outputs 0 (essentially no liq)

Does not revert if `LTV_MAX < LTV`, rather `LTV_MAX < LTV` causing liq points are
returned as 0, as if they do not exist, based on the assumption `LTV \le LTV_MAX`


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

calc liq price when the quadratic has all 3 terms, netY,netL,netX, i.e. X, Y, L are
all significant


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

*the algorithm here matches that of `addSatToTranche()`, but accumulates the total
saturation to compare it to what is needed. If the allocated total saturation is less than
what is needed, we return the ratio to help determine the saturation adjustment premium.*


```solidity
function calcSatChangeRatioBips(
    SaturationStruct storage satStruct,
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ72,
    uint256 liqSqrtPriceInYInQ72,
    address account,
    uint256 desiredSaturationMAG2
) internal view returns (uint256 ratioBips);
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
|`ratioBips`|`uint256`|The ratio representing the change in saturation for account.|


### calcTreeRatioBips

*Per-tree ratio computation extracted from `calcSatChangeRatioBips`.
Stored `satPairs[i].satRelativeToL` lives in tranche-i units
(= 1/B^i of tranche-0 units, modulo the partial first-tranche adjustment).
`scaleAndSumSaturation` converts each stored sat back to tranche-0 units, so
the old and new saturation totals are compared in the same unit system.*


```solidity
function calcTreeRatioBips(
    SaturationPair[] storage satPairs,
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ72,
    uint256 liqSqrtPriceInYInQ72,
    uint256 desiredSaturationMAG2,
    bool netDebtX
) private view returns (uint256 ratioBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satPairs`|`SaturationPair[]`|Storage array of per-tranche saturation pairs for the tree being evaluated.|
|`inputParams`|`Validation.InputParams`|User asset balances and pool state used to compute the new saturation.|
|`liqSqrtPriceInXInQ72`|`uint256`|Liquidation sqrt price (upper root) in Q72, for the netDebtX side.|
|`liqSqrtPriceInYInQ72`|`uint256`|Liquidation sqrt price (lower root) in Q72, for the netDebtY side.|
|`desiredSaturationMAG2`|`uint256`|Target saturation level in MAG2 units used to project the new sat.|
|`netDebtX`|`bool`|True when evaluating the netDebtX tree; false for the netDebtY tree.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ratioBips`|`uint256`|Growth ratio in BIPS of (old + remaining) / old saturation for this tree; zero when the new saturation does not exceed the absorbed old saturation.|


### scaleAndSumSaturation

*Sum stored per-tranche saturation in tranche-0 units.
`satPairs[i].satRelativeToL` is stored in tranche-`i` units (= 1/B^i of tranche-0 units,
modulo the partial first-tranche adjustment from `calculateEndOfLiquidationAdjustment`).
Summing them directly would mix units across tranches and undercount the total. The loop
tracks an inverse Q72 scale factor `bScaleQ72` that rescales each stored sat back into
tranche-0 units before accumulation; the first iteration also folds in the partial
first-tranche `endOfLiquidationAdjustmentQ72`, which then resets to `Q72`.*


```solidity
function scaleAndSumSaturation(
    SaturationPair[] storage satPairs,
    int256 endOfLiquidationInTicks,
    bool netDebtX
) internal view returns (uint256 oldSatInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satPairs`|`SaturationPair[]`|Storage array of per-tranche saturation pairs.|
|`endOfLiquidationInTicks`|`int256`|Tick at which liquidation ends (sets the first-tranche offset).|
|`netDebtX`|`bool`|True when summing the netDebtX tree; false for the netDebtY tree.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`oldSatInLAssets`|`uint256`|Total saturation in tranche-0 (L-asset) units.|


### calcStraddlePremiumRatioBips

Calculate the ratio bips for a straddle position transitioning from zero to positive saturation.
Let $$S$$ be `SAT_RESET_FOR_STRADDLE_SLOPE_BIPS`, the slope that controls how quickly the
straddle reset premium increases once $$L^2 > X \cdot Y$$.
Let $$P_{max}$$ be `MAX_SAT_RESET_FOR_STRADDLE_PREMIUM_BIPS`, the maximum premium allowed for
this zero-to-positive straddle reset path.
```math
premiumBips = \min\left(
P_{max},
\left\lceil\frac{(L^2 - X \cdot Y) \cdot S}{X \cdot Y}\right\rceil
\right)
```
The ratioBips encodes premium for downstream consumption:
```math
\text{ratioBips} = \text{premiumBips} \cdot \text{MAG1} + \text{BIPS}
```
and premium is recovered as: `(ratioBips - BIPS) / MAG1`.


```solidity
function calcStraddlePremiumRatioBips(
    uint256[6] memory userAssets
) private pure returns (uint256 ratioBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`|The user's position parameters.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ratioBips`|`uint256`|The ratio in bips, or 0 if $$L^2 <= X \cdot Y$$.|


### calculateEndOfLiquidationAdjustment

a helper function to calculate the one time adjustment for the offset of the end
of the liquidation relative to the the boundary of the tranches.

*This formula is described in the introduction.*


```solidity
function calculateEndOfLiquidationAdjustment(
    int256 endOfLiquidationInTicks,
    bool netDebtX
) internal pure returns (uint256 endOfLiquidationSqrtPriceAdjustment);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`endOfLiquidationInTicks`|`int256`| the tick at which liquidation should end by.|
|`netDebtX`|`bool`| whether this is a net X debt path.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`endOfLiquidationSqrtPriceAdjustment`|`uint256`| the sqrt price adjustment required to be applied.|


### calcTotalSatAfterLeafInclusive

calc total sat of all accounts/tranches/leafs higher (and same) as the threshold

*iterate through leaves directly since penalty range is fixed (~8 leaves from 85% to
95% sat)*


```solidity
function calcTotalSatAfterLeafInclusive(
    Tree storage tree,
    uint256 thresholdLeaf
) internal view returns (uint128 satInPenaltyInLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tree`|`Tree`|that is being read from or written to|
|`thresholdLeaf`|`uint256`|leaf to start adding sat from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satInPenaltyInLAssets`|`uint128`|total sat of all accounts with tranche in a leaf from at least `thresholdLeaf` (absolute saturation)|


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
|`leaf`|`uint256`| resulting leaf from 0 to $2^{12}-1$|


### calcSatAvailableToAddToTranche

Calculates how much saturation can be added to one tranche while keeping it healthy.
The target saturation for the usable portion of the tranche is:
```math
trancheSat=\left\lceil
\frac{
activeLiquidityInLAssets\cdot userSaturationRatioMAG2\cdot usableTicks
}{
\mathrm{TICKS\_PER\_TRANCHE}\cdot MAG2
}
\right\rceil
```
Let `newSat` be `newSaturationRelativeToLAssets` and `currentSat` be
`currentTrancheSatRelativeToLAssets`. The returned amount is:
```math
satAvailable=\min\left(newSat,\max(trancheSat,currentSat)-currentSat\right)
```
The returned target capacity is:
```math
target=\min(trancheSat,newSat)
```
Therefore `target >= satAvailable` in every branch, and `newSat >= target`.


```solidity
function calcSatAvailableToAddToTranche(
    uint256 activeLiquidityInLAssets,
    uint128 newSaturationRelativeToLAssets,
    uint128 currentTrancheSatRelativeToLAssets,
    uint256 userSaturationRatioMAG2,
    uint256 usableTicks
) internal pure returns (uint128 satAvailableToAddRelativeToLAssets, uint256 targetCapacityRelativeToLAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`activeLiquidityInLAssets`|`uint256`|Active liquidity of the pair.|
|`newSaturationRelativeToLAssets`|`uint128`|The saturation that should be added.|
|`currentTrancheSatRelativeToLAssets`|`uint128`|The saturation already held by the tranche.|
|`userSaturationRatioMAG2`|`uint256`|The user's desired saturation ratio.|
|`usableTicks`|`uint256`|The number of usable ticks within the tranche, restricted by either the end of liquidation or the min/max tick.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`satAvailableToAddRelativeToLAssets`|`uint128`|Amount that can be added after accounting for current tranche saturation.|
|`targetCapacityRelativeToLAssets`|`uint256`|Target tranche capacity after limiting by the new saturation amount.|


### calcLastTickAndSaturation

calc the tick at which the best case liquidation would end and the saturation of
the last tranche containing that tick. Not all the saturation may fit into that tranche,
but we calculate it as if it will which means that adjustments to the saturation will need
to be made if it doesn't fit when placing it into the tree.


```solidity
function calcLastTickAndSaturation(
    Validation.InputParams memory inputParams,
    uint256 netXLiqSqrtPriceInXInQ72,
    uint256 netYLiqSqrtPriceInXInQ72,
    uint256 desiredThresholdMag2,
    bool netDebtX,
    bool skipMinOrMaxTickCheck
) internal pure returns (SaturationPair memory saturation, int256 endOfLiquidationInTicks, int256 currentTickLimit);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| the input params|
|`netXLiqSqrtPriceInXInQ72`|`uint256`| the midpoint of liquidation sqrt price of debt X in X/Y|
|`netYLiqSqrtPriceInXInQ72`|`uint256`| the midpoint of liquidation sqrt price of debt Y in X/Y|
|`desiredThresholdMag2`|`uint256`| the desired threshold|
|`netDebtX`|`bool`| whether the net debt is X or Y|
|`skipMinOrMaxTickCheck`|`bool`|when borrowing liquidity, the two liquidations will start facing opposite ways and the current price can only be on one side. When this happens, only one side's liquidation is valid, the other could not occur without the price moving through the valid liquidation. We also skip this check during `calcSatChangeRatioBips()` as we don't want to block liquidations.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`saturation`|`SaturationPair`|the saturation of the tranche|
|`endOfLiquidationInTicks`|`int256`| the point at which the liquidation would end.|
|`currentTickLimit`|`int256`|The point at which the liquidation can not start before due to the current price.|


### calculateStartAndEndOfLiquidationPriceQ128

Convert from sqrtPrice by squaring, but we don't square the span because we only want
to shift by half of the span to move from the middle of the liquidation to the end.
Division prior to multiplication to avoid overflow since sqrtPriceQ72 is is 128 bits.


```solidity
function calculateStartAndEndOfLiquidationPriceQ128(
    uint256 liqSqrtPriceQ72,
    uint256 sqrtPriceSpanQ72,
    bool netDebtX
) internal pure returns (uint256 startOfLiquidationPriceQ128, uint256 endOfLiquidationPriceQ128);
```

### liqPriceDividedBySpan


```solidity
function liqPriceDividedBySpan(
    uint256 liqPriceQ144,
    uint256 sqrtPriceSpanQ72
) private pure returns (uint256 priceQ128);
```

### liqPriceMultipliedBySpan


```solidity
function liqPriceMultipliedBySpan(
    uint256 liqPriceQ144,
    uint256 sqrtPriceSpanQ72
) private pure returns (uint256 priceQ128);
```

### calculateNetDebtAndSpan

calc net debt and span


```solidity
function calculateNetDebtAndSpan(
    Validation.InputParams memory inputParams,
    uint256 liqSqrtPriceInXInQ72,
    uint256 desiredThresholdMag2,
    bool netDebtX
) internal pure returns (uint256 netDebtXorYAssets, uint256 netDebtLAssets, uint256 minSqrtPriceSpanQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`| the input params|
|`liqSqrtPriceInXInQ72`|`uint256`||
|`desiredThresholdMag2`|`uint256`| the desired threshold|
|`netDebtX`|`bool`| whether the net debt is X or Y|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXorYAssets`|`uint256`| the net debt|
|`netDebtLAssets`|`uint256`| the net debt in L assets|
|`minSqrtPriceSpanQ72`|`uint256`| the tranche span in sqrtPrice|


### calculateSaturation

calculate the relative saturation of the position at the end of liquidation.
Since we place saturation in tranches starting at the tick where the liquidation would
end and moving forward to the start of liquidation, this calculates the entire saturation
as if it would fit in the last tranche, we then we will need to adjust the saturation each
time we move forward a tranche to the next tranche by dividing by a factor of $$B$$ when
we allocate the saturation later. The equation here is slightly different than the
equation in our description since we multiply by a factor of $$B$$ for each tranche we
move back from the start of liquidation tick. Thus here we use, where $$tSpan$$ is the
number of tranches we need to move back,
```math
\begin{equation}T_{sat} =
\begin{cases}
\Large\frac{debt}{b^{t_e}(B-1)}
&\text{ when debt is in X asset }
\\
\Large\frac{debt \cdot b^{t_e}}{B-1}
&\text{ otherwise }
\end{cases}
\end{equation}
```
As we iterate through tranches, we divide by a factor of $$B$$ such that when we reach the
final tranche, our equation from the start applies.
Note that we also magnify the debt by the `SATURATION_TIME_BUFFER_IN_MAG2` to account for
the potential growth that will occur over time due to interest. This allows for our
estimate of saturation to be static in spite of the dynamic impact of interest.


```solidity
function calculateSaturation(
    uint256 netDebtXOrYAssets,
    uint256 endOfLiquidationSqrtPriceQ72,
    bool netDebtX
) internal pure returns (uint128 saturation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`netDebtXOrYAssets`|`uint256`| the net debt in X or Y assets.|
|`endOfLiquidationSqrtPriceQ72`|`uint256`|the tick at which the liquidation ends.|
|`netDebtX`|`bool`| whether the debt is net in X or Y assets|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`saturation`|`uint128`| the saturation relative to active liquidity assets.|


### calculateMinSqrtPriceSpanQ72


```solidity
function calculateMinSqrtPriceSpanQ72(
    uint256 collateral,
    uint256 debt,
    uint256 activeLiquidityAssets,
    uint256 desiredThresholdMag2
) internal pure returns (uint256 sqrtPriceSpanQ72);
```

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

Calculates the penalty scaling factor based on current borrow utilization and
saturation
This implements the penalty rate function
Formula:
```math
((1 - u_0) \cdot f_{interestPerSecond}(u_1) \cdot allAssetsDepositL) / (WAD
\cdot satInPenaltyInLAssets)
```
Where,
```math
u_1 = (0.90 - (1 - u_0) \cdot (0.95 - u_s) / 0.95)
```


```solidity
function calcSaturationPenaltyRatePerSecondInWads(
    uint256 currentBorrowUtilizationInWad,
    uint256 saturationUtilizationInWad,
    uint128 satInPenaltyInLAssets,
    uint256 allAssetsDepositL
) internal pure returns (uint256 penaltyRatePerSecondInWads);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentBorrowUtilizationInWad`|`uint256`|Current borrow utilization of L (u_0)|
|`saturationUtilizationInWad`|`uint256`|Current saturation utilization (u_s)|
|`satInPenaltyInLAssets`|`uint128`|The saturation in L assets in the penalty|
|`allAssetsDepositL`|`uint256`|The total assets deposited in L|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`penaltyRatePerSecondInWads`|`uint256`|The penalty rate per second in WADs|


## Errors
### MaxTrancheOverSaturated
if the largest sat in the trees is too large


```solidity
error MaxTrancheOverSaturated();
```

### LiquidationPassesMinOrMaxTick
raised if the start of liquidation would occur on the wrong side of the min or max
tick price from the GeometricTWAP.


```solidity
error LiquidationPassesMinOrMaxTick();
```

### SaturationReachesMinOrMaxTick
raised if the the available saturation is not sufficient to keep the start of
liquidation from reaching the wrong side of the min or max tick price from the
GeometricTWAP.


```solidity
error SaturationReachesMinOrMaxTick();
```

## Structs
### SaturationStruct
final structure containing all the storage data


```solidity
struct SaturationStruct {
    Tree netXTree;
    Tree netYTree;
    uint16 maxLeaf;
}
```

### Tree
the main storage type of tree struct within the `SaturationStruct`.


```solidity
struct Tree {
    bool netX;
    uint16 highestSetLeaf;
    uint128 totalSatInLAssets;
    uint256[][LEVELS_WITHOUT_LEAFS] nodes;
    Leaf[LEAFS] leafs;
    mapping(int16 => uint16) trancheToLeaf;
    mapping(int16 => SaturationPair) trancheToSaturation;
    mapping(address => Account) accountData;
    mapping(int16 => int256) tranchePenaltyAdjustment;
}
```

### Leaf
a leaf contains multiple tranches and contains the total sat and penalty for the leaf


```solidity
struct Leaf {
    Uint16Set.Set tranches;
    SaturationPair leafSatPair;
    uint256 penaltyInBorrowLSharesPerSatInQ72;
}
```

### Account
basic data per account associated with an address stored in the `Tree` struct in a
map as the value associated with the owners address as the key.


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
used in memory to avoid stack overflow in `calcLiqSqrtPriceQ72()`.


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
used in memory to avoid stack overflow in `addSatToTranche()`.


```solidity
struct AddSatToTrancheStateUpdatesStruct {
    int256 tranche;
    uint256 newLeaf;
    SaturationPair oldTrancheSaturation;
    SaturationPair newTrancheSaturation;
    SaturationPair satAvailableToAdd;
    uint256 targetCapacityRelativeToLAssets;
    address account;
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

