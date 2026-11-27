# Liquidation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/5137887ca618a782644b16aaae53310f175487d9/contracts/libraries/Liquidation.sol)


## State Variables
### START_NEGATIVE_PREMIUM_LTV_BIPS

```solidity
uint256 internal constant START_NEGATIVE_PREMIUM_LTV_BIPS = 6000;
```


### START_PREMIUM_LTV_BIPS

```solidity
uint256 private constant START_PREMIUM_LTV_BIPS = 7500;
```


### NEGATIVE_PREMIUM_SLOPE_IN_BIPS

```solidity
uint256 private constant NEGATIVE_PREMIUM_SLOPE_IN_BIPS = 66_667;
```


### NEGATIVE_PREMIUM_INTERCEPT_IN_BIPS

```solidity
uint256 private constant NEGATIVE_PREMIUM_INTERCEPT_IN_BIPS = 40_000;
```


### POSITIVE_PREMIUM_SLOPE_IN_BIPS

```solidity
uint256 private constant POSITIVE_PREMIUM_SLOPE_IN_BIPS = 7408;
```


### POSITIVE_PREMIUM_INTERCEPT_IN_BIPS

```solidity
uint256 private constant POSITIVE_PREMIUM_INTERCEPT_IN_BIPS = 4444;
```


### LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR_MAG2
This factor brings a leveraged position just below the leverage liquidation threshold


```solidity
uint256 internal constant LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR_MAG2 = 10;
```


### LEVERAGE_LIQUIDATION_FACTOR
Leverage liquidation factor derived from max allowed leverage scaled by the break-even factor


```solidity
uint256 internal constant LEVERAGE_LIQUIDATION_FACTOR =
    ALLOWED_LIQUIDITY_LEVERAGE * MAG2 / LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR_MAG2;
```


### MAX_PREMIUM_IN_BIPS

```solidity
uint256 internal constant MAX_PREMIUM_IN_BIPS = 11_111;
```


### HARD

```solidity
uint256 internal constant HARD = 0;
```


### SATURATION

```solidity
uint256 internal constant SATURATION = 1;
```


### LEVERAGE

```solidity
uint256 internal constant LEVERAGE = 2;
```


## Functions
### calculateHardLiquidation

Computes the hard-liquidation mutation for the borrower's first tranche.

*The selected side determines the saturation tree, and tranche size is always the first
stored saturation tranche for that side. Repayment sufficiency is checked against the
computed debt slice after this mutation is calculated.*


