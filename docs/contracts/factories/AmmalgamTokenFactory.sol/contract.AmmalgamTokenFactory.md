# AmmalgamTokenFactory
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/55eccbeef5b0ef289c29a5edda7e20c492c25998/contracts/factories/AmmalgamTokenFactory.sol)

**Inherits:**
[ITokenFactory](/contract_docs/src/contracts/interfaces/factories/ITokenFactory.sol/interface.ITokenFactory.md)


## Functions
### newTokens


```solidity
function newTokens(address tokenX, address tokenY) external override returns (IAmmalgamERC20[6] memory tokens);
```

### uniSymbol

*adapted from https://github.com/1inch/mooniswap/blob/master/contracts/libraries/UniERC20.sol*


```solidity
function uniSymbol(address token) private view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|address of the token|


### _toHex


```solidity
function _toHex(address account) private pure returns (string memory);
```

### _toHex


```solidity
function _toHex(bytes memory data) private pure returns (string memory);
```

