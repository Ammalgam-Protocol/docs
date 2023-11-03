# IAmmalgamFactoryCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/04a3f1fa0f3d490fb4de634cc2e3c4a82c163e7a/contracts/interfaces/factories/IAmmalgamFactoryCallback.sol)

This interface provides methods for getting the token factory configuration.


## Functions
### getTokenFactoryConfig

Returns the current token factory configuration.


```solidity
function getTokenFactoryConfig() external view returns (IAmmalgamFactoryCallback.TokenFactoryConfig memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IAmmalgamFactoryCallback.TokenFactoryConfig`|A TokenFactoryConfig struct representing the current token factory config.|


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

