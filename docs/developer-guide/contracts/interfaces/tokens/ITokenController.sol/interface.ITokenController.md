# ITokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/2eece5abfebce288fb02f1e415a4c82da2c74b65/contracts/interfaces/tokens/ITokenController.sol)

The interface of a ERC20 facade for multiple token types with functionality similar to ERC1155.

*The TokenController provides support to the AmmalgamPair contract for token management.*


## Functions
### underlyingTokens

Get the underlying tokens for the AmmalgamERC20Controller.


```solidity
function underlyingTokens() external view returns (IERC20, IERC20);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IERC20`|The addresses of the underlying tokens.|
|`<none>`|`IERC20`||


### getReserves

Fetches the current reserves and the last update timestamp.


```solidity
function getReserves() external view returns (uint112 reserveXAssets, uint112 reserveYAssets, uint32 lastTimestamp);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveXAssets`|`uint112`|The raw reserveX or reserveX plus unaccrued interest.|
|`reserveYAssets`|`uint112`|The raw reserveY or reserveY plus unaccrued interest.|
|`lastTimestamp`|`uint32`|The timestamp of the last operation.|


### externalLiquidity


```solidity
function externalLiquidity() external view returns (uint112);
```

### fragileLiquidityShares


```solidity
function fragileLiquidityShares() external view returns (uint112);
```

### updateExternalLiquidity

Updates the external liquidity value.

*This function sets the external liquidity to a new value and emits an event with the new value. It can only be called by the fee setter.*


```solidity
function updateExternalLiquidity(
    uint112 _externalLiquidity
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_externalLiquidity`|`uint112`|The new external liquidity value.|


### referenceReserves

Returns the reference reserves for the block, these represent a snapshot of the
reserves at the start of the block weighted for mints, burns, borrow and repayment of
liquidity. These amounts are critical to calculating the correct fees for any swap.


```solidity
function referenceReserves() external view returns (uint112 referenceReserveX, uint112 referenceReserveY);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`referenceReserveX`|`uint112`|The reference reserve for asset X.|
|`referenceReserveY`|`uint112`|The reference reserve for asset Y.|


### tokens

Return the IAmmalgamERC20 token corresponding to the token type


```solidity
function tokens(
    uint256 tokenType
) external view returns (IAmmalgamERC20);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`uint256`|The type of token for which the scaler is being computed. Can be one of BORROW_X, DEPOSIT_X, BORROW_Y, DEPOSIT_Y, BORROW_L, or DEPOSIT_L.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IAmmalgamERC20`|The IAmmalgamERC20 token|


### totalAssetsAndShares

Computes current total assets and shares.

*Behavior depends on the `withInterest` flag:
1. If `withInterest` is `false`: Returns stored values (`allAssets`, `allShares`) without adjustments.
2. If `withInterest` is `true`:
- First calls `computeAssetsState()` to recalculate assets and shares (accounts for elapsed time, interest, and lending state).
- Converts protocol fees to shares for DEPOSIT_L/X/Y and adds them to `_allShares`.
- Adds protocol fees to DEPOSIT_L/X/Y in `_allAssets` (updated after shares to avoid double-counting).
3. If `computeAssetsState()` detects no elapsed lending time, it returns stored values without recalculation.*


```solidity
function totalAssetsAndShares(
    bool withInterest
) external view returns (uint112[6] memory _allAssets, uint112[6] memory _allShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`withInterest`|`bool`|Toggle to enable/disable interest accrual, reserve adjustments, and protocol fee application.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_allAssets`|`uint112[6]`|Array of six `uint128` values: Total assets for each of the 6 Amalgam token types. If `withInterest` is `true`, includes protocol fees for DEPOSIT_L/X/Y.|
|`_allShares`|`uint112[6]`|Array of six `uint112` values: Total shares for each of the 6 Amalgam token types. If `withInterest` is `true`, includes shares converted from protocol fees for DEPOSIT_L/X/Y.|


## Events
### Sync
*Emitted when reserves are synchronized*


```solidity
event Sync(uint256 reserveXAssets, uint256 reserveYAssets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserveXAssets`|`uint256`|The updated reserve for token X|
|`reserveYAssets`|`uint256`|The updated reserve for token Y|

### UpdateExternalLiquidity
*Emitted when external liquidity is updated*


```solidity
event UpdateExternalLiquidity(uint112 externalLiquidity);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`externalLiquidity`|`uint112`|The updated value for external liquidity|

### BurnBadDebt
*Emitted when bad debt is burned*


```solidity
event BurnBadDebt(address indexed borrower, uint256 indexed tokenType, uint256 badDebtAssets, uint256 badDebtShares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrower`|`address`|The address of the borrower|
|`tokenType`|`uint256`|The type of token being burned|
|`badDebtAssets`|`uint256`|The amount of bad debt assets being burned|
|`badDebtShares`|`uint256`|The amount of bad debt shares being burned|

### InterestAccrued
*Emitted when Interest gets accrued*


```solidity
event InterestAccrued(
    uint112 depositLAssets,
    uint112 depositXAssets,
    uint112 depositYAssets,
    uint112 borrowLAssets,
    uint112 borrowXAssets,
    uint112 borrowYAssets
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositLAssets`|`uint112`|The amount of total `DEPOSIT_L` assets in the pool after interest accrual|
|`depositXAssets`|`uint112`|The amount of total `DEPOSIT_X` assets in the pool after interest accrual|
|`depositYAssets`|`uint112`|The amount of total `DEPOSIT_Y` assets in the pool after interest accrual|
|`borrowLAssets`|`uint112`|The amount of total `BORROW_L` assets in the pool after interest accrual|
|`borrowXAssets`|`uint112`|The amount of total `BORROW_X` assets in the pool after interest accrual|
|`borrowYAssets`|`uint112`|The amount of total `BORROW_Y` assets in the pool after interest accrual|

