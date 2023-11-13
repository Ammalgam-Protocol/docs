# ITokenFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/interfaces/factories/ITokenFactory.sol)

Interface for the AmmalgamTokenFactory contract, which is responsible for creating new instances of AmmalgamERC20 tokens.


## Functions
### newTokens

Creates new instances of AmmalgamERC20 tokens for the given token addresses.


```solidity
function newTokens(address tokenX, address tokenY) external returns (IAmmalgamERC20[6] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenX`|`address`|The address of tokenX.|
|`tokenY`|`address`|The address of tokenY.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IAmmalgamERC20[6]`|An array of IAmmalgamERC20 tokens consisting of [liquidityToken, depositXToken, depositYToken, borrowXToken, borrowYToken, borrowLToken].|


