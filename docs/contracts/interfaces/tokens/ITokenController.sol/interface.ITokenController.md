# ITokenController
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/922bb12a291a5f6729dd85abc24fc6fec504a108/contracts/interfaces/tokens/ITokenController.sol)

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


### tokens

Get the contract instance for a specific type of token.


```solidity
function tokens(uint8 tokenType) external view returns (IAmmalgamERC20);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`uint8`|The type of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IAmmalgamERC20`|The contract instance for the specified token.|


