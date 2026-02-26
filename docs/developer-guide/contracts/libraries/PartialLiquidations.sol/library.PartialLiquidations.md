# PartialLiquidations
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/b9fca5224c235322171b13509db743f19431f0a4/contracts/libraries/PartialLiquidations.sol)

We allow liquidations to happen in parts when the position is spread across more than
one tranche. These partial liquidations allow the liquidator to specify how many tranches they
are liquidating based on how much they are repaying. Fewer tranches will result in a higher
LTV as they start with the portion of the position closest to the price and move outward. In
most cases, one tranche will be liquidated at once, but in some cases, a sliver of liquidity
in the first tranche may not be worth the cost to liquidate until it and the next tranche have
become profitable to liquidate.
Once we determine the number of tranches of a position they want to liquidate, we mutate the
position getting liquidated to a smaller scaled portion of the initial position. To calculate
the portion of a position, we start with the following requirements:
```math
\begin{align}
EXPECTED\_LTV
&= \frac{NET\_BORROW\_0}{NET\_DEPOSIT\_0} = \frac{NET\_BORROW\_1}{NET\_DEPOSIT\_1}
\\
NET\_BORROW\_0
&= LIQUIDATED\_BORROW + NET\_BORROW\_1
\\
NET\_DEPOSIT\_0
&= LIQUIDATED\_DEPOSIT + NET\_DEPOSIT\_1
\end{align}
```


## State Variables
### EXPECTED_SATURATION_LTV_MAG2_INT

```solidity
int256 internal constant EXPECTED_SATURATION_LTV_MAG2_INT = int256(EXPECTED_SATURATION_LTV_MAG2);
```


### MAG2_INT

```solidity
int256 internal constant MAG2_INT = int256(MAG2);
```


### Q72_INT

```solidity
int256 internal constant Q72_INT = int256(Q72);
```


## Functions
### calculatePartialLiquidation


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

### calcMutation


```solidity
function calcMutation(
    uint256[6] memory userAssets,
    uint256 trancheBoundarySqrtPriceQ72,
    uint256 partialSaturation,
    uint256 totalSaturation,
    uint256 activeLiquidityAssets,
    bool netDebtX
) private pure returns (uint256[6] memory);
```

### calcXWeightQ72

calculates partial liquidation weight for asset X.

*formulas for w_X derived from:
```math
w_X &=  \large  \frac{
1- \sqrt{w_s}
}{
\sqrt{w_e}-\sqrt{w_s} }
```*


```solidity
function calcXWeightQ72(
    uint256 sqrtStartWeightQ72,
    uint256 sqrtEndWeightQ72
) private pure returns (uint256 xWeightQ72);
```

### calcYWeightQ72

calculates partial liquidation weight for asset Y.

*formulas for w_Y derived from:
```math
\begin{equation}
w_Y = \sqrt{w_e} \cdot w_X
\end{equation}
```*


```solidity
function calcYWeightQ72(uint256 weightXQ72, uint256 sqrtEndWeightQ72) private pure returns (uint256 yWeightQ72);
```

### calcLWeightQ72

calculates partial liquidation weight for asset L.

*formula for w_L is derived from:
```math
\begin{equation}
w_L =
- \frac{
\frac{X_\Delta}{b^{t_1}}
+ EXPECTED\_LTV \cdot Y_\Delta \cdot b^{t_1}
}{
(EXPECTED\_LTV+1) L_0
}
\end{equation}
```
where $$t_1 = b^{T} \cdot \sqrt{w_s}$$ for the tranche boundary $$T$$ of the tranche being
liquidated.*


```solidity
function calcLWeightQ72(
    uint256[6] memory userAssets,
    int256 xWeightQ72,
    int256 yWeightQ72,
    uint256 sqrtStartWeightQ72,
    uint256 tranchesSqrtPriceQ72,
    bool netDebtX
) private pure returns (uint256 lWeightQ72);
```

### calcSqrtStartWeightQ72

calculates weight based on the formula below. Note that we don't use all of the
active liquidity assets, must the max allowed saturation.
```math
\begin{equation}
w_s = \begin{cases}
\frac{sat}}{MAX\_SAT\RATIO \cdot L} ( B - 1 ) + 1
& \text{ if net debt of X } \\
\frac{ 1 }{ \frac{sat}}{MAX\_SAT\RATIO \cdot L} ( B - 1 ) + 1 }
& \text{ if net debt of Y}
\end{cases}
\end{equation}
```


```solidity
function calcSqrtStartWeightQ72(
    uint256 partialSaturation,
    uint256 activeLiquidityAssets,
    bool netDebtX
) private pure returns (uint256 sqrtStartWeightQ72);
```

### calcSqrtEndWeightQ72

calculates weight based on the formula below.
```math
\begin{equation}
w_s = \begin{cases}
\frac{ sat - sat_{total} }{ MAX\_SAT\RATIO \cdot L} ( B - 1 ) + 1
& \text{ if net debt of X } \\
\frac{ 1 }{ \frac{ sat - sat_{total} }{ MAX\_SAT\RATIO \cdot L } ( B - 1 ) + 1 }
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

### weightInNumeratorOrDenominator


```solidity
function weightInNumeratorOrDenominator(
    uint256 sqrtWeight,
    bool netDebtX
) private pure returns (uint256 adjustedSqrtWeight);
```

### mutatePosition


```solidity
function mutatePosition(
    uint256[6] memory userAssets,
    uint256 lWeightQ72,
    uint256 xWeightQ72,
    uint256 yWeightQ72
) internal pure returns (uint256[6] memory);
```

### netAssets


```solidity
function netAssets(
    uint256[6] memory userAssets
) internal pure returns (int256 netL, int256 netX, int256 netY);
```

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

