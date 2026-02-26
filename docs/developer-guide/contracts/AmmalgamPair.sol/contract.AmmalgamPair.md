# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/b9fca5224c235322171b13509db743f19431f0a4/contracts/AmmalgamPair.sol)

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
) external virtual lock returns (uint256 repayXAssets, uint256 repayYAssets);
```

### _repay

Internal version to allow for direct calls during liquidations


```solidity
function _repay(
    address onBehalfOf,
    uint256 repayXAssets,
    uint256 repayYAssets
) private returns (uint256 actualRepayXAssets, uint256 actualRepayYAssets);
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
) external virtual lock returns (uint256 repaidXAssets, uint256 repaidYAssets, uint256 repayLiquidityAssets);
```

### _repayLiquidity


```solidity
function _repayLiquidity(
    address onBehalfOf,
    uint256 repaidXAssets,
    uint256 repaidYAssets,
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) private returns (uint256 repayLiquidityAssets);
```

### liquidate

accrues interest and determines the amount sent to the contract prior to executing
liquidation.


```solidity
function liquidate(
    address borrower,
    address to,
    uint256 seizedLAssets,
    uint256 seizedXAssets,
    uint256 seizedYAssets,
    uint256 repayXAssets,
    uint256 repayYAssets,
    uint256 liquidationType
) external virtual lock;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to|
|`seizedLAssets`|`uint256`|The amount of L tokens to be transferred from the hard deposit.|
|`seizedXAssets`|`uint256`|The amount of X tokens to be transferred from the hard deposit.|
|`seizedYAssets`|`uint256`|The amount of Y tokens to be transferred from the hard deposit.|
|`repayXAssets`|`uint256`|The amount of X assets being repaid on behalf of the borrower.|
|`repayYAssets`|`uint256`|The amount of Y assets being repaid on behalf of the|
|`liquidationType`|`uint256`|The type of liquidation to be performed: HARD, SATURATION, LEVERAGE|


### liquidateHard

LTV based liquidation. The LTV dictates the max premium that can be had by the
liquidator. We determine the amount of borrowed liquidity to be repaid by reducing the
actual amount paid by the amount passed in for the borrow x and borrow y amount.


```solidity
function liquidateHard(
    address borrower,
    address to,
    Validation.InputParams memory inputParams,
    uint256[6] memory proposedLiquidation,
    uint256 actualRepaidXAssets,
    uint256 actualRepaidYAssets
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated|
|`to`|`address`|The account to send the liquidated deposit to|
|`inputParams`|`Validation.InputParams`|The input parameters for the liquidation, including reserves and price limits.|
|`proposedLiquidation`|`uint256[6]`|The inputted amount of deposits to be seized and borrows to be repaid.|
|`actualRepaidXAssets`|`uint256`|The actual amount of X assets repaid by the liquidator.|
|`actualRepaidYAssets`|`uint256`|The actual amount of Y assets repaid by the liquidator.|


### resetSaturation

Liquidation based on change of saturation because of time.


```solidity
function resetSaturation(Validation.InputParams memory inputParams, address borrower, address to) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`||
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to|


### liquidateLeverage

Liquidation based on leverage.


```solidity
function liquidateLeverage(
    Validation.InputParams memory inputParams,
    address borrower,
    address to,
    uint256 repaidXAssets,
    uint256 repaidYAssets,
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
|`repaidXAssets`|`uint256`||
|`repaidYAssets`|`uint256`||
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

### updateSaturationIfNeeded

Update saturation state for an account if it already exists in saturation.

*Note that during a repay of debt, we may not have an entry in saturation if
1. The position is a straddle with a payout that never reaches zero
2. Repay is occurring during a callback of a flash loan, saturation will not be updated
until the end of the borrow call after the callback concludes.*


```solidity
function updateSaturationIfNeeded(
    address toUpdate
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toUpdate`|`address`|The account to update saturation for.|


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

