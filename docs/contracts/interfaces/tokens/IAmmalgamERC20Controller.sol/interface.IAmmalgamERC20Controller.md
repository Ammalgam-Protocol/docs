# IAmmalgamERC20Controller
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/04a3f1fa0f3d490fb4de634cc2e3c4a82c163e7a/contracts/interfaces/tokens/IAmmalgamERC20Controller.sol)

The interface of a ERC20 facade for multiple token types with functionality similar to ERC1155.

*The AmmalgamERC20Contraller provides support to the AmmalgamPair contract for token management.*


## Functions
### tokenX

Get the address of tokenX.


```solidity
function tokenX() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of tokenX.|


### tokenY

Get the address of tokenY.


```solidity
function tokenY() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of tokenY.|


### totalSupply

Get the total supply of a specific type of token.


```solidity
function totalSupply(TokenType tokenType) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`TokenType`|The type of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total supply of the specified token.|


### balanceOf

Get the balance of a specific type of token for a specific account.


```solidity
function balanceOf(address account, TokenType tokenType) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account for which the balance is required.|
|`tokenType`|`TokenType`|The type of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The balance of the specified token for the specified account.|


### tokens

Get the contract instance for a specific type of token.


```solidity
function tokens(TokenType tokenType) external view returns (IAmmalgamERC20);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenType`|`TokenType`|The type of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IAmmalgamERC20`|The contract instance for the specified token.|


