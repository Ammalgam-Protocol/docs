# IAmmalgamDebtERC20
[Git Source](https://github.com/Ammalgam-Protocol/core-v1/blob/55eccbeef5b0ef289c29a5edda7e20c492c25998/contracts/interfaces/tokens/IAmmalgamDebtERC20.sol)

**Inherits:**
[IAmmalgamERC20](/contracts/interfaces/tokens/IAmmalgamERC20.sol/interface.IAmmalgamERC20.md)

This interface extends the IAmmalgamERC20 with additional methods.
for handling debt allowances and claims in the Ammalgam protocol.


## Functions
### debtAllowance

Returns the current debt allowance of `spender` from `receiver`.


```solidity
function debtAllowance(address receiver, address spender) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The account that would receive debt moved by the spender.|
|`spender`|`address`|The account that can spend the debt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The allowance of debt the `spender` can send to the `receiver`.|


### approveDebt

Sets `amount` of debt tokens that can be accepted by the `caller` from the `spender`.

*The approveDebt implementation in AmmalgamDebtERC20 calls _approve from ERC20, by passing in
the receiver as owner.*


```solidity
function approveDebt(address spender, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The account that can transfer the debt.|
|`amount`|`uint256`|The amount of the debt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation succeeded.|


### increaseDebtAllowance

Increases the debt allowance granted by the msg.sender to `spender`.


```solidity
function increaseDebtAllowance(address spender, uint256 addedValue) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The account that will receive the increased debt allowance.|
|`addedValue`|`uint256`|The value to be added to the allowance.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation succeeded.|


### decreaseDebtAllowance

Decreases the debt allowance granted by the msg.sender to `spender`.


```solidity
function decreaseDebtAllowance(address spender, uint256 subtractedValue) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The account whose debt allowance will decrease.|
|`subtractedValue`|`uint256`|The value to subtract from the allowance.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation succeeded.|


### claimDebt

Allows caller to claim `amount` of debt from `owner`.

*The caller must have sufficient collateral in order to secure the debt being claimed.*


```solidity
function claimDebt(address owner, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The account that owns the debt.|
|`amount`|`uint256`|The amount of the debt to be claimed.|


