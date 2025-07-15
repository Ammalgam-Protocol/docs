# Liquidation
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a26749d2952fb563364ca2f24c7ddd488be0359f/contracts/libraries/Liquidation.sol)


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

```solidity
uint256 private constant LEVERAGE_LIQUIDATION_BREAK_EVEN_FACTOR = 5;
```


### MAX_PREMIUM_IN_BIPS

```solidity
uint256 private constant MAX_PREMIUM_IN_BIPS = 11_111;
```


### HARD

```solidity
uint256 internal constant HARD = 0;
```


### SOFT

```solidity
uint256 internal constant SOFT = 1;
```


### LEVERAGE

```solidity
uint256 internal constant LEVERAGE = 2;
```


## Functions
### checkHardPremiums


```solidity
function checkHardPremiums(
    uint256 repaidDebtInL,
    uint256 seizedCollateralValueInL,
    uint256 maxPremiumInBips
) internal pure returns (bool maxPremiumExceeded);
```

### calculateNetDebtAndSeizedDeposits


```solidity
function calculateNetDebtAndSeizedDeposits(
    Validation.InputParams memory inputParams,
    HardLiquidationParams memory hardLiquidationParams,
    uint256 actualRepaidLiquidityAssets
) internal pure returns (uint256 netDebtInLAssets, uint256 netCollateralInLAssets, bool netDebtX);
```

### checkSoftPremiums


```solidity
function checkSoftPremiums(
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
paid.


```solidity
function liquidateLeverageCalcDeltaAndPremium(
    Validation.InputParams memory inputParams,
    bool depositL,
    bool repayL
) external pure returns (LeveragedLiquidationParams memory leveragedLiquidationParams);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The params representing the position of the borrower.|
|`depositL`|`bool`|Flag indicating whether the liquidator is transferring depositL.|
|`repayL`|`bool`|Flag indicating whether the liquidator is repaying borrowL.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`leveragedLiquidationParams`|`LeveragedLiquidationParams`|a struct of type LeveragedLiquidationParams containing the amounts to be closed and the premium to be paid.|


### calcHardMaxPremiumInBips

Calculate the maximum premium the liquidator may receive given the LTV of the borrower.

*We min the result to favor the borrower.*


```solidity
function calcHardMaxPremiumInBips(
    Validation.InputParams memory inputParams
) internal pure returns (uint256 maxPremiumInBips);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|Params containing the prices to be used.|

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


### calculateNetDebtAndCollateral


```solidity
function calculateNetDebtAndCollateral(
    Validation.InputParams memory inputParams
) internal pure returns (uint256 netDebtInLAssets, uint256 netCollateralInLAssets);
```

### calcSoftPremiumBips

Calculate the premium the soft liquidator is receiving given the borrowers deposit and the depositToTransfer to the liquidator.
The end premium is the max of the premiums in L, X, Y
If no soft liq is requested (liquidationParams.softDepositLToBeTransferred==liquidationParams.softDepositXToBeTransferred==liquidationParams.softDepositYToBeTransferred==0), the premium will be 0


```solidity
function calcSoftPremiumBips(
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


### calcSoftMaxPremiumInBips

Calculate the max premium the soft liquidator can receive given position of `account`.


```solidity
function calcSoftMaxPremiumInBips(
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

### HardLiquidationParams

```solidity
struct HardLiquidationParams {
    uint256 depositLToBeTransferredInLAssets;
    uint256 depositXToBeTransferredInXAssets;
    uint256 depositYToBeTransferredInYAssets;
    uint256 repayLXInXAssets;
    uint256 repayLYInYAssets;
    uint256 repayXInXAssets;
    uint256 repayYInYAssets;
}
```

