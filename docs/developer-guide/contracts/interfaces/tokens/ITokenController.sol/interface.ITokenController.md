# ITokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/b02f234f650997c7e7f19495c04e5606555377fd/contracts/interfaces/tokens/ITokenController.sol)

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

Fetches the current reserves of asset X and asset Y, as well as the block of the last operation.


```solidity
function getReserves() external view returns (uint112 reserveXAssets, uint112 reserveYAssets, uint32 lastTimestamp);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveXAssets`|`uint112`|The current reserve of asset X.|
|`reserveYAssets`|`uint112`|The current reserve of asset Y.|
|`lastTimestamp`|`uint32`|The timestamp of the last operation.|


### externalLiquidity


```solidity
function externalLiquidity() external view returns (uint112);
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


### totalAssets

Computes the current total Assets.

*If the last lending state update is outdated (i.e., not matching the current block timestamp),
the function recalculates the assets based on the duration since the last update, the lending state,
and reserve balances. If the timestamp is current, the previous scaler (without recalculation) is returned.*


```solidity
function totalAssets() external view returns (uint128[6] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128[6]`|totalAssets An array of six `uint128` values representing the total assets for each of the 6 amalgam token types. These values may be adjusted based on the time elapsed since the last update. If the timestamp is up-to-date, the previously calculated total assets are returned without recalculation.|


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
    uint128 depositLAssets,
    uint128 depositXAssets,
    uint128 depositYAssets,
    uint128 borrowLAssets,
    uint128 borrowXAssets,
    uint128 borrowYAssets
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositLAssets`|`uint128`|The amount of total `DEPOSIT_L` assets in the pool after interest accrual|
|`depositXAssets`|`uint128`|The amount of total `DEPOSIT_X` assets in the pool after interest accrual|
|`depositYAssets`|`uint128`|The amount of total `DEPOSIT_Y` assets in the pool after interest accrual|
|`borrowLAssets`|`uint128`|The amount of total `BORROW_L` assets in the pool after interest accrual|
|`borrowXAssets`|`uint128`|The amount of total `BORROW_X` assets in the pool after interest accrual|
|`borrowYAssets`|`uint128`|The amount of total `BORROW_Y` assets in the pool after interest accrual|

