# ITokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/interfaces/tokens/ITokenController.sol)

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
function getReserves() external view returns (uint112 reserveXAssets, uint112 reserveYAssets, uint256 blockLast);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveXAssets`|`uint112`|The current reserve of asset X.|
|`reserveYAssets`|`uint112`|The current reserve of asset Y.|
|`blockLast`|`uint256`|The block number of the last operation.|


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
function totalAssets(
    uint256 tokenType
) external view returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`uint256`|The type of token for which the scaler is being computed. Can be one of BORROW_X, DEPOSIT_X, BORROW_Y, DEPOSIT_Y, BORROW_L, or DEPOSIT_L.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|totalAssets The computed scaling factor, adjusted if necessary based on the time elapsed since the last update.|


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

