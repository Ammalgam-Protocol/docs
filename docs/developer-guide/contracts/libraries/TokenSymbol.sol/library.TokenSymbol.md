# TokenSymbol
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/b02f234f650997c7e7f19495c04e5606555377fd/contracts/libraries/TokenSymbol.sol)


## Functions
### uniSymbol

*adapted from https://github.com/1inch/mooniswap/blob/master/contracts/libraries/UniERC20.sol*


```solidity
function uniSymbol(
    address token
) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|address of the token|


### toHex


```solidity
function toHex(
    address account
) internal pure returns (string memory);
```

### _toHex


```solidity
function _toHex(
    bytes memory data
) private pure returns (string memory);
```

### min


```solidity
function min(uint256 a, uint256 b) private pure returns (uint256);
```

