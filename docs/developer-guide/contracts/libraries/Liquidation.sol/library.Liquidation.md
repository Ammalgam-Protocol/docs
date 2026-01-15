# Liquidation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/88a65e17fbe942033d24664b3ae6c731eb80e1ee/contracts/libraries/Liquidation.sol)


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


### LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR
The factor to controls the pace of the increase in the premium the leverage
liquidation premium function.


```solidity
uint256 private constant LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR = 5;
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
    uint256 activeLiquidityScalerInQ72,
    uint256 sqrtPriceMinInQ72,
    uint256 sqrtPriceMaxInQ72
) internal pure returns (uint256 netDebtInLAssets, uint256 netCollateralInLAssets, bool netDebtX);
```

### checkSaturationPremiums


```solidity
function checkSaturationPremiums(
    ISaturationAndGeometricTWAPState saturationAndGeometricTWAPState,
    Validation.InputParams memory inputParams,
    address borrower,
    uint256 depositLToTransferInLAssets,
    uint256 depositXToTransferInXAssets,
    uint256 depositYToTransferInYAssets
) external view;
```

### liquidateLeverageCalcDeltaAndPremium

Calculate the amount to be closed (from both deposit and borrow) and premium to be
paid. The formula for the premium is calculated with the average net borrow of X and Y
$$B$$ and the net deposit of X and Y $$B$$ and a scaler $$S$$ that sets the pace at which
the premium increased, in code we call this `LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR`, and
allowed leverage $$AL$$, `ALLOWED_LIQUIDITY_LEVERAGE`:
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
This can be visualized [here](https://www.desmos.com/calculator/slheqlelvu).
The premium is a percentage of the total deposit. If the premium is low enough, then we
we attempt to deleverage the position such that the premium and closed part of the
position leaves it under the leveraged threshold. If this is not possible, then all of the
users deposit will be transferred to the liquidator and there will be bad debt.
Note that the de leveraging relies on the min and max tick to be equal, so the result may
not be a valid amount of leverage using a min and max price as is done in the Validation
library.


```solidity
function liquidateLeverageCalcDeltaAndPremium(
    Validation.InputParams memory inputParams,
    bool depositXAndY,
    bool repayXAndY
) external pure returns (LeveragedLiquidationParams memory leveragedLiquidationParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The params representing the position of the borrower.|
|`depositXAndY`|`bool`|Flag indicating whether the liquidator is taking deposit of X and Y.|
|`repayXAndY`|`bool`|Flag indicating whether the liquidator is repaying borrow of X and Y.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leveragedLiquidationParams`|`LeveragedLiquidationParams`|a struct of type LeveragedLiquidationParams containing the amounts to be closed and the premium to be paid.|


### calcHardMaxPremiumInBips

Calculate the maximum premium the liquidator may receive given the LTV of the borrower.

*We min the result to favor the borrower.*


```solidity
function calcHardMaxPremiumInBips(
    uint256[6] memory validatedLiquidation,
    uint256 activeLiquidityAssets,
    uint256 activeLiquidityScalerInQ72,
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

Calculate the maximum premium the liquidator should receive based on the LTV of the borrower.
maxPremiumInBips is linear in between the following points
```math
\begin{gather*}
0 <= LTV < START\_NEGATIVE\_PREMIUM\_LTV\_BIPS => maxPremiumInBips = 0 \\
START\_NEGATIVE\_PREMIUM\_LTV\_BIPS = LTV => maxPremiumInBips == 0 \quad (negative premium) \\
START\_PREMIUM\_LTV\_BIPS = LTV => maxPremiumInBips == 1 \quad (no premium) \\
0.9 = LTV => maxPremiumInBips == 1/0.9 \quad (full premium)
\end{gather*}
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


### calcSaturationPremiumBips

Calculate the premium the saturation liquidator is receiving given the borrowers deposit and the depositToTransfer to the liquidator.
The end premium is the max of the premiums in L, X, Y
If no saturation liq is requested (liquidationParams.saturationDepositLToBeTransferred==liquidationParams.saturationDepositXToBeTransferred==liquidationParams.saturationDepositYToBeTransferred==0), the premium will be 0


```solidity
function calcSaturationPremiumBips(
    Validation.InputParams memory inputParams,
    uint256 depositLToTransferInLAssets,
    uint256 depositXToTransferInXAssets,
    uint256 depositYToTransferInYAssets
) internal pure returns (uint256 premiumInBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The params containing the position of the borrower.|
|`depositLToTransferInLAssets`|`uint256`||
|`depositXToTransferInXAssets`|`uint256`||
|`depositYToTransferInYAssets`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`premiumInBips`|`uint256`|The premium being received by the liquidator.|


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

## Structs
### LeveragedLiquidationParams

```solidity
struct LeveragedLiquidationParams {
    uint256 closeInLAssets;
    uint256 closeInXAssets;
    uint256 closeInYAssets;
    uint256 premiumInLAssets;
    uint256 premiumLInXAssets;
    uint256 premiumLInYAssets;
    bool badDebt;
}
```

