# PartialLiquidations
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/539fb3333b1a5bdb57027ffabb33730a0eae663d/contracts/libraries/PartialLiquidations.sol)

We allow liquidations to happen in parts when the position is spread across more than
one tranche. These partial liquidations allow the liquidator to specify how many tranches they
are liquidating based on how much they are repaying. Smaller slices start with the tranche range
closest to the current price and move outward, so the slice reaches expected LTV before the full
position on the same debt side does. In most cases, one tranche will be liquidated at one time,
but in some cases, a sliver of liquidity in the first tranche may not be worth the cost to
liquidate until it and the next tranche have become profitable to liquidate.
Once we determine the number of tranches to liquidate, we build the liquidated slice from the
debt side first. L uses a weight because both deposit and borrow L can be included together;
the opposing side is then solved directly so the slice lands on the expected liquidation LTV.
A partial liquidation splits the signed position into the liquidated slice and the remaining
position:
```math
P_0=P_\Delta+P_1,
\qquad
P_0=[L_0,X_0,Y_0],
\qquad
P_\Delta=[L_\Delta,X_\Delta,Y_\Delta]
```
The slice must preserve component signs, must not exceed the original component magnitudes, and
must have exact expected liquidation LTV at the slice square-root price `s_delta`. The whole
position and the remaining position do not need to have the same LTV as the liquidated slice.
Signed components are net deposits minus borrows:
```math
\begin{align}
L_0 &= depositL - borrowL \\
X_0 &= depositX - borrowX \\
Y_0 &= depositY - borrowY
\end{align}
```
The slice is constructed from the debt-side component first. Throughout this library, `s` is
a square-root price, not a price. At square-root price `s`, X is measured in L as `X / s` and
Y is measured in L as `Y * s`.
Let `k` be the unscaled expected liquidation LTV:
```math
k=EXPECTED\_SATURATION\_LTV
```
In code, `k` is represented by `EXPECTED_SATURATION_LTV_MAG2 / MAG2`.
In signed slice notation, repaid debt components are negative and seized collateral components
are positive. For net debt X, the exact-LTV slice condition is:
```math
k=\dfrac{-X_\Delta/s_\Delta-L_\Delta}{L_\Delta+Y_\Delta s_\Delta}
```
The net debt Y equations are symmetric:
```math
k=\dfrac{-Y_\Delta s_\Delta-L_\Delta}{L_\Delta+X_\Delta/s_\Delta}
```


## State Variables
### MAG2_INT

```solidity
int256 internal constant MAG2_INT = int256(MAG2);
```


## Functions
### calculatePartialLiquidation

Calculates the partial liquidation slice for the tranches covered by the repayment.

*Returns the full user asset array when every tranche is included. Returns the zero array
when no L-denominated debt is repaid. The tranche count is chosen from absolute
`satInLAssets`, while the slice geometry uses the corresponding relative saturation values.*


```solidity
function calculatePartialLiquidation(
    Saturation.SaturationPair[] memory satPairPerTranche,
    int16 lastTranche,
    uint256[6] memory userAssets,
    uint256 activeLiquidityAssets,
    uint256 netRepaidLAssets,
    uint256 netSeizedLAssets,
    bool netDebtX
) internal pure returns (uint256[6] memory liquidation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`satPairPerTranche`|`Saturation.SaturationPair[]`|Saturation entries for the borrower, ordered from the end of liquidation toward the start of liquidation.|
|`lastTranche`|`int16`|Last tranche occupied by the borrower in the liquidation direction.|
|`userAssets`|`uint256[6]`|Borrower assets in `[depositL, depositX, depositY, borrowL, borrowX, borrowY]` order.|
|`activeLiquidityAssets`|`uint256`|Active liquidity used to scale tranche saturation.|
|`netRepaidLAssets`|`uint256`|Net debt repaid by the liquidator, denominated in L.|
|`netSeizedLAssets`|`uint256`|Net collateral seized by the liquidator, denominated in L.|
|`netDebtX`|`bool`|Whether the liquidation repays net X debt. If false, it repays net Y debt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidation`|`uint256[6]`|Component-bounded asset amounts to remove from the borrower.|


### calcMutation