```solidity
function calculateHardLiquidation(
    ISaturationAndGeometricTWAPState saturationState,
    address pairAddress,
    Validation.InputParams memory inputParams,
    uint256 fragileLiquidityAssets,
    address borrower
) external view returns (uint256[6] memory partialLiquidation, bool badDebt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`saturationState`|`ISaturationAndGeometricTWAPState`|The saturation state used to fetch the borrower's selected side.|
|`pairAddress`|`address`|The pair address whose saturation tree stores the borrower.|
|`inputParams`|`Validation.InputParams`|The borrower's full position, reserves, active liquidity, and TWAP bounds.|
|`fragileLiquidityAssets`|`uint256`|Active liquidity excluded from tranche scaling.|
|`borrower`|`address`|The account being liquidated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`partialLiquidation`|`uint256[6]`|Executed debt repayment and collateral seizure amounts.|
|`badDebt`|`bool`|Whether the liquidation exhausts collateral and burns remaining debt.|


### applyHardPremiumToFirstTranche

Applies the hard-liquidation premium to a first-tranche debt slice.

*Non-bad-debt liquidations repay the first-tranche debt and scale collateral up or down
to the allowed premium. Bad-debt liquidations seize all collateral and scale debt repayment
down to the minimum that still satisfies the premium cap. For non-bad debt, all terms are
valued in L. The premium path calls `getCheckLtvParams` with the min and max TWAP bounds
swapped. The math below uses `sqrtPriceMin` and `sqrtPriceMax` for the original lower
and upper bounds, respectively. For `netDebtX == true`, the L-valued token legs are:
```math
\begin{aligned}
D_L &= DEPOSIT\_L \\
D_{LX} &= \frac{DEPOSIT\_X}{\sqrt{P_{min}}} \\
D_{LY} &= DEPOSIT\_Y \cdot \sqrt{P_{max}} \\
B_L &= BORROW\_L \\
B_{LX} &= \frac{BORROW\_X}{\sqrt{P_{max}}} \\
B_{LY} &= BORROW\_Y \cdot \sqrt{P_{min}}
\end{aligned}
```
Below `MAX_PREMIUM_IN_BIPS`, the non-bad-debt path keeps the first-tranche selected-side
direct deposit fixed and scales the collateral deposits by `w`. `DEPOSIT_L` is part of
both selected deposits and opposite deposits, so scaling it changes both the debt and
collateral sides. `BORROW_L` is likewise part of both selected borrows and opposite
borrows. For `netDebtX == false`, swap X and Y. The code stores the allowed premium in
bips; the equations below use `premium` as the normalized collateral/debt ratio. For
`netDebtX == true`, the legacy collateral scale `w` is solved directly:
```math
\begin{aligned*}
debt(w) &= (B_L + B_{LX}) - (w \cdot D_L + D_{LX}) \\
collateral(w) &= w \cdot (D_L + D_{LY}) - (B_L + B_{LY})
\end{aligned*}
```
Requiring the collateral/debt ratio to equal `premium`:
```math
\frac{collateral(w)}{debt(w)} = premium
```
gives:
```math
w =
\frac{
premium \cdot \left((B_L + B_{LX}) - D_{LX}\right) + B_L + B_{LY}
}{
D_L + D_{LY} + premium \cdot D_L
}
```
At or above `MAX_PREMIUM_IN_BIPS`, when the raw first-tranche collateral is at or below the
requested payout, every deposit expands from its first-tranche amount `T_i` toward its
full amount `U_i` by one fraction `t`. Let `debt_0` and `collateral_0` be the first-tranche
values and let `deltaSelected` and `deltaOpposite` be the unused deposit headroom in the
two oriented L-valued buckets:
```math
t = \frac{
premium \cdot debt_0 - collateral_0
}{
deltaOpposite + premium \cdot deltaSelected
},
\qquad deposit_i = T_i + t(U_i-T_i)
```
If all deposits cannot support the first-tranche debt at the allowed premium, the existing
bad-debt branch seizes all deposits and scales the borrower's full debt vector.*


```solidity
function applyHardPremiumToFirstTranche(
    Validation.InputParams memory inputParams,
    uint256[6] memory firstTranche,
    uint256 maxAllowedPremiumBips,
    uint256 debtInL,
    uint256 firstCollateralInL,
    bool netDebtX
) internal pure returns (uint256[6] memory liquidation, bool badDebt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The borrower's full position and TWAP bounds.|
|`firstTranche`|`uint256[6]`|The first-tranche position selected from saturation state.|
|`maxAllowedPremiumBips`|`uint256`|Maximum collateral/debt ratio allowed for this liquidation.|
|`debtInL`|`uint256`|First-tranche net debt valued in L assets.|
|`firstCollateralInL`|`uint256`|First-tranche net collateral valued in L assets.|
|`netDebtX`|`bool`|True when the first tranche has net X-side debt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidation`|`uint256[6]`|Executed debt repayment and collateral seizure amounts.|
|`badDebt`|`bool`|Whether the liquidation exhausts collateral and burns remaining debt.|


### scaleBadDebtDebtFromFullCollateral

Scales debt repayment when hard liquidation seizes all available collateral.

*Preserves the existing selected-side scaling below `MAX_PREMIUM_IN_BIPS`. At or above
that boundary, applies one full-position repayment fraction to `BORROW_L`, `BORROW_X`, and
`BORROW_Y`. Since `BORROW_L` contributes to both oriented borrow buckets, its coefficient
in the full-position denominator is `BIPS + maxAllowedPremiumBips`. Repayment rounds up.*


```solidity
function scaleBadDebtDebtFromFullCollateral(
    Validation.InputParams memory inputParams,
    uint256[6] memory firstTranche,
    uint256[6] memory liquidation,
    HardPremiumBuckets memory buckets,
    uint256 maxAllowedPremiumBips,
    bool netDebtX
) private pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The borrower's full position and TWAP bounds.|
|`firstTranche`|`uint256[6]`|The first-tranche debt ceiling used by the legacy premium region.|
|`liquidation`|`uint256[6]`|Full-collateral liquidation vector, mutated with scaled debt repayment.|
|`buckets`|`HardPremiumBuckets`|Maximum-collateral buckets containing first-tranche debts.|
|`maxAllowedPremiumBips`|`uint256`|Maximum collateral/debt ratio allowed for this liquidation.|
|`netDebtX`|`bool`|True when the selected debt side is X.|


### hardPremiumBuckets

Orients full-collateral LTV values around the selected hard-liquidation side.


```solidity
function hardPremiumBuckets(
    Validation.CheckLtvParams memory checkLtvParams,
    bool netDebtX
) private pure returns (HardPremiumBuckets memory buckets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`checkLtvParams`|`Validation.CheckLtvParams`|Full-collateral LTV values using liquidation price ordering.|
|`netDebtX`|`bool`|True when X is the selected debt side; false when Y is selected.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`buckets`|`HardPremiumBuckets`|Selected/opposite deposit and borrow values in L assets.|


### calculateNetDebtAndSeizedDeposits

Values a liquidation vector as net repaid debt and net seized collateral in L terms.

*Min and max prices are swapped before LTV netting to value borrows conservatively and
deposits favorably for the borrower.*


```solidity
function calculateNetDebtAndSeizedDeposits(
    uint256[6] memory liquidation,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
) internal pure returns (uint256 netDebtInLAssets, uint256 netCollateralInLAssets, bool netDebtX);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidation`|`uint256[6]`|Liquidation vector indexed by token type.|
|`sqrtPriceMinInQ72`|`uint256`|Lower TWAP price bound.|
|`sqrtPriceMaxInQ72`|`uint256`|Upper TWAP price bound.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDebtInLAssets`|`uint256`|Net debt repaid by the liquidation, valued in L assets.|
|`netCollateralInLAssets`|`uint256`|Net collateral seized by the liquidation, valued in L assets.|
|`netDebtX`|`bool`|True when the vector has net X-side debt.|


### selectHardLiquidationSide

Selects the deterministic saturation side for hard liquidation.

*Direct one-sided borrow positions pick that borrow side. Direct two-sided borrows first
require current net debt and opposite collateral. Ambiguous direct-borrow positions cannot
be hard-liquidated because there is no deterministic collateral side to seize.
Pure borrowed-liquidity straddles use the position's current-price apex.*


```solidity
function selectHardLiquidationSide(
    Validation.InputParams memory inputParams
) internal pure returns (bool netDebtX);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The borrower's full position and pool prices.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netDebtX`|`bool`|True when the net-X-debt saturation account should be liquidated.|


### checkSaturationPremiums

Computes the saturation liquidation collateral transfer for a borrower.

*Reverts when the current saturation premium is zero.*


```solidity
function checkSaturationPremiums(
    ISaturationAndGeometricTWAPState saturationAndGeometricTWAPState,
    Validation.InputParams memory inputParams,
    address borrower
) external view returns (uint256 seizeLAssets, uint256 seizeXAssets, uint256 seizeYAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`saturationAndGeometricTWAPState`|`ISaturationAndGeometricTWAPState`|The contract containing saturation and TWAP state.|
|`inputParams`|`Validation.InputParams`|The borrower's full position, reserves, active liquidity, and TWAP bounds.|
|`borrower`|`address`|The account being liquidated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`seizeLAssets`|`uint256`|The L assets to seize.|
|`seizeXAssets`|`uint256`|The X assets to seize.|
|`seizeYAssets`|`uint256`|The Y assets to seize.|


### liquidateLeverageCalcDeltaAndPremium

Calculate weighted leverage liquidation repayments and seized deposits.

*The first three return indices are seized deposits, the last three are required
repayments, and all values are in each token's native units. The formula for the premium
is calculated with the average net borrow of X and Y $$B$$ and the net deposit of X and Y
$$D$$ and a scaler $$S$$ that sets the pace at which the premium increased, in code we
call this `LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR_MAG2`, and allowed leverage $$AL$$,
`ALLOWED_LIQUIDITY_LEVERAGE`:
```math
premium = \begin{cases}
S \left(
\frac{B}{D}
- \frac{AL - 1}{AL}
\right)
\text { if } \frac{B}{D} >
\frac{AL - 1}{AL} \\
0 \text { otherwise }
\end{cases}
```
This can be visualized [here](https://www.desmos.com/calculator/1cd55f1yhz).
The premium is a percentage of the total deposit. If the premium is low enough, then we
we attempt to deleverage the position such that the premium and closed part of the
position leaves it under the leveraged threshold. If this is not possible, then all of the
users deposit will be transferred to the liquidator and there will be bad debt.
Note that the de leveraging relies on the min and max tick to be equal, so the result may
not be a valid amount of leverage using a min and max price as is done in the Validation
library.*


```solidity
function liquidateLeverageCalcDeltaAndPremium(
    Validation.InputParams memory inputParams,
    int16 midTermTick
) external pure returns (uint256[6] memory leveragedLiquidationParams, bool badDebt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The params representing the position of the borrower.|
|`midTermTick`|`int16`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leveragedLiquidationParams`|`uint256[6]`|Array indexed by DEPOSIT_L, DEPOSIT_X, DEPOSIT_Y, BORROW_L, BORROW_X, BORROW_Y.|
|`badDebt`|`bool`|Whether the leverage liquidation leaves bad debt to burn.|


### calculateLeverageLiquidationAsset

Calculate the amount of an asset to be liquidated in a leverage liquidation.

*we use the min so amounts don't exceed balances*


```solidity
function calculateLeverageLiquidationAsset(
    uint256 userAsset,
    uint256 totalShareLAsset,
    uint256 totalLAsset,
    bool rounding
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`userAsset`|`uint256`|The amount of the asset held by the user.|
|`totalShareLAsset`|`uint256`|The portion getting seized or repaid in L assets, or fraction of the total borrowed l or deposited l respectively.|
|`totalLAsset`|`uint256`|The total borrowed l or deposited l respectively.|
|`rounding`|`bool`|Whether to round up the result, we round up for the borrow legs to make sure enough is repaid to cover the seized deposits.|


### calcHardMaxPremiumInBips

Calculate the maximum premium the liquidator may receive given the LTV of the borrower.

*We min the result to favor the borrower.*


```solidity
function calcHardMaxPremiumInBips(
    uint256[6] memory validatedLiquidation,
    uint256 activeLiquidityAssets,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
)
    internal
    pure
    returns (uint256 maxPremiumInBips, uint256 netDebtInLAssets, uint256 netCollateralInLAssets, bool netDebtX);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxPremiumInBips`|`uint256`|The max premium allowed to be received by the liquidator.|
|`netDebtInLAssets`|`uint256`|Slippage-adjusted liquidation net debt.|
|`netCollateralInLAssets`|`uint256`|Raw liquidation net collateral.|
|`netDebtX`|`bool`|True when the liquidation has net X-side debt.|


### calcHardPremiumInBips

Calculate the premium being afforded to the liquidator given the repay and depositToTransfer amounts.

*We use prices to maximize the `premiumInBips` to favor the borrower*


```solidity
function calcHardPremiumInBips(
    uint256 repaidDebtInL,
    uint256 seizedCollateralValueInL
) internal pure returns (uint256 premiumInBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`repaidDebtInL`|`uint256`|The amount of debt being repaid in L assets.|
|`seizedCollateralValueInL`|`uint256`|The value of the collateral being seized in L assets.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`premiumInBips`|`uint256`|The premium being received by the liquidator.|


### convertLtvToPremium

Calculates the maximum premium the liquidator should receive based on borrower LTV.
`ltvBips` and the returned premium are both denominated in bips. Let `l` be
`ltvBips`, `a` and `b` be the two LTV thresholds, `m` be a slope, and `c` be an
intercept. The negative-premium segment uses `m_-` and `c_-`; the positive-premium
segment uses `m_+` and `c_+`.
```math
P(l)=
\begin{cases}
0
& l \le a \\
\left\lfloor\frac{m_{-}\cdot l}{BIPS}\right\rfloor-c_{-}
& a < l < b \\
\left\lfloor\frac{m_{+}\cdot l}{BIPS}\right\rfloor+c_{+}
& b \le l
\end{cases}
```

*internal for testing only*


```solidity
function convertLtvToPremium(
    uint256 ltvBips
) internal pure returns (uint256 maxPremiumInBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ltvBips`|`uint256`|LTV of the borrower.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxPremiumInBips`|`uint256`|The maximum premium for the liquidator.|


### calcSaturationSeizedAssets

Scales deposited assets by the saturation liquidation premium.


```solidity
function calcSaturationSeizedAssets(
    uint256 depositedLAssets,
    uint256 depositedXAssets,
    uint256 depositedYAssets,
    uint256 premiumInBips
) internal pure returns (uint256 seizedLAssets, uint256 seizedXAssets, uint256 seizedYAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositedLAssets`|`uint256`|Borrower's deposited L assets.|
|`depositedXAssets`|`uint256`|Borrower's deposited X assets.|
|`depositedYAssets`|`uint256`|Borrower's deposited Y assets.|
|`premiumInBips`|`uint256`|Saturation premium denominated in bips.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`seizedLAssets`|`uint256`|The L assets to seize.|
|`seizedXAssets`|`uint256`|The X assets to seize.|
|`seizedYAssets`|`uint256`|The Y assets to seize.|


### calcSaturationMaxPremiumInBips

Calculate the max premium the saturation liquidator can receive given position of
`account`, adjusted to apply only to net equity.


```solidity
function calcSaturationMaxPremiumInBips(
    ISaturationAndGeometricTWAPState saturationAndGeometricTWAPState,
    Validation.InputParams memory inputParams,
    address pairAddress,
    address account
) internal view returns (uint256 adjustedPremiumInBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`saturationAndGeometricTWAPState`|`ISaturationAndGeometricTWAPState`|The contract containing the saturation state.|
|`inputParams`|`Validation.InputParams`|The params containing the position of `account`.|
|`pairAddress`|`address`|The pair address whose saturation tree stores `account`.|
|`account`|`address`|The account of the borrower.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`adjustedPremiumInBips`|`uint256`|The max premium for the liquidator.|


### adjustSaturationPremiumForNetEquity


```solidity
function adjustSaturationPremiumForNetEquity(
    Validation.InputParams memory inputParams,
    uint256 premiumInBips
) internal pure returns (uint256 adjustedPremiumInBips);
```

## Errors
### LiquidationZeroPremium

```solidity
error LiquidationZeroPremium();
```

### NotEnoughRepaidForLiquidation

```solidity
error NotEnoughRepaidForLiquidation();
```

### TooMuchDepositToTransferForLeverageLiquidation

```solidity
error TooMuchDepositToTransferForLeverageLiquidation();
```

## Structs
### HardPremiumBuckets
L-valued buckets for hard liquidation premium math.

*`selected` is the debt side being liquidated; `opposite` is the collateral side.*


```solidity
struct HardPremiumBuckets {
    uint256 selectedDeposits;
    uint256 selectedBorrows;
    uint256 oppositeDeposits;
    uint256 oppositeBorrows;
}
```

