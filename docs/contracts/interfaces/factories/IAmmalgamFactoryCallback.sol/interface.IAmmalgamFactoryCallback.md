# IAmmalgamFactoryCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/c2398bc2cc7b9fe383b005349741b4aa61a1c292/contracts/interfaces/factories/IAmmalgamFactoryCallback.sol)

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

