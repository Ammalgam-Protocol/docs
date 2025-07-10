# IFactoryCallback
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/85df9cff0e774de8aef6efe8ec7df8cd94f03568/contracts/interfaces/factories/IFactoryCallback.sol)

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


### feeTo

Returns the fee recipient address.


```solidity
function feeTo() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the fee recipient.|


### feeToSetter

Returns the address that can change the fee recipient.


```solidity
function feeToSetter() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the fee setter.|


### saturationAndGeometricTWAPState

Returns the address of the saturation state contract


```solidity
function saturationAndGeometricTWAPState() external view returns (ISaturationAndGeometricTWAPState);
```

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

