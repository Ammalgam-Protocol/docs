# ITokenFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/55eccbeef5b0ef289c29a5edda7e20c492c25998/contracts/interfaces/factories/ITokenFactory.sol)

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