Builds a liquidation slice from raw tranche-boundary and saturation inputs.
It derives the target square-root price and asset weights from the same saturation window,
applies L through a shared weight, then solves the deposit-side delta directly from the
exact-LTV equation.
The target slice square-root price is the selected tranche boundary moved by the start
weight from the same saturation walk:
```math
s_\Delta=b^T\sqrt{w_s}
```
In signed notation, the debt-side slice then fixes one raw borrow amount:
```math
X_\Delta=-borrowX\cdot w_X
\qquad \text{for net debt X}
```
```math
Y_\Delta=-borrowY\cdot w_Y
\qquad \text{for net debt Y}
```
L is selected next. The remaining side is solved last from the exact-LTV equation and may be
either collateral seized or same-side borrow repaid, depending on the sign of the solved
delta.


```solidity
function calcMutation(
    uint256[6] memory userAssets,
    uint256 trancheBoundarySqrtPriceQ72,
    uint256 partialSaturation,
    uint256 totalSaturation,
    uint256 activeLiquidityAssets,
    bool netDebtX
) internal pure returns (uint256[6] memory liquidation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`|Borrower assets in `[depositL, depositX, depositY, borrowL, borrowX, borrowY]` order.|
|`trancheBoundarySqrtPriceQ72`|`uint256`|Boundary sqrt price for the tranche adjacent to the included slice.|
|`partialSaturation`|`uint256`|Relative saturation included in the partial liquidation.|
|`totalSaturation`|`uint256`|Total relative borrower saturation across all tranches.|
|`activeLiquidityAssets`|`uint256`|Active liquidity used to scale tranche saturation.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the debt side is Y.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidation`|`uint256[6]`|Component-bounded asset amounts to remove from the borrower.|


### applyLMutation

Applies the L weight to both L legs and returns the resulting signed L delta.
The raw L legs are both included at the same weight:
```math
depositL_{\Delta}=depositL\cdot w_L,\qquad borrowL_{\Delta}=borrowL\cdot w_L
```
The signed L contribution is:
```math
L_{\Delta}=depositL_{\Delta}-borrowL_{\Delta}
```


```solidity
function applyLMutation(
    uint256[6] memory liquidation,
    uint256[6] memory userAssets,
    uint256 lWeightQ72
) private pure returns (int256 lDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidation`|`uint256[6]`|Liquidation array being built.|
|`userAssets`|`uint256[6]`|Borrower assets in `[depositL, depositX, depositY, borrowL, borrowX, borrowY]` order.|
|`lWeightQ72`|`uint256`|Q72 weight to apply to deposit L and borrow L.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`lDelta`|`int256`|Signed L contribution of the liquidated slice.|


### calcDebtSideWeightQ72

Calculates the saturation-derived weight for the debt-side borrow asset.
The selected debt-side weight is:
```math
w_{debt}=
\begin{cases}
w_X & \text{if net debt X} \\
w_Y & \text{if net debt Y}
\end{cases}
```


```solidity
function calcDebtSideWeightQ72(
    uint256 sqrtStartWeightQ72,
    uint256 sqrtEndWeightQ72,
    bool netDebtX
) private pure returns (uint256 debtSideWeightQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtStartWeightQ72`|`uint256`|Start sqrt weight of the included saturation window.|
|`sqrtEndWeightQ72`|`uint256`|End sqrt weight of the included saturation window.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the debt side is Y.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`debtSideWeightQ72`|`uint256`|Q72 weight applied to the debt-side borrow amount.|


### applyRemainingSideDelta

Applies the signed remaining-side delta to the matching deposit or borrow leg.
Positive deltas seize remaining-side collateral. Negative deltas repay borrow on that side.
Partial borrow repayment is valid as long as it is not greater than the starting borrow.
```math
R_\Delta>0 \Rightarrow deposit_\Delta=\min(R_\Delta, deposit)
```
```math
R_\Delta<0 \Rightarrow borrow_\Delta=\min(-R_\Delta, borrow)
```


```solidity
function applyRemainingSideDelta(
    uint256[6] memory liquidation,
    uint256[6] memory userAssets,
    int256 remainingSideDelta,
    uint256 depositIndex,
    uint256 borrowIndex
) private pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidation`|`uint256[6]`|Liquidation array being built.|
|`userAssets`|`uint256[6]`|Borrower assets in `[depositL, depositX, depositY, borrowL, borrowX, borrowY]` order.|
|`remainingSideDelta`|`int256`|Signed amount for the side opposite the fixed debt-side borrow.|
|`depositIndex`|`uint256`|Deposit token index for the remaining side.|
|`borrowIndex`|`uint256`|Borrow token index for the remaining side.|


### calcRemainingSideDelta

Solves the signed remaining-side delta for the fixed debt-side repayment.
The returned delta is positive when the slice must seize deposit-side collateral and
negative when it must repay borrow on that side to land on expected LTV.
For net debt X, define the fixed X-side debt value in L-units:
```math
debtSideValueInL=-\frac{X_\Delta}{s_\Delta}=\frac{borrowX_\Delta}{s_\Delta}
```
Then:
```math
Y_\Delta=\dfrac{debtSideValueInL-(1+k)L_\Delta}{ks_\Delta}
```
For net debt Y, define the fixed Y-side debt value in L-units:
```math
debtSideValueInL=-Y_\Delta s_\Delta=borrowY_\Delta s_\Delta
```
Then:
```math
X_\Delta=\dfrac{s_\Delta(debtSideValueInL-(1+k)L_\Delta)}{k}
```


```solidity
function calcRemainingSideDelta(
    uint256 borrowDelta,
    int256 lDelta,
    uint256 sqrtPriceQ72,
    bool netDebtX
) private pure returns (int256 remainingSideDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrowDelta`|`uint256`|Final debt-side borrow amount repaid by the liquidation.|
|`lDelta`|`int256`|Signed L contribution already included in the liquidation.|
|`sqrtPriceQ72`|`uint256`|Target liquidation sqrt price for the slice.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the debt side is Y.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`remainingSideDelta`|`int256`|Signed delta for the remaining side.|


### calcXWeightQ72

Calculates the partial liquidation weight for asset X.
In unscaled terms, `sqrtStartWeightQ72` is $\sqrt{w_s}$ and
`sqrtEndWeightQ72` is $\sqrt{w_e}$. The branch matches which side of
one the saturation window starts on:
```math
w_X =
\begin{cases}
\dfrac{\sqrt{w_s}-1}{\sqrt{w_s}-\sqrt{w_e}} & \text{if } \sqrt{w_s}>1 \\
\dfrac{1-\sqrt{w_s}}{\sqrt{w_e}-\sqrt{w_s}} & \text{otherwise}
\end{cases}
```


```solidity
function calcXWeightQ72(
    uint256 sqrtStartWeightQ72,
    uint256 sqrtEndWeightQ72
) private pure returns (uint256 xWeightQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtStartWeightQ72`|`uint256`|Q72 start sqrt weight for the included saturation window.|
|`sqrtEndWeightQ72`|`uint256`|Q72 end sqrt weight for the included saturation window.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`xWeightQ72`|`uint256`|Q72 weight for asset X.|


### calcYWeightQ72

Calculates the partial liquidation weight for asset Y.
Formula for `w_Y`:
```math
\begin{equation}
w_Y = \sqrt{w_e} \cdot w_X
\end{equation}
```


```solidity
function calcYWeightQ72(uint256 weightXQ72, uint256 sqrtEndWeightQ72) private pure returns (uint256 yWeightQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`weightXQ72`|`uint256`|Q72 weight for asset X.|
|`sqrtEndWeightQ72`|`uint256`|Q72 end sqrt weight for the included saturation window.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yWeightQ72`|`uint256`|Q72 weight for asset Y.|


### calcLWeightQ72

Calculates the partial liquidation weight for asset L from the debt-side slice.
Net-zero L is omitted. Net-borrow L uses the debt-side weight. Net-deposit L
chooses the lower feasible L endpoint implied by the fixed debt-side repayment.
For net-borrow L:
```math
L_\Delta=L_0\cdot w_{debt}
```
For net-deposit L, L is the free collateral-side variable:
```math
0 \le L_\Delta \le L_0
```
Let `debtSideValueInL` be the fixed debt-side value and `remainingCollateralInL` be the
remaining positive deposit-side collateral, both in L-units:
```math
debtSideValueInL=
\begin{cases}
\dfrac{borrowX_\Delta}{s_\Delta} & \text{if net debt X} \\
borrowY_\Delta s_\Delta & \text{if net debt Y}
\end{cases}
```
```math
remainingCollateralInL=
\begin{cases}
(depositY-borrowY)s_\Delta & \text{if net debt X and } depositY>borrowY \\
\dfrac{depositX-borrowX}{s_\Delta} & \text{if net debt Y and } depositX>borrowX \\
0 & \text{otherwise}
\end{cases}
```
Exact LTV gives the lower feasible endpoint. Only positive remaining-side collateral changes
that endpoint; zero or net-borrow remaining-side value uses the same lower bound:
```math
L_\Delta=\max\left(0,\frac{debtSideValueInL-k\cdot remainingCollateralInL}{1+k}\right)
\qquad \text{when } remainingCollateralInL>0
```
```math
L_\Delta=\frac{debtSideValueInL}{1+k}
\qquad \text{when } remainingCollateralInL=0
```


```solidity
function calcLWeightQ72(
    uint256[6] memory userAssets,
    uint256 debtSideWeightQ72,
    uint256 debtSideDelta,
    uint256 targetLiquidationSqrtPriceQ72,
    bool netDebtX
) private pure returns (uint256 lWeightQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAssets`|`uint256[6]`|Borrower assets in `[depositL, depositX, depositY, borrowL, borrowX, borrowY]` order.|
|`debtSideWeightQ72`|`uint256`|Q72 weight applied to the debt-side borrow amount.|
|`debtSideDelta`|`uint256`|Final debt-side borrow amount repaid by the liquidation.|
|`targetLiquidationSqrtPriceQ72`|`uint256`|Target liquidation sqrt price for the slice.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the debt side is Y.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`lWeightQ72`|`uint256`|Q72 weight applied to deposit L and borrow L.|


### calcSqrtStartWeightQ72

Calculates the start sqrt weight for the included saturation window.
The saturation is normalized by the active liquidity scaled by the maximum allowed
saturation ratio. Define:
```math
r_{max}=\frac{MAX\_SATURATION\_RATIO\_IN\_MAG2}{MAG2}
```
We round up the sqrt to avoid `sqrtStartWeightQ72 == Q72`, which would return `0` from `calcXWeightQ72`.
Normalize the included saturation by active liquidity:
```math
a_s=\frac{sat}{r_{max}L}
```
The underlying non-sqrt start weight is:
```math
\begin{equation}
w_s = \begin{cases}
1+a_s(B-1)
& \text{ if net debt of X } \\
\frac{1}{1+a_s(B-1)}
& \text{ if net debt of Y}
\end{cases}
\end{equation}
```


```solidity
function calcSqrtStartWeightQ72(
    uint256 partialSaturation,
    uint256 activeLiquidityAssets,
    bool netDebtX
) internal pure returns (uint256 sqrtStartWeightQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`partialSaturation`|`uint256`|Saturation included in the partial liquidation.|
|`activeLiquidityAssets`|`uint256`|Active liquidity used to scale tranche saturation.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the reciprocal weight is used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtStartWeightQ72`|`uint256`|Q72 start sqrt weight, adjusted for the debt side.|


### calcSqrtEndWeightQ72

Calculates the end sqrt weight for the included saturation window.
Normalize the remaining saturation by active liquidity:
```math
r_{max}=\frac{MAX\_SATURATION\_RATIO\_IN\_MAG2}{MAG2},
\qquad
a_e=\frac{sat_{total}-sat}{r_{max}L}
```
The underlying non-sqrt end weight is:
```math
\begin{equation}
w_e = \begin{cases}
1-a_e(B-1)
& \text{ if net debt of X } \\
\frac{1}{1-a_e(B-1)}
& \text{ if net debt of Y}
\end{cases}
\end{equation}
```


```solidity
function calcSqrtEndWeightQ72(
    uint256 partialSaturation,
    uint256 totalSaturation,
    uint256 activeLiquidityAssets,
    bool netDebtX
) private pure returns (uint256 sqrtEndWeightQ72);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`partialSaturation`|`uint256`|Saturation included in the partial liquidation.|
|`totalSaturation`|`uint256`|Total borrower saturation across all tranches.|
|`activeLiquidityAssets`|`uint256`|Active liquidity used to scale tranche saturation.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the reciprocal weight is used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtEndWeightQ72`|`uint256`|Q72 end sqrt weight, adjusted for the debt side.|


### weightInNumeratorOrDenominator

Adjusts a sqrt weight into numerator form for X debt or denominator form for Y debt.
Net debt Y walks the same tranche geometry in inverted square-root-price space:
```math
\sqrt{w}\mapsto\frac{1}{\sqrt{w}}
```


```solidity
function weightInNumeratorOrDenominator(
    uint256 sqrtWeight,
    bool netDebtX
) private pure returns (uint256 adjustedSqrtWeight);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtWeight`|`uint256`|Q72 sqrt weight before debt-side orientation.|
|`netDebtX`|`bool`|Whether the debt side is X. If false, the reciprocal weight is returned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`adjustedSqrtWeight`|`uint256`|Q72 sqrt weight oriented for the debt side.|


## Structs
### LoopMemoryState

```solidity
struct LoopMemoryState {
    uint256 satArrayLength;
    uint256 partialSatInLAssets;
    uint256 includedTranches;
    uint256 partialSatLimit;
}
```

