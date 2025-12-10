# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/52b6f0b5383b0a1424ddcfa43cb570bd19227607/contracts/AmmalgamPair.sol)

**Inherits:**
[IAmmalgamPair](/docs/developer-guide/contracts/interfaces/IAmmalgamPair.sol/interface.IAmmalgamPair.md), [TokenController](/docs/developer-guide/contracts/tokens/TokenController.sol/contract.TokenController.md)


## State Variables
### ZERO_DEPOSIT_DUE_TO_NETTING

```solidity
uint256 private constant ZERO_DEPOSIT_DUE_TO_NETTING = 0;
```


### UNLOCKED

```solidity
uint256 private constant UNLOCKED = 0;
```


### LOCKED

```solidity
uint256 private constant LOCKED = 1;
```


### locked

```solidity
uint256 private transient locked;
```


## Functions
### lock


```solidity
modifier lock();
```

### _lock


```solidity
function _lock() private;
```

### _unlock


```solidity
function _unlock() private;
```

### mint


```solidity
function mint(
    address to
) external virtual lock returns (uint256 liquidityShares);
```

### burn


```solidity
function burn(
    address to
) external virtual lock returns (uint256 amountXAssets, uint256 amountYAssets);
```

### swap


```solidity
function swap(uint256 amountXOut, uint256 amountYOut, address to, bytes calldata data) external virtual lock;
```

### calculateAmountIn

helper method to calculate amountIn for swap

*Adds jump, saves on runtime size. Must check that `reserve > amountOut`,
which happens in swap where function is called.*


