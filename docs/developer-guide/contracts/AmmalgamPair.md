# AmmalgamPair
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2ed0f746da008769436bb8eab6619a109a032f9/contracts/AmmalgamPair.sol)

**Inherits:**
[IAmmalgamPair](/docs/developer-guide/contracts/interfaces/IAmmalgamPair.md), [TokenController](/docs/developer-guide/contracts/tokens/TokenController.md)


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


### activeBorrower

```solidity
address private transient activeBorrower;
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

### _revertNestedBorrow


```solidity
function _revertNestedBorrow() private view;
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
In the depleted case the balance is scaled by `BUFFER_NUMERATOR`; the matching
scaling is applied on the reserve side in `calculateReserveAdjustmentsForMissingAssets`
so the K comparison stays division-free on both branches.*


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
actual amount transferred prior to calling `liquidate()` by the amount passed in for the
repayXAssets and repayYAssets parameters.
## Calculating a Hard Liquidation
Hard liquidations can be partial subset of the borrower's entire position based on
tranche saturation composition. Use `LiquidationUtils.calculatePartialLiquidationAmount()`
to compute the partial position, max premium, and the amounts needed for the call.
Three prices are in play and each is used at a different stage:
| Price               | Source                  | Where used                         |
|---------------------|-------------------------|------------------------------------|
| Reserve price       | reserveX / reserveY     | `_repayLiquidity`: splits tokens   |
|                     |                         | into the X/Y ratio the pool needs  |
|                     |                         | to burn BORROW_L.                  |
| sqrtPriceMin (TWAP) | geometric TWAP low tick | Verification converts:             |
|                     |                         |   BORROW_X → L (worst-case borrow) |
|                     |                         |   DEPOSIT_Y → L (worst-case dep.)  |
| sqrtPriceMax (TWAP) | geometric TWAP high tick| Verification converts:             |
|                     |                         |   BORROW_Y → L (worst-case borrow) |
|                     |                         |   DEPOSIT_X → L (worst-case dep.)  |
Verification (`verifyHardLiquidation`) swaps min and max when calling
`getCheckLtvParams(proposed, sqrtPriceMax, sqrtPriceMin)`. This values deposits at
their highest and borrows at their lowest, favoring the borrower by making the
position appear as healthy as possible. This limits the ability of liquidators to
manipulate premiums.
The reserve price and TWAP prices may diverge. Seized deposit amounts must be
computed using TWAP prices (the verification domain), not reserve prices.
### Net Debt Calculation and the BORROW_L Overlap
`getBorrowedInL` initializes BOTH sides from BORROW_L:
```text
netBorrowedXinL = BORROW_L + convertXToL(BORROW_X, sqrtPriceMin)
netBorrowedYinL = BORROW_L + convertYToL(BORROW_Y, sqrtPriceMax)
```
`getDepositsInL` initializes BOTH sides from DEPOSIT_L:
```text
netDepositedXinL = DEPOSIT_L + convertXToL(DEPOSIT_X, sqrtPriceMax)
netDepositedYinL = DEPOSIT_L + convertYToL(DEPOSIT_Y, sqrtPriceMin)
```
`calcDebtAndCollateral` then nets these to determine `netDebtX`:
```text
netDebtX = true  when netDepositedX <= netBorrowedX AND netDepositedY > netBorrowedY
netDebtX = false when netDepositedY <= netBorrowedY AND netDepositedX > netBorrowedX
```
`netDebtX` selects the saturation account. A wrong value causes
`calculatePartialLiquidation` to return the wrong tranche set, reverting the
liquidation.
### Computing Seized amounts Borrow X, Seize Y
For a position with BORROW_X and DEPOSIT_Y, the seized Y only needs
to cover the liquidation premium on the repaid debt:
```text
borrowXInL  = ceil(BORROW_X * Q72 / sqrtPriceMax)
premiumInL  = borrowXInL * maxPremiumBips / BIPS
seizedY     = premiumInL * Q72 / sqrtPriceMax
```
### Overlap Case: Borrow X + Borrow L, Seize Y
When BORROW_L is present and BORROW_Y is zero, `getBorrowedInL` computes:
```text
netBorrowedXinL = BORROW_L + convertXToL(BORROW_X, sqrtPriceMin)
netBorrowedYinL = BORROW_L
```
The seized Y (in L-terms at TWAP price) must exceed BORROW_L so that
`netDepositedYinL > netBorrowedYinL`, which is required for `netDebtX = true`.
The seized amount includes the BORROW_L overlap plus the liquidation premium:
```text
borrowXInL     = ceil(BORROW_X * Q72 / sqrtPriceMax)
netRepaidInL   = BORROW_L + borrowXInL
premiumInL     = netRepaidInL * maxPremiumBips / BIPS
seizedYInL     = BORROW_L + premiumInL
seizedY        = seizedYInL * Q72 / sqrtPriceMax
```
### Token Transfer Amounts
The liquidator must transfer enough tokens to cover both direct borrows and BORROW_L:
```text
repayLX = ceil(BORROW_L * reserveX / activeLiquidity)
repayLY = ceil(BORROW_L * reserveY / activeLiquidity)
totalXTransfer = BORROW_X + repayLX
totalYTransfer = repayLY
```
These use reserve prices because `_repayLiquidity` splits tokens by the reserve ratio.
The seized Y amount uses TWAP prices because `verifyHardLiquidation` operates in that
domain.


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
    uint256 actualRepaidXAssets,
    uint256 actualRepaidYAssets
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`inputParams`|`Validation.InputParams`|The input parameters for the liquidation, including reserves and price.|
|`borrower`|`address`|The account being liquidated.|
|`to`|`address`|The account to send the liquidated deposit to.|
|`actualRepaidXAssets`|`uint256`|The actual amount of X assets repaid by the liquidator.|
|`actualRepaidYAssets`|`uint256`|The actual amount of Y assets repaid by the liquidator.|


