# INewTokensFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/a776754587e2530d31f83af30e82bc8095fad927/contracts/interfaces/factories/INewTokensFactory.sol)

Interface for the NewTokensFactory contract, which is responsible for creating new instances of AmmalgamERC20 tokens.


## Functions
### createAllTokens

Creates new instances of AmmalgamERC20 tokens for the given token addresses.


```solidity
function createAllTokens(address tokenX, address tokenY) external returns (IAmmalgamERC20[6] memory);
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


