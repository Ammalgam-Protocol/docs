# Liquidation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/704e13b16c0d3807131b6b753ca6085c1fab3045/contracts/libraries/Liquidation.sol)


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
### verifyHardLiquidation


```solidity
function verifyHardLiquidation(
    ISaturationAndGeometricTWAPState saturationState,
    address pairAddress,
    Validation.InputParams memory inputParams,
    uint256[6] memory proposedLiquidation,
    address borrower
) external view returns (uint256[6] memory partialLiquidation, bool badDebt);
```

### checkHardPremiums


```solidity
function checkHardPremiums(
    uint256 repaidDebtInL,
    uint256 seizedCollateralValueInL,
    uint256 maxAllowedPremiumBips
) internal pure;
```

### calculateNetDebtAndSeizedDeposits


```solidity
function calculateNetDebtAndSeizedDeposits(
    uint256[6] memory proposedLiquidation,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
) internal pure returns (uint256 netDebtInLAssets, uint256 netCollateralInLAssets, bool netDebtX);
```

### checkSaturationPremiums


```solidity
function checkSaturationPremiums(
    ISaturationAndGeometricTWAPState saturationAndGeometricTWAPState,
    Validation.InputParams memory inputParams,
    address borrower
) external view returns (uint256 seizeLAssets, uint256 seizeXAssets, uint256 seizeYAssets);
```

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
    Validation.InputParams memory inputParams
) external pure returns (uint256[6] memory leveragedLiquidationParams, bool badDebt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The params representing the position of the borrower.|

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
) internal pure returns (uint256 maxPremiumInBips);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxPremiumInBips`|`uint256`|The max premium allowed to be received by the liquidator.|


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


```solidity
function calcSaturationSeizedAssets(
    uint256 depositedLAssets,
    uint256 depositedXAssets,
    uint256 depositedYAssets,
    uint256 premiumInBips
) internal pure returns (uint256 seizedLAssets, uint256 seizedXAssets, uint256 seizedYAssets);
```

### calcSaturationMaxPremiumInBips

Calculate the max premium the saturation liquidator can receive given position of
`account`.


```solidity
function calcSaturationMaxPremiumInBips(
    ISaturationAndGeometricTWAPState saturationAndGeometricTWAPState,
    Validation.InputParams memory inputParams,
    address account
) internal view returns (uint256 maxPremiumBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`saturationAndGeometricTWAPState`|`ISaturationAndGeometricTWAPState`|The contract containing the saturation state.|
|`inputParams`|`Validation.InputParams`|The params containing the position of `account`.|
|`account`|`address`|The account of the borrower.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxPremiumBips`|`uint256`|The max premium for the liquidator.|


## Errors
### LiquidationPremiumTooHigh

```solidity
error LiquidationPremiumTooHigh();
```

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

### LiquidationMutation

```solidity
error LiquidationMutation();
```