### _liquidationRepayHelper

Repays the borrow legs of a liquidation and verifies the liquidator repaid enough.

*Shared by hard and leverage liquidations. The required X/Y repayments must be fully
covered by the assets the liquidator sent in; any remainder repays borrowed liquidity.
`liquidationParams[BORROW_L]` carries the minimum liquidity that must be repaid and is
overwritten with the liquidity actually repaid so `verifyHardLiquidation` can read it back.*


```solidity
function _liquidationRepayHelper(
    address borrower,
    uint256[6] memory liquidationParams,
    uint256 actualRepaidXAssets,
    uint256 actualRepaidYAssets,
    uint256 _reserveXAssets,
    uint256 _reserveYAssets
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The account being liquidated.|
|`liquidationParams`|`uint256[6]`|Borrow legs to repay, indexed by BORROW_X / BORROW_Y / BORROW_L.|
|`actualRepaidXAssets`|`uint256`|The X assets the liquidator transferred in for the repayment.|
|`actualRepaidYAssets`|`uint256`|The Y assets the liquidator transferred in for the repayment.|
|`_reserveXAssets`|`uint256`|Current X reserves, used to split repaid liquidity by the reserve ratio.|
|`_reserveYAssets`|`uint256`|Current Y reserves, used to split repaid liquidity by the reserve ratio.|


### _revertNotEnoughRepaidForLiquidation


```solidity
function _revertNotEnoughRepaidForLiquidation() private pure;
```

### _burnBadDebt


```solidity
function _burnBadDebt(address borrower, uint256[6] memory userAssets) private;
```

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
function validateOnUpdate(address validate, address update, bool alwaysUpdate) external virtual lock;
```

### _validateOnUpdate


```solidity
function _validateOnUpdate(address validate, address update, bool alwaysUpdate) private;
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

