# IFactoryCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/083c00a2031e49494b12e5e222d9534812423631/contracts/interfaces/factories/IFactoryCallback.sol)

This interface provides methods for getting the token factory configuration.


## Functions
### generateTokensWithinFactory

Returns the current token factory configuration.


```solidity
function generateTokensWithinFactory() external returns (IERC20, IERC20, IAmmalgamERC20[6] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IERC20`|A TokenFactoryConfig struct representing the current token factory config.|
|`<none>`|`IERC20`||
|`<none>`|`IAmmalgamERC20[6]`||


## Structs
### TokenFactoryConfig
This struct represents the configuration of the token factory, which includes
the addresses of tokenX, tokenY, and the factory itself.


```solidity
struct TokenFactoryConfig {
    address tokenX;
    address tokenY;
    address factory;
}
```