```solidity
function calculateAmountIn(
    uint256 amountOut,
    uint256 balance,
    uint256 reserve
) private pure returns (uint256 amountIn);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|the amount out|
|`balance`|`uint256`|the balance|
|`reserve`|`uint256`|the reserve|


### calculateBalanceAfterFees

helper method to calculate balance after fees

*Note that amountIn + reserve does not always equal balance if amountOut > 0.
When assets are depleted, we should multiply (balance - missing) * BUFFER_NUMERATOR /
INVERSE_BUFFER, but instead of divide here, we multiply the other side of the K
comparison, see `calculateReserveAdjustmentsForMissingAssets` where we multiply by
INVERSE_BUFFER. When not depleted, we multiply by INVERSE_BUFFER instead of dividing on
the other side.*


```solidity
function calculateBalanceAfterFees(
    uint256 amountIn,
    uint256 balance,
    uint256 reserve,
    uint256 referenceReserve,
    uint256 missing
) private pure returns (uint256 calculatedBalance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|the swap amount in|
|`balance`|`uint256`|the balance|
|`reserve`|`uint256`|the reserve|
|`referenceReserve`|`uint256`|the reference reserve for the block|
|`missing`|`uint256`|the missing assets, zero if deposits > borrows of X or Y|


### calculateReserveAdjustmentsForMissingAssets

helper method to calculate balance adjustment for missing assets

*For swap,  when assets are depleted, we should multiply (reserve - missing) by
BUFFER_NUMERATOR / INVERSE_BUFFER, but instead of divide here, we multiply the other
side of the K comparison, see `calculateBalanceAfterFees` where we multiply by
INVERSE_BUFFER.
For updateObservation, different scaled `buffer` and `bufferNumerator` values
are supplied so the adjusted reserve reflects observation-specific logic.*


```solidity
function calculateReserveAdjustmentsForMissingAssets(
    uint256 reserve,
    uint256 missing,
    uint256 buffer,
    uint256 bufferNumerator
) private pure returns (uint256 reserveAdjustment);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserve`|`uint256`|the starting reserve|
|`missing`|`uint256`|the missing assets, zero if deposits > borrows of X or Y|
|`buffer`|`uint256`| Scaling factor applied to the reserve for the depletion comparison.|
|`bufferNumerator`|`uint256`| Scaling factor applied to the missing amount for the comparison and for computing the depleted-case adjusted reserve.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveAdjustment`|`uint256`|The adjusted reserve value used for swap or updateObservation depends on the buffer, bufferNumerator to be passed in.|


### deposit


```solidity
function deposit(
    address to
) external virtual lock;
```

### withdraw

withdraw X and/or Y


```solidity
function withdraw(
    address to
) external virtual lock;
```

### updateWithdrawShares


```solidity
function updateWithdrawShares(
    address to,
    uint256 depositedTokenType,
    uint256 _reserve
) private returns (uint256 withdrawnAssets);
```

### borrow


```solidity
function borrow(address to, uint256 amountXAssets, uint256 amountYAssets, bytes calldata data) external virtual lock;
```

### borrowHelper


```solidity
function borrowHelper(
    address to,
    uint256 amountAssets,
    uint256 reserve,
    uint256 depositedTokenType,
    uint256 borrowedTokenType
) private returns (uint256 amountShares);
```

### updateBorrowOrDepositSharesHelper


```solidity
function updateBorrowOrDepositSharesHelper(
    address to,
    uint256 tokenType,
    uint256 amountAssets,
    bool isRoundingUp
) private returns (uint256 amountShares);
```

### borrowLiquidity


```solidity
function borrowLiquidity(
    address to,
    uint256 borrowAmountLAssets,
    bytes calldata data
) external virtual lock returns (uint256 borrowedLXAssets, uint256 borrowedLYAssets);
```

### repay


```solidity
function repay(
    address onBehalfOf
) external virtual lock returns (uint256 repayXInXAssets, uint256 repayYInYAssets);
```

### _repay

Internal version to allow for direct calls during liquidations


```solidity
function _repay(
    address onBehalfOf
) private returns (uint256 repayXInXAssets, uint256 repayYInYAssets);
```

### repayHelper


```solidity
function repayHelper(
    address onBehalfOf,
    uint256 repayInAssets,
    uint256 borrowTokenType
) private returns (uint256 actualRepayInAssets);
```

### repayLiquidity


```solidity
function repayLiquidity(
    address onBehalfOf
) external virtual lock returns (uint256 repaidLXInXAssets, uint256 repaidLYInYAssets, uint256 repayLiquidityAssets);
```

### _repayLiquidity


```solidity
function _repayLiquidity(
    address onBehalfOf
) private returns (uint256 repaidLXInXAssets, uint256 repaidLYInYAssets, uint256 repayLiquidityAssets);
```

### liquidate

LTV based liquidation. The LTV dictates the max premium that can be had by the liquidator.


```solidity
function liquidate(
    address borrower,
    address to,
    uint256 depositLToBeTransferredInLAssets,
    uint256 depositXToBeTransferredInXAssets,
    uint256 depositYToBeTransferredInYAssets,
    uint256 repayLXInXAssets,
    uint256 repayLYInYAssets,
    uint256 repayXInXAssets,
    uint256 repayYInYAssets,
    uint256 liquidationType
) external virtual lock;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated|
|`to`|`address`|The account to send the liquidated deposit to|
|`depositLToBeTransferredInLAssets`|`uint256`|The amount of L to be transferred to the liquidator.|
|`depositXToBeTransferredInXAssets`|`uint256`|The amount of X to be transferred to the liquidator.|
|`depositYToBeTransferredInYAssets`|`uint256`|The amount of Y to be transferred to the liquidator.|
|`repayLXInXAssets`|`uint256`|The amount of LX to be repaid by the liquidator.|
|`repayLYInYAssets`|`uint256`|The amount of LY to be repaid by the liquidator.|
|`repayXInXAssets`|`uint256`|The amount of X to be repaid by the liquidator.|
|`repayYInYAssets`|`uint256`|The amount of Y to be repaid by the liquidator.|
|`liquidationType`|`uint256`|The type of liquidation to be performed: HARD, SATURATION, LEVERAGE|


### liquidateHard

LTV based liquidation. The LTV dictates the max premium that can be had by the liquidator.


```solidity
function liquidateHard(
    address borrower,
    address to,
    Validation.InputParams memory inputParams,
    Liquidation.HardLiquidationParams memory hardLiquidationParams
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated|
|`to`|`address`|The account to send the liquidated deposit to|
|`inputParams`|`Validation.InputParams`|The input parameters for the liquidation, including reserves and price limits.|
|`hardLiquidationParams`|`Liquidation.HardLiquidationParams`|The parameters for the hard liquidation, including deposits and repayments.|


### repayCallback


```solidity
function repayCallback(uint256 repayXAssets, uint256 repayYAssets) private;
```

### verifyRepay


```solidity
function verifyRepay(uint256 actualX, uint256 expectedX, uint256 actualY, uint256 expectedY) private pure;
```

### resetSaturation

Liquidation based on change of saturation because of time.


```solidity
function resetSaturation(
    Validation.InputParams memory inputParams,
    address borrower,
    address to,
    uint256 depositLToBeTransferredInLAssets,
    uint256 depositXToBeTransferredInXAssets,
    uint256 depositYToBeTransferredInYAssets
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`||
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to|
|`depositLToBeTransferredInLAssets`|`uint256`|The amount of L to be transferred to the liquidator.|
|`depositXToBeTransferredInXAssets`|`uint256`|The amount of X to be transferred to the liquidator.|
|`depositYToBeTransferredInYAssets`|`uint256`|The amount of Y to be transferred to the liquidator.|


### liquidateLeverage

Liquidation based on leverage.


```solidity
function liquidateLeverage(
    Validation.InputParams memory inputParams,
    address borrower,
    address to,
    bool depositL,
    bool repayL
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`||
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to|
|`depositL`|`bool`|Flag indicating whether the deposit transferred to the liquidator is L xor X+Y.|
|`repayL`|`bool`|Flag indicating whether the repay by the liquidator is L xor X+Y.|


### finalizeLiquidation


```solidity
function finalizeLiquidation(
    address borrower,
    address to,
    uint256 depositLToBeTransferredInLAssets,
    uint256 depositXToBeTransferredInXAssets,
    uint256 depositYToBeTransferredInYAssets,
    bool isBadDebt
) private;
```

### liquidationTransfer

Transfer deposit to the liquidator from the borrower (==from).


```solidity
function liquidationTransfer(
    address from,
    address to,
    uint256 depositToTransferInAssets,
    uint256 tokenType,
    bool isBadDebt
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The account the deposit is being transferred from.|
|`to`|`address`|The account the deposit is being transferred to.|
|`depositToTransferInAssets`|`uint256`|The amount being transferred to the liquidator.|
|`tokenType`|`uint256`|The deposit token type being transferred.|
|`isBadDebt`|`bool`||


### skim


```solidity
function skim(
    address to
) external virtual lock;
```

### sync


```solidity
function sync() external virtual lock;
```

### accrueSaturationPenaltiesAndInterest


```solidity
function accrueSaturationPenaltiesAndInterest(
    address affectedAccount,
    uint256 minimumTimeBeforeUpdate
) private returns (uint256 _reserveXAssets, uint256 _reserveYAssets, uint256 balanceXAssets, uint256 balanceYAssets);
```

### updateObservation


```solidity
function updateObservation(
    uint256 _reserveXAssets,
    uint256 _reserveYAssets,
    uint32 currentTimestamp,
    uint32 deltaUpdateTimestamp
) private;
```

### validateOnUpdate


```solidity
function validateOnUpdate(address validate, address update, bool alwaysUpdate) public virtual;
```

### validateSolvency


```solidity
function validateSolvency(address validate, bool alwaysUpdate) private;
```

### getInputParamsAndUpdateSaturation


```solidity
function getInputParamsAndUpdateSaturation(address toUpdate, bool alwaysUpdate) private;
```

### getInputParams


```solidity
function getInputParams(
    address toCheck,
    bool includeLongTermPrice
) internal view returns (Validation.InputParams memory inputParams);
```

### transferAssets


```solidity
function transferAssets(address to, uint256 amountXAssets, uint256 amountYAssets) private;
```

### calculateMinimumLiquidityAssets


```solidity
function calculateMinimumLiquidityAssets(
    uint256 amountXAssets,
    uint256 amountYAssets,
    uint256 _reserveXAssets,
    uint256 _reserveYAssets,
    uint256 liquidityAssetsNumerator,
    bool isRoundingUp
) private pure returns (uint256 liquidityAssets);
```

### checkMaxBorrowForLiquidity


```solidity
function checkMaxBorrowForLiquidity(
    uint256 reserveX,
    uint256 reserveY,
    uint256 totalDepositedLAssets,
    uint256 totalBorrowedLAssets,
    uint256 newBorrowLAssets
) private view;
```

### checkMaxBorrow


```solidity
function checkMaxBorrow(
    uint256 depositedAssets,
    uint256 borrowedAssets,
    uint256 reserve,
    uint256 totalDepositedLAssets,
    uint256 totalBorrowedLiquidityAssets
) private pure;
```

## Errors
### Locked

```solidity
error Locked();
```

### InsufficientLiquidityMinted

```solidity
error InsufficientLiquidityMinted();
```

### InsufficientLiquidityBurned

```solidity
error InsufficientLiquidityBurned();
```

### InsufficientOutputAmount

```solidity
error InsufficientOutputAmount();
```

### InsufficientInputAmount

```solidity
error InsufficientInputAmount();
```

### InsufficientLiquidity

```solidity
error InsufficientLiquidity();
```

### InvalidToAddress

```solidity
error InvalidToAddress();
```

### K

```solidity
error K();
```

### InsufficientRepayLiquidity

```solidity
error InsufficientRepayLiquidity();
```

