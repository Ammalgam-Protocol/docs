# ITokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/interfaces/tokens/ITokenController.sol)

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


### getTickRange

returns the tick range used to represent the price range


```solidity
function getTickRange() external view returns (int16 minTick, int16 maxTick);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minTick`|`int16`|the minimum tick representing the lowest estimated price|
|`maxTick`|`int16`|the maximum tick representing the highest estimated price|


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


### configLongTermInterval

Resets the long-term interval configuration.

*Allows the contract owner to reset the long-term interval configuration to the specified value.*


```solidity
function configLongTermInterval(
    uint24 _longTermIntervalConfigFactor
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_longTermIntervalConfigFactor`|`uint24`|The new factor of mid-term interval configuration to be set for the long-term interval configuration.|


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

