# IAmmalgamERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/04a3f1fa0f3d490fb4de634cc2e3c4a82c163e7a/contracts/interfaces/tokens/IAmmalgamERC20.sol)

**Inherits:**
IERC20, IERC20Metadata, IERC20Permit

*This interface extends IERC20, IERC20Metadata, and IERC20Permit, and defines mint and burn functions.*


## Functions
### mint

Creates `amount` tokens and assigns them to `to` address, increasing the total supply.

*Emits a Transfer event with `from` set to the zero address.*


```solidity
function mint(address to, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The account to deliver the tokens to.|
|`amount`|`uint256`|The number of tokens to be minted.|


### burn

Destroys `amount` tokens from `from` address, reducing the total supply.

*Emits a Transfer event with `to` set to the zero address.*


```solidity
function burn(address from, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The account to deduct the tokens from.|
|`amount`|`uint256`|The number of tokens to be burned.|


